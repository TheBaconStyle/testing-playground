import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import {
  Controller,
  Logger
} from '@nestjs/common';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';
import { CreateHabitDto, HabitsService, UpdateHabitDto } from './habits.service';

export type TCreateHabitResponse = {
  success: boolean;
};

@Controller({ version: '1', path: 'habits' })
export class HabitsController {
  logger = new Logger(HabitsController.name);

  constructor(private readonly habitsService: HabitsService) {}

  @TypedRoute.Post()
  async create(
    @Session() session: UserSession,
    @TypedBody() createHabitDto: CreateHabitDto,
  ) {
    this.logger.log(`User ${session.user.id} creating new habit: ${createHabitDto.name}`);
    const newHabit = await this.habitsService.create(session.user.id, createHabitDto);
    return newHabit;
  }

  @TypedRoute.Get()
  async findAll(@Session() session: UserSession) {
    return this.habitsService.findAll(session.user.id);
  }

  @TypedRoute.Get(':id')
  async findOne(@Session() session: UserSession, @TypedParam('id') id: string) {
    return this.habitsService.findOne(id, session.user.id);
  }

  @TypedRoute.Patch(':id')
  async update(
    @Session() session: UserSession,
    @TypedParam('id') id: string,
    @TypedBody() updateHabitDto: UpdateHabitDto,
  ) {
    return this.habitsService.update(id, session.user.id, updateHabitDto);
  }

  @TypedRoute.Delete(':id')
  async remove(@Session() session: UserSession, @TypedParam('id') id: string) {
    return this.habitsService.remove(id, session.user.id);
  }

  @TypedRoute.Get(':id/stats')
  async getStats(@Session() session: UserSession, @TypedParam('id') id: string) {
    return this.habitsService.getHabitStats(session.user.id, id);
  }
}
