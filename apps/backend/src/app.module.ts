import { Logger, Module, type OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { NestMinioModule } from 'nestjs-minio';
import { auth } from 'shared/auth';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NestMinioModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          endPoint: config.getOrThrow('MINIO_HOST'),
          port: config.getOrThrow('MINIO_PORT'),
          useSSL: false,
          accessKey: config.getOrThrow('MINIO_ACCESS_KEY'),
          secretKey: config.getOrThrow('MINIO_SECRET_KEY'),
        };
      },
    }),
    AuthModule.forRoot(auth, { disableBodyParser: true }),
  ],
  // controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  logger = new Logger(AppModule.name);

  async onModuleInit() {
    this.logger.log('Server started on http://localhost:5000');
  }
}
