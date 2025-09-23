import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
    client: {
      // APP
      NEXT_PUBLIC_DOMAIN: z.string().url(),
      // S3
      NEXT_PUBLIC_S3_URL: z.string().url(),
      // IMAGES
      NEXT_PUBLIC_IMGPROXY_URL: z.string().url(),
    },
    server: {
      // APP
      API_URL: z.string().url(),
    },
    experimental__runtimeEnv: {
      NEXT_PUBLIC_IMGPROXY_URL: process.env.NEXT_PUBLIC_IMGPROXY_URL,
      NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
      NEXT_PUBLIC_S3_URL: process.env.NEXT_PUBLIC_S3_URL,
    }
  });