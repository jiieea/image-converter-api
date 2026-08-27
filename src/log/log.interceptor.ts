import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { ip, originalUrl, method } = req;
    const userAgent = req.headers['user-agent'] || '';
    const start = Date.now();
    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse();
          const delay = Date.now() - start;
          this.logger.info(
            `${method} ${originalUrl} ${res.statusCode} - ${delay}ms - ${ip} - ${userAgent}`,
          );
        },
        error: (err) => {
          const delay = Date.now() - start;
          this.logger.error(
            `${method} ${originalUrl} ${err.status || 500} - ${delay}ms - ${ip} - ${err.message}`,
          );
        },
      }),
    );
  }
}
