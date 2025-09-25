import { Controller, Get, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { TAuthService } from './auth/auth.config';
import { AuthService } from '@kylegillen/nestjs-fastify-better-auth';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { DB, DB_TAG } from './db/db.config';
import { schema } from 'db';
import { desc, sql } from 'drizzle-orm';

@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService<TAuthService>, @InjectDrizzle(DB_TAG) private readonly db: DB) {}

  @Get('qwe')
  async getHello(@Req() req: FastifyRequest) {
    const requestHeaders = new Headers();

    const headerEntries = Object.entries(req.headers);

    for (const [key, value] of headerEntries) {
      if (value) requestHeaders.append(key, value.toString());
    }
    return this.authService.api.userHasPermission({
      body: {
        permissions: {
          user: ['create'],
        },
      },
      headers: requestHeaders,
    });
  }

  @Get('stats')
  async getHabitStats() {
    const rankedDates = this.db.$with('RankedDates').as(
      this.db
        .select({
          habitId: schema.habitCheckmark.habitId,
          checkDate: schema.habitCheckmark.date,
          rowNumber: sql`ROW_NUMBER() OVER (PARTITION BY habitId ORDER BY checkDate)`.as('rowNumber'),
        })
        .from(schema.habitCheckmark),
    );
    const streakGroups = this.db.$with('StreakGroups').as(
      this.db
        .select({
          habitId: rankedDates.habitId,
          checkDate: rankedDates.checkDate,
          groupId: sql`${rankedDates.checkDate} - (${rankedDates.rowNumber} * INTERVAL '1 day')`.as('groupId'),
        })
        .from(rankedDates),
    );

    const habitStats = await this.db.select({
      habitId: streakGroups.habitId,
      lastCheckDate: sql<number>`MAX(${streakGroups.checkDate})`.as('lastCheckDate'),
      currentStreak: sql<number>`COUNT(*)`.as('currentStreak'),
      longestStreak: sql<number>`MAX(COUNT(*)) OVER (PARTITION BY ${streakGroups.habitId})`.as('longestStreak'),
    }).from(streakGroups).groupBy(streakGroups.habitId, streakGroups.groupId).orderBy(streakGroups.habitId, desc(streakGroups.habitId))
  }
}
