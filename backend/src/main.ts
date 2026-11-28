import { LoggerService, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TSKVLogger } from './logger/tskv.logger';

function getLogger(loggerType?: string): LoggerService {
  switch (loggerType?.toLowerCase()) {
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TSKVLogger();
    default:
      return new DevLogger();
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const loggerType = configService.get<string>('LOGGER_TYPE');
  app.useLogger(getLogger(loggerType));

  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(
    '/api/afisha',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public', 'content', 'afisha'), {
    prefix: '/content/afisha/',
  });

  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port);
}
bootstrap();
