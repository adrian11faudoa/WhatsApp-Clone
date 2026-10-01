import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import {
  appConfig,
  argon2Config,
  corsConfig,
  databaseConfig,
  jwtConfig,
  loggingConfig,
  redisConfig,
  throttleConfig,
} from './configuration';
import {
  assertProductionSecretsAreSafe,
  envValidationSchema,
} from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: false,
      },
      load: [
        appConfig,
        corsConfig,
        databaseConfig,
        redisConfig,
        jwtConfig,
        argon2Config,
        throttleConfig,
        loggingConfig,
      ],
      validate: (config) => {
        const { error, value } = envValidationSchema.validate(config, {
          abortEarly: false,
          allowUnknown: true,
        });
        if (error) {
          throw new Error(
            `Invalid environment configuration: ${error.message}`,
          );
        }
        assertProductionSecretsAreSafe(value);
        return value;
      },
    }),
  ],
})
export class AppConfigModule {}
