import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch()
export class AuthFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const typeResponse = exception.getResponse();
      const errMsg =
        typeof typeResponse === 'object'
          ? (typeResponse as any)?.message
          : typeResponse;
      response.status(status).json({
        error: errMsg,
      });
    } else if (this.isZodError(exception)) {
      response.status(400).json({
        error: (exception as ZodError).issues.map((issue) => issue.message),
      });
    } else {
      response.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }

  private isZodError(exception: unknown): exception is ZodError {
    return (
      exception instanceof ZodError || (exception as any)?.name === 'ZodError'
    );
  }
}
