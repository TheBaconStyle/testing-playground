import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { AuthModule } from '@kylegillen/nestjs-fastify-better-auth';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Logger, Module, type OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { genericOAuth } from 'better-auth/plugins';
import { createConnectionString, schema } from 'db';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { NestMinioModule } from 'nestjs-minio';
import { createTransport } from 'nodemailer';
import { AppController } from './app.controller';
import {
  authOptions,
  authPlugins,
  yandexOAuthOptionsBase,
} from './auth/auth.config';
import { DB_TAG } from './db/db.config';
import { renderToHTML } from './email/templates/signin';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [] }),
    DrizzlePGModule.registerAsync({
      tag: DB_TAG,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const user = config.getOrThrow('DB_USER');
        const password = config.getOrThrow('DB_PASSWORD');
        const host = config.getOrThrow('DB_HOST');
        const port = config.getOrThrow('DB_PORT');
        const database = config.getOrThrow('DB_NAME');
        return {
          pg: {
            connection: 'pool',
            config: {
              connectionString: createConnectionString(
                user,
                password,
                host,
                port,
                database,
              ),
            },
          },
          config: {
            schema,
          },
        };
      },
    }),
    NestMinioModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          endPoint: config.getOrThrow('MINIO_HOST'),
          port: config.get('MINIO_PORT'),
          useSSL: false,
          accessKey: config.getOrThrow('MINIO_ACCESS_KEY'),
          secretKey: config.getOrThrow('MINIO_SECRET_KEY'),
        };
      },
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const transport = createTransport({
          host: config.getOrThrow('SMTP_HOST'),
          port: config.getOrThrow('SMTP_PORT'),
          secure: config.getOrThrow('SMTP_SECURE'),
          auth: {
            user: config.getOrThrow('SMTP_USER'),
            pass: config.getOrThrow('SMTP_PASSWORD'),
          },
        });

        return {
          transport,
          template: {
            dir: __dirname + '/email/templates',
            adapter: new ReactAdapter(),
          },
          defaults: {
            from: `"Habbins" <info@habbins.com>`,
          },
        };
      },
    }),
    AuthModule.forRootAsync({
      inject: [ConfigService, MailerService, DB_TAG],
      async useFactory(
        config: ConfigService,
        mail: MailerService,
        db: NodePgDatabase<typeof schema>,
      ) {
        const VK_CLIENT_ID = config.getOrThrow('AUTH_VK_ID');
        const VK_CLIENT_SECRET = config.getOrThrow('AUTH_VK_SECRET');

        const YANDEX_CLIENT_ID = config.getOrThrow('AUTH_YANDEX_ID');
        const YANDEX_CLIENT_SECRET = config.getOrThrow('AUTH_YANDEX_SECRET');

        return betterAuth({
          ...authOptions,
          database: drizzleAdapter(db, { schema, provider: 'pg' }),
          socialProviders: {
            vk: {
              clientId: VK_CLIENT_ID,
              clientSecret: VK_CLIENT_SECRET,
            },
          },
          plugins: [
            ...authPlugins,
            genericOAuth({
              config: [
                {
                  ...yandexOAuthOptionsBase,
                  clientId: YANDEX_CLIENT_ID,
                  clientSecret: YANDEX_CLIENT_SECRET,
                },
              ],
            }),
          ],
          emailVerification: {
            autoSignInAfterVerification: true,
            sendOnSignUp: true,
            async sendVerificationEmail({ user, url }) {
              await mail.sendMail({
                to: user.email,
                template: 'signin',
                subject: 'Verify your email',
                html: await renderToHTML({ url }),
              });
            },
          },
        }) as any;
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  logger = new Logger(AppModule.name);

  async onModuleInit() {
    this.logger.log('Server started on http://localhost:5000');
  }
}
