import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const apiPrefix = config.get<string>('app.apiPrefix') as string;
  const isProduction = config.get<boolean>('app.isProduction');
  const corsOrigins = config.get<string[]>('cors.origins') as string[];

  // ---------------------------------------------------------------------
  // Security middleware
  // ---------------------------------------------------------------------
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
    }),
  );

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  });

  app.setGlobalPrefix(apiPrefix, {
    exclude: ['health/live', 'health/ready'],
  });

  app.enableShutdownHooks();

  // ---------------------------------------------------------------------
  // API documentation
  // ---------------------------------------------------------------------
  if (!isProduction) {
    const swaggerDocument = new DocumentBuilder()
      .setTitle('WhatsApp-style Messaging Platform API')
      .setDescription(
        'Backend Volume 1 — foundational accounts, auth, devices, sessions, conversations, and groups.',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerDocument);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
  }

  const port = config.get<number>('app.port') as number;
  await app.listen(port);
  logger.log(
    `${config.get<string>('app.name')} listening on port ${port} (${config.get('app.nodeEnv')})`,
  );
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal error during application bootstrap:', err);
  process.exit(1);
});
