import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CreateHabitDto, HabitsService, UpdateHabitDto } from './habits.service';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';

export type TCreateHabitResponse = {
  success: boolean;
};

@Controller({ version: '1', path: 'habits' })
export class HabitsController {
  logger = new Logger(HabitsController.name);

  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  async create(
    @Session() session: UserSession,
    @Body() createHabitDto: CreateHabitDto,
  ) {
    this.logger.log(`User ${session.user.id} creating new habit: ${createHabitDto.name}`);
    const newHabit = await this.habitsService.create(session.user.id, createHabitDto);
    return newHabit;
  }

  @Get()
  async findAll(@Session() session: UserSession) {
    return this.habitsService.findAll(session.user.id);
  }

  @Get(':id')
  async findOne(@Session() session: UserSession, @Param('id') id: string) {
    return this.habitsService.findOne(id, session.user.id);
  }

  @Patch(':id')
  async update(
    @Session() session: UserSession,
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
  ) {
    return this.habitsService.update(id, session.user.id, updateHabitDto);
  }

  @Delete(':id')
  async remove(@Session() session: UserSession, @Param('id') id: string) {
    return this.habitsService.remove(id, session.user.id);
  }
}
