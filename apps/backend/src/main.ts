import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AuthService } from '@kylegillen/nestjs-fastify-better-auth';
import { AppModule } from './app.module';
import { TAuthService } from './auth/auth.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: false,
    },
  );

  if (process.env.NODE_ENV !== 'production') {
    const authService = app.get<AuthService<TAuthService>>(AuthService);

    const openApiReference = await authService.api.generateOpenAPISchema();

    app.use(
      '/api/auth/reference',
      apiReference({ withFastify: true, content: openApiReference }),
    );
  }

  app.enableCors({
    origin: [
      'localhost:3000',
      'www.baconcs.duckdns.org',
      '3rs27bxx-3000.inc1.devtunnels.ms',
      'client.scalar.com',
    ],
    credentials: true,
  });

  app.listen(5000);
}

bootstrap();
