import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/convert')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {}

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
