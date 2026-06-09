import { Module } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { ConversionController } from './conversion.controller';

@Module({
  providers: [ConversionService],
  controllers: [ConversionController],
})
export class ConversionModule {}
