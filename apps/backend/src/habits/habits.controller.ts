import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Logger, Req, UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  AuthService,
  Session,
  UserSession,
} from '@thallesp/nestjs-better-auth';
import { FastifyRequest } from 'fastify';
import { TAuth } from '../auth/auth.config';

export type TCreateHabitBody = {
  name: string;
  goal: string;
};

export type TCreateHabitResponse = {
  success: boolean;
};

@Controller({ version: '1', path: 'habits' })
export class HabitsController {
  logger = new Logger(HabitsController.name);

  constructor(private readonly authService: AuthService<TAuth>) {}

  @TypedRoute.Post()
  async newHabit(
    @TypedBody() body: TCreateHabitBody,
    @Req() req: FastifyRequest,
    @Session() sess: UserSession,
  ): Promise<TCreateHabitResponse> {
    // const requestHeaders = new Headers();
    // const headerEntries = Object.entries(req.headers);
    // for (const [key, value] of headerEntries) {
    //   if (value) requestHeaders.append(key, value.toString());
    // }
    // const sess = await this.authService.api.getSession({
    //   headers: requestHeaders,
    // });

    // if (!sess) {
    //   throw new UnauthorizedException();
    // }

    this.logger.log(JSON.stringify(body));

    if (Math.random() > 0.5) {
      return { success: false };
    }

    return { success: true };
  }
}
