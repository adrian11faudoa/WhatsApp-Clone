import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

export const REQUEST_ID_HEADER = 'x-request-id';

/**
 * A client-supplied x-request-id is honored only if it looks like a
 * reasonable opaque token, to avoid log injection or unbounded header
 * values; otherwise the server mints its own. Every request gets a
 * correlation ID either way, echoed back to the caller and available to
 * the logging interceptor and exception filter.
 */
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const incoming = req.headers[REQUEST_ID_HEADER];
    const isValid =
      typeof incoming === 'string' &&
      incoming.length > 0 &&
      incoming.length <= 128 &&
      /^[a-zA-Z0-9_-]+$/.test(incoming);

    const requestId = isValid ? (incoming as string) : randomUUID();

    req.headers[REQUEST_ID_HEADER] = requestId;
    res.setHeader(REQUEST_ID_HEADER, requestId);
    next();
  }
}
