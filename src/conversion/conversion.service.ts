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

  async merge(file: Express.Multer.File[]): Promise<void> {
    const buffer = file.map((f) => f.buffer);
    const pdfBuffer = await this.imageToPdf(buffer);

    const uploadToStorage = await this.storageService.upload(pdfBuffer, 'pdf');
  }

  async create(file: Express.Multer.File, toFormat: string): Promise<string> {
    //   extract mimetype
    const fromFormat = file.mimetype.split('/')[1];

    const formatBuffer = await this.imageToImage(file.buffer, toFormat);

    const fileUrl = await this.storageService.upload(formatBuffer, toFormat);

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

  private async imageToPdf(fileBuffers: Buffer[]): Promise<Buffer> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        //   take image dimension
        const firstMetadata = await sharp(fileBuffers[0]).metadata();

        // create PDF
        const doc = new PDFDoc({
          size: [firstMetadata.height!, firstMetadata.width!],
          margin: 0, // make the image fill the dimension
          autoFirstPage: false,
        });

        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err: Error) => reject(err));

        for (const record of fileBuffers) {
          const metadata = await sharp(record).metadata();
          const { height, width } = metadata;
          doc.addPage({ size: [width, height], margin: 0 });
          doc.image(record, 0, 0, { width, height });
        }
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
