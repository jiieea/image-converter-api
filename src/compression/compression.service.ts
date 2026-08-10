import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import sharp from 'sharp';
import JSZip from 'jszip';
import docxConverter from 'docx-pdf';
@Injectable()
export class CompressionService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private storageService: StorageService,
  ) {}

  async multiCompress(
    files: Express.Multer.File[],
    concurrency: 5,
  ): Promise<string> {
    const zip = new JSZip();
    const errors: { name: string; error: string }[] = [];
    let succeedFile: number = 0;

    for (let i = 0; i < files.length; i += concurrency) {
      const batch = files.splice(i, 1 + concurrency);
      const result = await Promise.allSettled(
        files.map((file) => this.compressAndStore(file)),
      );
      result.forEach((response, i) => {
        if (response.status === 'fulfilled') {
          const { fileBuffer, filename } = response.value;
          const basename = filename.replace(/\.[^/.]+$/, '');
          zip.file(`${basename}.png`, fileBuffer);
          succeedFile++;
        } else {
          errors.push({
            name: batch[i].filename,
            error: response.reason.message,
          });
          this.logger.error(
            `Failed to compress for ${response[i].originalname} , ${response.reason.message}`,
          );
        }
        if (errors.length > 0)
          this.logger.error(
            `${errors.length}/${files.length} failed to compress`,
          );

        if (succeedFile === 0) {
          throw new Error(`No File Compress Successfully`);
        }
      });
    }
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

  wordConvert(file: Express.Multer.File) {
    docxConverter(file.buffer, 'output.pdf', function (err, result) {
      if (err) {
        console.log(err);
        return err;
      }
      return `result = ${result.toString()}`;
    });
  }
}
