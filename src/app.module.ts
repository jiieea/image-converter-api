import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CompressionService } from './compression/compression.service';

@Module({
  imports: [CommonModule],
  controllers: [AppController],
  providers: [AppService, CompressionService],
})
export class AppModule {}
