import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import sharp from 'sharp';
import { Multer } from 'multer';

@Injectable()
export class CompressionService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private storageService: StorageService,
  ) {}

  private async encode(
    format: string,
    buffer: Buffer,
    quality: number,
  ): Promise<Buffer> {
    const image = sharp(buffer);
    if (format === 'jpeg') return image.jpeg({ quality }).toBuffer();
    if (format === 'webp') return image.webp({ quality }).toBuffer();
    return image.png({ quality }).toBuffer();
  }

  async create(file: Express.Multer.File): Promise<string> {
    let imageBuffer: Buffer;
    const targetSize = parseInt(String(file.size), 10);
    const imageFormat: string = file.mimetype.split('/')[1];

    imageBuffer = await this.compressImage(
      file.buffer,
      imageFormat,
      targetSize,
    );

    // const fileUrl = await this.storageService.upload(imageBuffer, imageFormat);

    // await this.prismaService.
  }
  private async compressImage(
    buffer: Buffer,
    format: string,
    sizeKb: number,
  ): Promise<Buffer> {
    const targetSize = sizeKb * 1024;

    let minQuality = 10;
    let maxQuality = 90;
    let quality = 80;
    let result: Buffer;

    for (let i = 0; i < 6; i++) {
      result = await this.encode(format, buffer, quality);

      if (result.length <= targetSize) {
        minQuality = quality;
        quality = Math.round((quality + maxQuality) / 2);
      } else {
        maxQuality = quality;
        quality = Math.round((quality + minQuality) / 2);
      }
      result = await this.encode(format, buffer, minQuality);

      if (result.length > targetSize) {
        result = await this.downScaleIfNotFit(
          buffer,
          format,
          quality,
          targetSize,
        );
      }
    }
    return result;
  }

  private async downScaleIfNotFit(
    buffer: Buffer,
    format: string,
    quality: number,
    toSizeKb: number,
  ): Promise<Buffer> {
    let scale = 0.9;
    let result: Buffer;

    for (let i = 0; i < 50; i++) {
      const metadata = await sharp(buffer).metadata();
      const width = Math.round((metadata.width ?? 1000) * scale);

      result = await sharp(buffer)
        .resize({ width })
        .toFormat(format as any, { quality })
        .toBuffer();

      if (result.length <= toSizeKb) break;

      scale -= 0.15;
    }

    return result;
  }
}
