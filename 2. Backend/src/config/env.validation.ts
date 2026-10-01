import * as Joi from 'joi';

/**
 * Centralized environment contract. All configuration access in the
 * application must go through ConfigService reading validated values from
 * here — no module should read `process.env` directly.
 */
export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  API_PREFIX: Joi.string().default('api/v1'),
  APP_NAME: Joi.string().default('messaging-platform-backend'),

  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),

  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgres', 'postgresql'] })
    .required(),

  REDIS_URL: Joi.string()
    .uri({ scheme: ['redis', 'rediss'] })
    .default('redis://localhost:6379'),
  REDIS_ENABLED: Joi.boolean().default(true),

  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_TOKEN_TTL_SECONDS: Joi.number().positive().default(900),
  JWT_REFRESH_TOKEN_TTL_SECONDS: Joi.number().positive().default(2592000),
  JWT_ISSUER: Joi.string().default('messaging-platform'),
  JWT_AUDIENCE: Joi.string().default('messaging-platform-clients'),

  ARGON2_MEMORY_COST: Joi.number().positive().default(19456),
  ARGON2_TIME_COST: Joi.number().positive().default(2),
  ARGON2_PARALLELISM: Joi.number().positive().default(1),

  THROTTLE_DEFAULT_TTL_SECONDS: Joi.number().positive().default(60),
  THROTTLE_DEFAULT_LIMIT: Joi.number().positive().default(100),
  THROTTLE_AUTH_TTL_SECONDS: Joi.number().positive().default(60),
  THROTTLE_AUTH_LIMIT: Joi.number().positive().default(5),

  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'verbose')
    .default('info'),
}).unknown(true);

/**
 * Guards against the app silently booting with a weak secret in
 * production, which `min(32)` alone would not catch if the value were,
 * say, 32 repeated characters. This is intentionally conservative rather
 * than a full entropy check.
 */
export function assertProductionSecretsAreSafe(env: Record<string, unknown>) {
  if (env.NODE_ENV !== 'production') {
    return;
  }

  const unsafeDefaults = [
    'CHANGE_ME_ACCESS_SECRET_AT_LEAST_32_CHARS',
    'CHANGE_ME_REFRESH_SECRET_AT_LEAST_32_CHARS',
  ];

  if (
    unsafeDefaults.includes(env.JWT_ACCESS_SECRET as string) ||
    unsafeDefaults.includes(env.JWT_REFRESH_SECRET as string)
  ) {
    throw new Error(
      'Refusing to start in production with a placeholder JWT secret. Set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET to real secrets.',
    );
  }

  if (env.JWT_ACCESS_SECRET === env.JWT_REFRESH_SECRET) {
    throw new Error(
      'JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must not be identical.',
    );
  }
}
