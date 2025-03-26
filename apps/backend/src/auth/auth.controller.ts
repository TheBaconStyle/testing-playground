import { Input, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { AuthService } from './auth.service';

@Router({ alias: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Query({
    input: z.object({
      token: z.string(),
    }),
  })
  async authorize(@Input('token') token: string) {
    // const sessionToken = context.req.headers.authorization ?? '';
    return {
      isAuthorized: await this.authService.isUserSessionExist(token),
    };
  }
}
