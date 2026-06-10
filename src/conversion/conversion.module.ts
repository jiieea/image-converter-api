import { Module } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { ConversionController } from './conversion.controller';
import { StorageService } from '../storage/storage.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ConversionService, StorageService, PrismaService],
  controllers: [ConversionController],
})
export class ConversionModule {}
