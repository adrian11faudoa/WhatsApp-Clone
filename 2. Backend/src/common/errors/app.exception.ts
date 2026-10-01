import { HttpException, HttpStatus } from '@nestjs/common';
import { AppErrorCode } from './app-error-codes';

export interface AppExceptionOptions {
  code: AppErrorCode;
  message: string;
  status: HttpStatus;
  details?: Record<string, unknown>;
  retryable?: boolean;
}

/**
 * All domain-level errors thrown by services should extend or use this
 * exception so the global exception filter can produce a single,
 * consistent error envelope across the API.
 */
export class AppException extends HttpException {
  public readonly code: AppErrorCode;
  public readonly details?: Record<string, unknown>;
  public readonly retryable: boolean;

  constructor(options: AppExceptionOptions) {
    super(
      {
        code: options.code,
        message: options.message,
        details: options.details,
        retryable: options.retryable ?? false,
      },
      options.status,
    );
    this.code = options.code;
    this.details = options.details;
    this.retryable = options.retryable ?? false;
  }
}
