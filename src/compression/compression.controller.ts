import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CompressionService } from './compression.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
@Controller('/compression')
export class CompressionController {
  constructor(
    private readonly compressionService: CompressionService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  @Post('/multi-file')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      limits: {
        fileSize: 50 * 1024 * 1024,
      },
    }),
  )
  async multiCompress(@UploadedFiles() files: Express.Multer.File[]) {
    const url = await this.compressionService.multiCompress(files, 5);
    return {
      url,
      message: 'Compression complete',
    };
  }
  @Post()
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 35 * 1024 * 1024,
      },
    }),
  )
  async compression(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.NOT_FOUND);
    }
    try {
      this.logger.info(`Raw image ${file.size}`);
      const compressed = await this.compressionService.create(file);

      return {
        fileUrl: compressed,
        message: 'Compression success',
      };
    } catch (e: any) {
      throw new HttpException(
        `Compression Failed ${e.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
