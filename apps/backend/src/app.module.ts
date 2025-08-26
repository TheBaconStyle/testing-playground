import { AuthModule } from '@kylegillen/nestjs-fastify-better-auth';
import { Logger, Module, type OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { auth } from 'shared/auth/auth';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [] }),
    // NestMinioModule.registerAsync({
    //   isGlobal: true,
    //   inject: [ConfigService],
    //   useFactory(config: ConfigService) {
    //     return {
    //       endPoint: config.getOrThrow('MINIO_HOST'),
    //       port: config.get('MINIO_PORT'),
    //       useSSL: false,
    //       accessKey: config.getOrThrow('MINIO_ACCESS_KEY'),
    //       secretKey: config.getOrThrow('MINIO_SECRET_KEY'),
    //     };
    //   },
    // }),
    AuthModule.forRoot({ auth: auth as any }),
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  logger = new Logger(AppModule.name);

  async onModuleInit() {
    this.logger.log('Server started on http://localhost:5000');
  }
}
