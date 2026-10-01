import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from '../errors/app.exception';
import { AppErrorCode } from '../errors/app-error-codes';
import { REQUEST_ID_HEADER } from '../middleware/request-id.middleware';

interface ErrorResponseBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
    retryable: boolean;
    requestId?: string;
    timestamp: string;
    path: string;
  };
}

/**
 * Ensures every error response — expected domain errors, framework
 * validation errors, and unhandled exceptions alike — is shaped
 * identically and never leaks internals (stack traces, SQL, infra
 * topology) to the client.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.headers[REQUEST_ID_HEADER] as string | undefined;

    const { status, code, message, details, retryable } =
      this.resolve(exception);

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.originalUrl}: ${
          exception instanceof Error ? exception.stack : String(exception)
        }`,
      );
    }

    const body: ErrorResponseBody = {
      error: {
        code,
        message,
        details,
        retryable,
        requestId,
        timestamp: new Date().toISOString(),
        path: request.originalUrl,
      },
    };

    response.status(status).json(body);
  }

  private resolve(exception: unknown): {
    status: number;
    code: string;
    message: string;
    details?: unknown;
    retryable: boolean;
  } {
    if (exception instanceof AppException) {
      return {
        status: exception.getStatus(),
        code: exception.code,
        message: exception.message,
        details: exception.details,
        retryable: exception.retryable,
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      const message = this.extractMessage(response, exception.message);
      return {
        status,
        code: this.codeForStatus(status),
        message,
        details:
          typeof response === 'object' &&
          response !== null &&
          'message' in response &&
          Array.isArray((response as { message: unknown }).message)
            ? { validationErrors: (response as { message: string[] }).message }
            : undefined,
        retryable: false,
      };
    }

    // Unknown/unhandled error — never leak internals.
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: AppErrorCode.INTERNAL_ERROR,
      message: 'An unexpected error occurred.',
      retryable: true,
    };
  }

  private extractMessage(response: unknown, fallback: string): string {
    if (typeof response === 'string') {
      return response;
    }
    if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response
    ) {
      const msg = (response as { message: unknown }).message;
      if (typeof msg === 'string') return msg;
      if (Array.isArray(msg)) return msg[0] ?? fallback;
    }
    return fallback;
  }

  private codeForStatus(status: number): AppErrorCode {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return AppErrorCode.VALIDATION_FAILED;
      case HttpStatus.UNAUTHORIZED:
        return AppErrorCode.UNAUTHENTICATED;
      case HttpStatus.FORBIDDEN:
        return AppErrorCode.FORBIDDEN;
      case HttpStatus.NOT_FOUND:
        return AppErrorCode.NOT_FOUND;
      case HttpStatus.CONFLICT:
        return AppErrorCode.CONFLICT;
      case HttpStatus.TOO_MANY_REQUESTS:
        return AppErrorCode.RATE_LIMITED;
      default:
        return AppErrorCode.INTERNAL_ERROR;
    }
  }
}
