import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { Cron, CronExpression } from '@nestjs/schedule';

interface expireableRecord {
  id: string;
  fileUrl: string;
}

@Injectable()
export class CleanupService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async cleanup(): Promise<void> {
    this.logger.info(`Cleanup service called`);

    const [conversionFile, compressionFile] = await Promise.all([
      this.prismaService.conversion.findMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      }),
      this.prismaService.compression.findMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      }),
    ]);

    if (conversionFile.length === 0 && compressionFile.length === 0) {
      this.logger.info('No expired files found');
      return;
    }

    this.logger.info(
      `Found ${conversionFile.length} expired conversion(s) and ${compressionFile.length} expired compression(s)`,
    );

    const [expiredConversion, expiredCompression] = await Promise.all([
      this.clearRecord('conversion', conversionFile, (id) =>
        this.prismaService.conversion.delete({ where: { id } }),
      ),
      this.clearRecord('compression', compressionFile, (id) =>
        this.prismaService.compression.delete({ where: { id } }),
      ),
    ]);

    this.logger.info(
      `Cleanup finished. Conversions removed: ${expiredConversion.success}/${conversionFile.length}. ` +
        `Compressions removed: ${expiredCompression.success}/${compressionFile.length}.`,
    );
  }

  private async clearRecord(
    entity: string,
    records: expireableRecord[],
    onDelete: (id: string) => Promise<unknown>,
  ): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const record of records) {
      try {
        await this.storageService.delete(record.fileUrl);
        await onDelete(record.id);
        success++;
      } catch (err: any) {
        failed++;
        const message = err instanceof Error ? err.message : 'Unknown error';
        this.logger.error(
          `Failed to remove expired ${entity} record ${record.id}: ${message}`,
        );
      }
    }
    return { success, failed };
  }
}
