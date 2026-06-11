import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { Cron, CronExpression } from '@nestjs/schedule';
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

    const expired = await this.prismaService.conversion.findMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    if (expired.length == 0) {
      this.logger.info(`There is no expired files`);
      return;
    }

    this.logger.info(`Found ${expired.length} expired files`);

    for (const record of expired) {
      try {
        await this.storageService.delete(record.fileUrl);

        await this.prismaService.conversion.delete({
          where: { id: record.id },
        });

        this.logger.info(`Delete Expired files succeeded`);
      } catch (err: any) {
        if (err instanceof Error) {
          this.logger.error(`Failed to remove expired file: ${err.message}`);
        }
        this.logger.info(
          `Cleanup Terminate, ${expired.length} files has been removed`,
        );
      }
    }
  }
}
