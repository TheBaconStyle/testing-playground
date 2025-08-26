import { AuthService } from '@kylegillen/nestjs-fastify-better-auth';
import { Controller, Get, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import type { auth } from 'shared/auth/auth';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService<typeof auth>) {}

  @Get()
  getHello(@Req() req: FastifyRequest) {
    // return this.authService.api.userHasPermission({
    //   body: {
    //     userId: 'qweqweqwqwe',
    //     permissions: {
    //       habit: ['create'],
    //     },
    //   },
    //   headers: fromNodeHeaders(req.headers),
    // });
    return 'Hrllo backend'
  }
}
