import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CompressionService } from './compression.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
@Controller('/compression')
export class CompressionController {
  constructor(
    private readonly compressionService: CompressionService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

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
      return this.compressionService.create(file);
    } catch (e: any) {
      throw new HttpException(
        `Compression Failed ${e.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
