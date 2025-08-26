import { createEnv } from '@t3-oss/env-core';
import z from 'zod';


export const env = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  clientPrefix: 'NEXT_PUBLIC_',
  client:{
    NEXT_PUBLIC_S3_URL: z.string().url(),
    NEXT_PUBLIC_IMGPROXY_URL: z.string().url(),
  }
})