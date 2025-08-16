import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bodyParser: false },
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://www.baconcs.duckdns.org',
      '3rs27bxx-3000.inc1.devtunnels.ms',
    ],
    credentials: true,
  });

  app.listen({ port: 5000 });
}

bootstrap();
