import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import sharp from 'sharp';
@Injectable()
export class CompressionService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private storageService: StorageService,
  ) {}
  async create(file: Express.Multer.File): Promise<string> {
    const imageBuffer = await this.transform(file.buffer);
    this.logger.info(`Compression image: ${imageBuffer.length} bytes`);
    const fileUrl = await this.storageService.upload(
      imageBuffer,
      'png',
    );

    await this.prismaService.compression.create({
      data: {
        fileName: file.originalname,
        fileSize: imageBuffer.length,
        format: 'png',
        fileUrl,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    return fileUrl;
  }
  private async transform(fileBuffer: Buffer): Promise<Buffer> {
    if (!fileBuffer) return;

    try {
      const compressed = await sharp(fileBuffer)
        .resize({ width: 1080, withoutEnlargement: true, fit: sharp.fit.fill })
        .toFormat('png')
        .toBuffer();

      return compressed;
    } catch (e: any) {
      throw new Error(`Could not transform file ${e.message}`);
    }
  }
}
