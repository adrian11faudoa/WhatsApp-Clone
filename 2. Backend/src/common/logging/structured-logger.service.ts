import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';

export interface LogContext {
  requestId?: string;
  route?: string;
  method?: string;
  status?: number;
  latencyMs?: number;
  actorId?: string;
  errorCode?: string;
  [key: string]: unknown;
}

/**
 * Emits single-line JSON log records so they are directly ingestible by
 * any log aggregator (structured logging by design, per the project
 * constitution). Never accepts or prints fields that look like secrets —
 * callers are responsible for not passing them, but key names are also
 * defensively scrubbed here as a last line of defense.
 */
@Injectable()
export class StructuredLoggerService extends ConsoleLogger {
  private static readonly SENSITIVE_KEY_PATTERN =
    /(password|token|secret|refreshtoken|accesstoken|authorization)/i;

  logStructured(level: LogLevel, message: string, context: LogContext = {}) {
    const record = {
      timestamp: new Date().toISOString(),
      level,
      service: process.env.APP_NAME ?? 'messaging-platform-backend',
      environment: process.env.NODE_ENV ?? 'development',
      message,
      ...this.scrub(context),
    };
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(record));
  }

  private scrub(context: LogContext): LogContext {
    const safe: LogContext = {};
    for (const [key, value] of Object.entries(context)) {
      if (StructuredLoggerService.SENSITIVE_KEY_PATTERN.test(key)) {
        continue;
      }
      safe[key] = value;
    }
    return safe;
  }
}
