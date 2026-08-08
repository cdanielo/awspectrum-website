import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { existsSync } from 'fs';
import { join } from 'path';
import { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: false });
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // Serve the built React frontend from frontend/dist when present (optional,
  // the frontend is normally deployed separately to GitHub Pages).
  const frontendDist = join(__dirname, '..', 'frontend', 'dist');
  if (existsSync(frontendDist)) {
    app.useStaticAssets(frontendDist);
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api') || req.path.includes('.')) {
        return next();
      }
      res.sendFile(join(frontendDist, 'index.html'));
    });
  }

  const port = configService.get<number>('PORT') || 4000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
