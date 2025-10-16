import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  type NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './src/app.module';
import { VersioningType } from '@nestjs/common';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(),
    );

    app.setGlobalPrefix('api');

    app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'v',
    });

    return app;
  },
  output: '../../packages/sdk/src',
  distribute: '../../packages/sdk',
  clone: true,
  // primitive: true,
  // propagate: true,
  // assert: true,
  // json: true,
};
export default NESTIA_CONFIG;
