import { Inject, Injectable } from '@nestjs/common';
import { DBType } from '../db';
import { and, eq, gte } from 'drizzle-orm';
import * as schema from 'db/schema';

@Injectable()
export class AuthService {
  constructor(@Inject('DB_TAG') private readonly db: DBType) {}

  async isUserSessionExist(token: string) {
    const session = await this.db.query.sessions.findFirst({
      where: and(
        eq(schema.sessions.sessionToken, token),
        gte(schema.sessions.expires, new Date()),
      ),
    });

    return Boolean(session);
  }
}
