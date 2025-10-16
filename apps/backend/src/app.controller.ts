import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { TypedRoute } from '@nestia/core';
import {
  Controller,
  HttpException,
  InternalServerErrorException,
  Logger,
  Req,
} from '@nestjs/common';
import { APIError } from 'better-auth/api';
import { schema } from 'db';
import { desc, sql } from 'drizzle-orm';
import { Request } from 'express';
import { TAuth } from './auth/auth.config';
import { DB, DB_TAG } from './db/db.config';
import { AuthService } from '@thallesp/nestjs-better-auth';

@Controller({ version: '1' })
export class AppController {
  logger = new Logger(AppController.name);

  constructor(
    private readonly authService: AuthService<TAuth>,
    @InjectDrizzle(DB_TAG) private readonly db: DB,
  ) {}

  @TypedRoute.Get('qwe')
  async getHello(@Req() req: Request) {
    const requestHeaders = new Headers();
    const headerEntries = Object.entries(req.headers);
    for (const [key, value] of headerEntries) {
      if (value) requestHeaders.append(key, value.toString());
    }
    return this.authService.api
      .userHasPermission({
        body: {
          permissions: {
            habit: ['create'],
          },
        },
        headers: requestHeaders,
      })
      .catch((e) => {
        if (e instanceof APIError) {
          this.logger.error(e);

          throw new HttpException(String(e.status), e.statusCode);
        }

        throw new InternalServerErrorException();
      });
  }

  @TypedRoute.Post('stats')
  async getHabitStats() {
    const rankedDates = await this.db.$with('RankedDates').as(
      this.db
        .select({
          habitId: schema.habitCheckmark.habitId,
          checkDate: schema.habitCheckmark.date,
          rowNumber:
            sql<number>`ROW_NUMBER() OVER (PARTITION BY ${schema.habitCheckmark.habitId} ORDER BY ${schema.habitCheckmark.date})`.as(
              'rowNumber',
            ),
        })
        .from(schema.habitCheckmark),
    );
    const streakGroups = await this.db.$with('StreakGroups').as(
      this.db
        .with(rankedDates)
        .select({
          habitId: rankedDates.habitId,
          checkDate: rankedDates.checkDate,
          groupId:
            sql<string>`${rankedDates.checkDate} - (${rankedDates.rowNumber} * INTERVAL '1 day')`.as(
              'groupId',
            ),
        })
        .from(rankedDates),
    );
    const habitStats = await this.db
      .with(streakGroups)
      .select({
        habitId: streakGroups.habitId,
        lastCheckDate: sql<number>`MAX(${streakGroups.checkDate})`.as(
          'lastCheckDate',
        ),
        currentStreak: sql<number>`COUNT(*)`.as('currentStreak'),
        longestStreak:
          sql<number>`MAX(COUNT(*)) OVER (PARTITION BY ${streakGroups.habitId})`.as(
            'longestStreak',
          ),
      })
      .from(streakGroups)
      .groupBy(streakGroups.habitId, streakGroups.groupId)
      .orderBy(streakGroups.habitId, desc(streakGroups.habitId));

    return habitStats;
  }
}
