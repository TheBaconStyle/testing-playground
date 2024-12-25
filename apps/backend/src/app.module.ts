import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createConnectionString, schema } from 'db';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzlePGModule.registerAsync({
      tag: 'DB_TAG',
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const user = config.getOrThrow<string>('DB_USER');
        const password = config.getOrThrow<string>('DB_PASSWORD');
        const host = config.getOrThrow<string>('DB_HOST');
        const port = config.getOrThrow<string>('DB_PORT');
        const dbName = config.getOrThrow<string>('DB_NAME');

        return {
          pg: {
            connection: 'pool',
            config: {
              connectionString: createConnectionString(
                user,
                password,
                host,
                port,
                dbName,
              ),
            },
          },
          config: {
            schema: { ...schema },
          },
        };
      },
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements OnModuleInit {
  logger = new Logger(AppModule.name);

  async onModuleInit() {
    this.logger.log(`Server started on http://localhost:5000`);
  }
}
