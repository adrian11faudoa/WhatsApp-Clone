import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StructuredLoggerService } from '../logging/structured-logger.service';
import { REQUEST_ID_HEADER } from '../middleware/request-id.middleware';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: StructuredLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap({
        next: () => this.log(request, response, start),
        error: () => this.log(request, response, start),
      }),
    );
  }

  private log(request: Request, response: Response, start: bigint) {
    const latencyMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    const requestId = request.headers[REQUEST_ID_HEADER] as string | undefined;
    const actorId = (request as Request & { userId?: string }).userId;

    this.logger.logStructured('log', 'http_request', {
      requestId,
      method: request.method,
      route: request.originalUrl,
      status: response.statusCode,
      latencyMs: Math.round(latencyMs * 100) / 100,
      actorId,
    });
  }
}
