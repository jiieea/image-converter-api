import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
@Controller('/convert')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {}

  @Get('/hello')
  sayHello() {
    return 'Hello World!';
  }

  @Post('/pdf')
  @UseInterceptors(
    FilesInterceptor('files', 15, {
      limits: {
        fileSize: 50 * 1024 * 1024,
      },
    }),
  )
  async pdfConvert(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException(`Files must be uploaded`);
    }
    if (files.length < 2) {
      throw new BadRequestException(`Files must be at least 2 `);
    }
    for (const file of files) {
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException(`Files must be an Image`);
      }
    }

    const url = await this.conversionService.merge(files);
    return {
      url,
      format: 'pdf',
    };
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024,
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
