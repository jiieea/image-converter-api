import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import sharp from 'sharp';
import JSZip from 'jszip';
@Injectable()
export class CompressionService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private storageService: StorageService,
  ) {}

  async multiFileCompress(files: Express.Multer.File[]): Promise<string> {
    const zip = new JSZip();

    // call compressAndStore
    const results = await Promise.allSettled(
      files.map((file) => this.compressAndStore(file)),
    );

    const errors: string[] = [];
    let successCount = 0;

    results.forEach((res, i) => {
      if (res.status === 'fulfilled') {
        const { fileBuffer, filename } = res.value;
        const baseName = filename.replace(/\.[^/.]+$/, '');
        zip.file(`${baseName}.png`, fileBuffer);
        successCount++;
      } else {
        errors.push(`Image ${res[i].originalname} = ${res.reason.message}`);
        this.logger.error(
          `Failed to compress for ${res[i].originalname} , ${res.reason.message}`,
        );
      }
      if (errors.length > 0)
        this.logger.error(
          `${errors.length}/${files.length} failed to compress`,
        );

      if (successCount === 0) {
        throw new Error(`No File Compress Successfully`);
      }
    });

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    return this.storageService.upload(zipBuffer, 'zip');
  }

  private async compressAndStore(file: Express.Multer.File): Promise<{
    fileBuffer: Buffer;
    fileUrl: string;
    filename: string;
  }> {
    const imgBuffer = await this.transform(file.buffer);
    this.logger.info(`Compression image : ${imgBuffer.length} bytes`);
    const fileUrl = await this.storageService.upload(file.buffer, 'png');

    await this.prismaService.compression.create({
      data: {
        fileName: file.originalname,
        fileSize: imgBuffer.length,
        format: 'png',
        fileUrl,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    return {
      fileUrl,
      fileBuffer: imgBuffer,
      filename: file.originalname,
    };
  }

  async create(file: Express.Multer.File): Promise<string> {
    const { fileUrl } = await this.compressAndStore(file);
    return fileUrl;
  }

  private async transform(fileBuffer: Buffer): Promise<Buffer> {
    if (!fileBuffer) return;

    try {
      return sharp(fileBuffer)
        .resize({ width: 1080, withoutEnlargement: true, fit: sharp.fit.cover })
        .toFormat('png', { quality: 80 })
        .toBuffer();
    } catch (e: any) {
      throw new Error(`Could not transform file ${e.message}`);
    }
  }
}
