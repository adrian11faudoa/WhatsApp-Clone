import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

/**
 * Cursor-based pagination query params, per the project's canonical
 * pagination strategy. `cursor` is an opaque, base64-encoded token
 * produced by `encodeCursor` — clients must not construct it themselves.
 */
export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Opaque pagination cursor returned by a previous page.',
  })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({
    default: DEFAULT_PAGE_SIZE,
    maximum: MAX_PAGE_SIZE,
    description: `Bounded page size (max ${MAX_PAGE_SIZE}).`,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_PAGE_SIZE)
  limit?: number;
}

export interface CursorPage<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

interface CursorPayload {
  createdAt: string;
  id: string;
}

/**
 * Encodes a stable (createdAt, id) tuple into an opaque cursor. Using the
 * tuple rather than just createdAt keeps ordering deterministic even when
 * multiple rows share the same timestamp.
 */
export function encodeCursor(payload: CursorPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export function decodeCursor(cursor: string): CursorPayload | null {
  try {
    const decoded = JSON.parse(
      Buffer.from(cursor, 'base64url').toString('utf-8'),
    );
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      typeof decoded.createdAt === 'string' &&
      typeof decoded.id === 'string'
    ) {
      return decoded as CursorPayload;
    }
    return null;
  } catch {
    return null;
  }
}

export function resolveLimit(limit?: number): number {
  if (!limit || limit < 1) return DEFAULT_PAGE_SIZE;
  return Math.min(limit, MAX_PAGE_SIZE);
}
