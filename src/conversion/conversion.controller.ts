import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { OptionalJwtAuthGuard } from '../guard/optional-jwt-auth.guard';
import { UploadLimitGuard } from '../guard/upload-limit.guard';

@UseGuards(OptionalJwtAuthGuard, UploadLimitGuard)
@Controller('/convert')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {}

  @Post('/pdf')
  @UseInterceptors(
    FilesInterceptor('files', 15, {
      limits: {
        fileSize: 30 * 1024 * 1024,
      },
    }),
  )
  async conversionPdf(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files) {
      throw new BadRequestException(`NO Files uploaded`);
    }

    if (files.length < 2) {
      throw new BadRequestException(`2 files minimum`);
    }

    for (const file of files) {
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('File must image');
      }
    }

    const url = await this.conversionService.merge(files);
    return {
      url,
      format: 'pdf',
    };
  }
  @Get('/hello')
  sayHello() {
    return 'Hello World!';
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async conversion(
    @UploadedFile() file: Express.Multer.File,
    @Query('format') format: string,
  ) {
    if (!file) {
      throw new BadRequestException(`Must Upload a file`);
    }

    const types = ['jpg', 'png', 'webp', 'jpeg', 'pdf'];
    if (!types.includes(format))
      throw new BadRequestException(`Invalid format ${format}`);

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException(`File must be an image`);
    }

    const url = await this.conversionService.create(file, format);
    return {
      url,
      format,
    };
  }
}
