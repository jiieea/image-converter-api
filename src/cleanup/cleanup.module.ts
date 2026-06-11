import { Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Module({
  providers: [CleanupService, PrismaService, StorageService],
})
export class CleanupModule {}
