import { TypedRoute } from '@nestia/core';
import { Controller, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TypedRoute.Post()
  async authorize(@Headers('Authorization') sessionToken: string) {
    return this.authService.isUserSessionExist(sessionToken);
  }
}
