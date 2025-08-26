import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AuthService } from '@kylegillen/nestjs-fastify-better-auth';
import { auth } from 'shared/auth/auth';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: false,
    },
  );

  const authService = app.get<AuthService<typeof auth>>(AuthService)

  const openApiReference = await authService.api.generateOpenAPISchema()

  app.use('/api/auth/reference', apiReference({withFastify: true, content: openApiReference}))

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://www.baconcs.duckdns.org',
      '3rs27bxx-3000.inc1.devtunnels.ms',
      'client.scalar.com',
    ],
    credentials: true,
  });

  app.listen(5000);
}

bootstrap();
