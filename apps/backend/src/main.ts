import { NestiaSwaggerComposer } from '@nestia/sdk';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { AppModule } from './app.module';
import { TAuth } from './auth/auth.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  if (process.env.NODE_ENV === 'development') {
    const authService = app.get<AuthService<TAuth>>(AuthService);

    const openApiReference = await authService.api.generateOpenAPISchema();

    app.use('/api/auth/reference', apiReference({ content: openApiReference }));

    const document = await NestiaSwaggerComposer.document(app, {
      servers: [{ url: 'http://localhost:5000', description: 'Localhost' }],
    });

    app.use('/api/reference', apiReference({ content: document }));
  }

  const config = app.get(ConfigService);

  app.enableCors({
    origin: [config.getOrThrow('BETTER_AUTH_URL')],
    credentials: true,
  });

  app.listen(5000);
}

bootstrap();
