import { createEnv } from '@t3-oss/env-core';
import z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  server:{
    // APP
    NODE_ENV: z.string(),
    PORT: z.coerce.number().optional(),
    // DB
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    // AUTH
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    AUTH_VK_ID: z.string(),
    AUTH_VK_SECRET: z.string(),
    AUTH_VK_SERVICE: z.string(),
    AUTH_YANDEX_ID: z.string(),
    AUTH_YANDEX_SECRET: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),
    // SMTP
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_SECURE: z.coerce.boolean().optional(),
    SMTP_USER: z.string(),
    SMTP_PASSWORD: z.string(),
    // S3
    MINIO_HOST: z.string(),
    MINIO_PORT: z.coerce.number().optional(),
    MINIO_ACCESS_KEY: z.string(),
    MINIO_SECRET_KEY: z.string(),
  }
})