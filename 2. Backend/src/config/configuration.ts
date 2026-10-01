import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api/v1',
  name: process.env.APP_NAME ?? 'messaging-platform-backend',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
}));

export const corsConfig = registerAs('cors', () => ({
  origins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
}));

export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}));

export const redisConfig = registerAs('redis', () => ({
  url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  enabled: (process.env.REDIS_ENABLED ?? 'true') === 'true',
}));

export const jwtConfig = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenTtlSeconds: parseInt(
    process.env.JWT_ACCESS_TOKEN_TTL_SECONDS ?? '900',
    10,
  ),
  refreshTokenTtlSeconds: parseInt(
    process.env.JWT_REFRESH_TOKEN_TTL_SECONDS ?? '2592000',
    10,
  ),
  issuer: process.env.JWT_ISSUER ?? 'messaging-platform',
  audience: process.env.JWT_AUDIENCE ?? 'messaging-platform-clients',
}));

export const argon2Config = registerAs('argon2', () => ({
  memoryCost: parseInt(process.env.ARGON2_MEMORY_COST ?? '19456', 10),
  timeCost: parseInt(process.env.ARGON2_TIME_COST ?? '2', 10),
  parallelism: parseInt(process.env.ARGON2_PARALLELISM ?? '1', 10),
}));

export const throttleConfig = registerAs('throttle', () => ({
  defaultTtlSeconds: parseInt(
    process.env.THROTTLE_DEFAULT_TTL_SECONDS ?? '60',
    10,
  ),
  defaultLimit: parseInt(process.env.THROTTLE_DEFAULT_LIMIT ?? '100', 10),
  authTtlSeconds: parseInt(process.env.THROTTLE_AUTH_TTL_SECONDS ?? '60', 10),
  authLimit: parseInt(process.env.THROTTLE_AUTH_LIMIT ?? '5', 10),
}));

export const loggingConfig = registerAs('logging', () => ({
  level: process.env.LOG_LEVEL ?? 'info',
}));
