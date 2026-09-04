import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DAILY_LIMIT = 5;
@Injectable()
export class UploadLimitGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      return true;
    }

    const ip = this.getIp(request);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const usage = await this.prisma.uploadUsage.upsert({
      where: { ip_date: { ip, date: today } },
      update: {},
      create: { ip, date: today, count: 0 },
    });

    if (usage.count >= DAILY_LIMIT) {
      throw new HttpException(
        `Daily upload limit reached (${DAILY_LIMIT}/day for guest users). Please log in for unlimited uploads.`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    await this.prisma.uploadUsage.update({
      where: {
        ip_date: { ip, date: today },
      },
      data: { count: { increment: 1 } },
    });

    return true;
  }

  private getIp(req) {
    const forwardedIp = req.headers['x-forwarded-for'];
    if (forwardedIp) {
      return Array.isArray(forwardedIp)
        ? forwardedIp[0]
        : forwardedIp.split(',')[0].trim();
    }
    return req.ip || req.connection.remoteAddress || 'unknown';
  }
}
