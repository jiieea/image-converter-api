import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { ConversionModule } from '../conversion/conversion.module';
import { CleanupModule } from '../cleanup/cleanup.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CompressionModule } from '../compression/compression.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    ScheduleModule.forRoot({}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
    PrismaModule,
    StorageModule,
    AuthModule,
    ConversionModule,
    CleanupModule,
    CompressionModule,
  ],
})
export class CommonModule {}
