import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TypedRoute.Post()
  async authorize(@TypedBody() data: { sessionToken: string }) {
    return this.authService.isUserSessionExist(data.sessionToken);
  }
}
