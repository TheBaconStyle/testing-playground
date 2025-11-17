import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { TypedRoute } from '@nestia/core';
import { Controller, Logger, Req } from '@nestjs/common';
import { schema } from 'db';
import { desc, eq, sql } from 'drizzle-orm';
import { Request } from 'express';
import { DB, DB_TAG } from './db/db.config';
import { habit, habitCheckmark, user } from 'db/schema';

@Controller({ version: '1', path: 'app' })
export class AppController {
  logger = new Logger(AppController.name);

  constructor(
    // private readonly authService: AuthService<TAuth>,
    @InjectDrizzle(DB_TAG) private readonly db: DB,
  ) {}
  /**
   * Method description
   */
  @TypedRoute.Get()
  async getHello(@Req() req: Request) {
    // const requestHeaders = new Headers();
    // const headerEntries = Object.entries(req.headers);
    // for (const [key, value] of headerEntries) {
    //   if (value) requestHeaders.append(key, value.toString());
    // }
    // return this.authService.api
    //   .userHasPermission({
    //     body: {
    //       permissions: {
    //         habit: ['create'],
    //       },
    //     },
    //     headers: requestHeaders,
    //   })
    //   .catch((e) => {
    //     if (e instanceof APIError) {
    //       this.logger.error(e);

    //       throw new HttpException(String(e.status), e.statusCode);
    //     }

    //     throw new InternalServerErrorException();
    //   });
    return 'Hello Nestjs';
  }

  
}
