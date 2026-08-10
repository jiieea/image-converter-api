import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import sharp from 'sharp';
import { StorageService } from '../storage/storage.service';
import { PDFDocument } from 'pdf-lib';
// import * as libre from 'libreoffice-convert';
@Injectable()
export class ConversionService {
  constructor(
    private readonly storageService: StorageService,
    private readonly prismaService: PrismaService,
  ) {}

  private async convertAndStore(
    file: Express.Multer.File,
    toFormat: string,
  ): Promise<{
    fileUrl: string;
  }> {
    const fromFormat = file.mimetype.split('/')[1];
    let convertBuffer: Buffer;
    toFormat === 'pdf'
      ? (convertBuffer = await this.imageToPdf(file.buffer))
      : (convertBuffer = await this.imageToImage(file.buffer, toFormat));

    const fileUrl = await this.storageService.upload(convertBuffer, fromFormat);

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

    return {
      fileUrl,
    };
  }
  async create(file: Express.Multer.File, toFormat: string): Promise<string> {
    const { fileUrl } = await this.convertAndStore(file, toFormat);
    return fileUrl;
  }

  async merge(files: Express.Multer.File[]): Promise<string> {
    const buffers = files.map((file: Express.Multer.File) => file.buffer);
    const pdfBuffer = await this.multiplePages(buffers);
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
    fileBuffer: Buffer, // image buffer
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

  private async imageToPdf(fileBuffer: Buffer): Promise<Buffer> {
    try {
      // convert to JPEG first
      const jpegBuffer = await this.jpegTransform(fileBuffer);

      const { width, height } = await sharp(jpegBuffer).metadata();

      // create PDF with pdf-lib
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([width!, height!]);

      // embed JPEG directly — pdf-lib handles color correctly
      const jpegImage = await pdfDoc.embedJpg(jpegBuffer);

      page.drawImage(jpegImage, {
        x: 0,
        y: 0,
        width: width!,
        height: height!,
      });

      const pdfBytes = await pdfDoc.save();
      return Buffer.from(pdfBytes);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Failed to convert image: ${error.message}`,
      );
    }
  }

  private async multiplePages(fileBuffers: Buffer[]): Promise<Buffer> {
    try {
      const pdfDoc = await PDFDocument.create(); // intialize pdf-lib
      for (const buffer of fileBuffers) {
        //   convert to jpeg
        const jpegBuffer = await this.jpegTransform(buffer);
        const { width, height } = await sharp(jpegBuffer).metadata();
        const page = pdfDoc.addPage([width!, height!]);
        const embedPage = await pdfDoc.embedJpg(jpegBuffer);
        page.drawImage(embedPage, {
          x: 0,
          y: 0,
          width: width!,
          height: height!,
        });
      }
      const result = await pdfDoc.save();
      return Buffer.from(result);
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Failed to convert image: ${error.message}`,
      );
    }
  }

  private async jpegTransform(fileBuffer: Buffer): Promise<any> {
    return sharp(fileBuffer)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 95 })
      .toBuffer();
  }
}
