import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as sharp from 'sharp';
import * as PDFDoc from 'pdfkit';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ConversionService {
  constructor(
    private readonly storageService: StorageService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(file: Express.Multer.File, toFormat: string): Promise<string> {
    //   extract mimetype
    const fromFormat = file.mimetype.split('/')[1];

    let convertedBuffer: Buffer;
    if (toFormat === 'pdf') {
      convertedBuffer = await this.imageToPdf(file.buffer);
    } else {
      convertedBuffer = await this.imageToImage(file.buffer, toFormat);
    }

    const fileUrl = await this.storageService.upload(convertedBuffer, toFormat);

    // 4. Log the conversion to database
    await this.prismaService.conversion.create({
      data: {
        originalName: file.originalname,
        originalSize: file.size,
        fromFormat,
        toFormat,
        fileUrl,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      },
    });

    // 5. Return the download URL
    return fileUrl;
  }

  async merge(files: Express.Multer.File[]): Promise<string> {
    const buffers = files.map((file: Express.Multer.File) => file.buffer);
    const pdfBuffer = await this.imagesToPdf(buffers);
    console.log(
      'files received:',
      files.map((f) => ({
        name: f.originalname,
        mimetype: f.mimetype,
        size: f.size,
        bufferLength: f.buffer?.length, // ← if this is 0 or undefined, buffer is empty!
      })),
    );

    const upload = await this.storageService.upload(pdfBuffer, 'pdf');

    await this.prismaService.conversion.create({
      data: {
        originalName: `Merged-${files.length}-files.pdf`,
        originalSize: buffers.reduce((acc, b) => acc + b.length, 0),
        fromFormat: 'Multiple',
        toFormat: 'pdf',
        fileUrl: upload,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });
    return upload;
  }
  private async imageToImage(
    fileBuffer: Buffer,
    format: string,
  ): Promise<Buffer> {
    try {
      const sharpInstance = sharp(fileBuffer);

      switch (format) {
        case 'jpg':
        case 'jpeg':
          return await sharpInstance.jpeg({ quality: 90 }).toBuffer();
        case 'png':
          return await sharpInstance.png({ compressionLevel: 6 }).toBuffer();
        case 'webp':
          return await sharpInstance.webp({ quality: 90 }).toBuffer();
        default:
          throw new BadRequestException(`Unsupported Format ${format}`);
      }
    } catch (error: any) {
      if (error instanceof Error)
        throw new InternalServerErrorException(
          `Failed to convert image ${error.message}`,
        );
    }
  }

  private async imagesToPdf(buffers: Buffer[]): Promise<Buffer> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const doc = new PDFDoc({
          autoFirstPage: false,
          margin: 1,
        });
        const chunks: Buffer[] = [];
        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        for (const buffer of buffers) {
          const jpegBuffer = await sharp(buffer)
            .flatten({
              background: { r: 255, g: 255, b: 255 },
            })
            .toColorspace('srgb')
            .jpeg({ quality: 95 })
            .toBuffer();

          const metadata = await sharp(jpegBuffer).metadata();
          console.log({
            format: metadata.format,
            channels: metadata.channels,
            space: metadata.space,
          });
          doc.addPage({
            size: [metadata.width, metadata.height],
            margin: 0,
          });

          doc.image(jpegBuffer, 0, 0, {
            fit: [metadata.width, metadata.height],
            align: 'center',
            valign: 'center',
          });
        }
        doc.end();
      } catch (error) {
        reject(
          new InternalServerErrorException(
            `Failed to convert image ${error.message}`,
          ),
        );
      }
    });
  }

  private async imageToPdf(fileBuffer: Buffer): Promise<Buffer> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        //   take image dimension
        const metadata = await sharp(fileBuffer).metadata();
        console.log(metadata);
        const { width, height } = metadata;

        // create PDF
        const doc = new PDFDoc({
          size: [width, height],
          margin: 0, // make the image fill the dimension
        });

        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err: Error) => reject(err));

        doc.image(fileBuffer, 0, 0, {
          width,
          height,
        });
        doc.end();
      } catch (error: any) {
        if (error instanceof Error)
          reject(
            new InternalServerErrorException(
              `Failed to convert image ${error.message}`,
            ),
          );
      }
    });
  }
}
