import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthenticatedUser {
  userId: string;
  sessionId: string;
  deviceId: string;
}

/**
 * Reads the authenticated principal attached by JwtAuthGuard. Never trust
 * a user ID supplied in a request body/query for authorization purposes —
 * always use this decorator's value, which comes from a verified JWT.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthenticatedUser;
  },
);
