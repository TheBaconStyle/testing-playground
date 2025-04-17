import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { AuthService } from './auth.service';
import { Client } from 'minio';

const minioClient = new Client({
  endPoint: 's3.baconcs.duckdns.org',
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const outputSchema = z.object({
  isAuthorized: z.boolean(),
});

const uploadReleaseSchema = z.object({
  title: z.string(),
  startDate: z.string(),
  roles: z
    .object({
      person: z.string(),
      role: z.string(),
    })
    .array(),
  area: z.object({
    negate: z.boolean(),
    data: z.string().array(),
  }),
  platforms: z.string().array(),
});

const uploadReleaseOutput = z.object({
  message: z.string(),
});

type TUploadRelease = z.infer<typeof uploadReleaseSchema>;

@Router({ alias: 'auth' })
export class AuthRouter {
  constructor(private readonly authService: AuthService) {}

  @Query({
    input: z.object({
      token: z.string(),
    }),
    output: outputSchema,
  })
  async authorize(
    @Input('token') token: string,
  ): Promise<z.infer<typeof outputSchema>> {
    const isAuthorized = await this.authService.isUserSessionExist(token);

    return {
      isAuthorized,
    };
  }

  @Mutation({
    input: uploadReleaseSchema,
    output: uploadReleaseOutput,
  })
  async uploadRelease(
    @Input() data: TUploadRelease,
  ): Promise<z.infer<typeof uploadReleaseOutput>> {
    return {
      message: await minioClient.presignedPutObject(
        'images',
        'qwe.png',
        10 * 60 * 24,
      ),
    };
  }
}
