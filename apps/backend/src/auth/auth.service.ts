import { Inject, Injectable } from '@nestjs/common';
import type { DBType } from 'db';

@Injectable()
export class AuthService {
  constructor(@Inject('DB_TAG') private readonly db: DBType) {}

  async isUserSessionExist(token: string) {
    const session = await this.db.query.sessions.findFirst({
      where: (ses, { eq, and, gte }) =>
        and(eq(ses.sessionToken, token), gte(ses.expires, new Date())),
    });

    return Boolean(session);
  }
}
