import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.use(
    cors.default({
      origin: process.env.FRONTEND_URL || [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'https://hrms-user-management.vercel.app',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();