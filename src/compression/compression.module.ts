import { Module } from '@nestjs/common';
import { CompressionService } from './compression.service';
import { CompressionController } from './compression.controller';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Module({
  providers: [CompressionService, PrismaService, StorageService],
  controllers: [CompressionController],
})
export class CompressionModule {}
