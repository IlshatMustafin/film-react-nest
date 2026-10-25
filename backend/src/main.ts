import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public', 'content', 'afisha'), {
    prefix: '/content/afisha/',
  });

  await app.listen(3000);
}
bootstrap();
