import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
  ],
  providers: [PrismaModule, StorageModule],
})
export class CommonModule {}
