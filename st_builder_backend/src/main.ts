import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const cors = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3001',
        'http://stbuilder.ru:3001',
        'http://vovavish.stbuilder.ru:3001',
        'http://demo.stbuilder.ru:3001',
        'http://demo.localhost:3001',
        process.env.FRONTEND_URL,
      ];
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        /^https?:\/\/([a-zA-Z0-9-]+\.)*stbuilder\.ru(:\d+)?$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };

  app.enableCors(cors);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();