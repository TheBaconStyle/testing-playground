import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { Injectable, NotFoundException } from '@nestjs/common';
import { habit, habitCheckmark, user } from 'db/schema';
import {
  and,
  desc,
  eq,
  gte,
  InferSelectModel,
  isNotNull,
  isNull,
  like,
  lte,
  sql,
  SQL,
} from 'drizzle-orm';
import { DB, DB_TAG } from 'src/db/db.config';
import { TGetHabitQuery } from './types';
import { tags } from 'typia';
import { slugify } from 'transliteration';
import { Extends } from 'shared/types/extends';

export type HabitModel = InferSelectModel<typeof habit>;

/**
 * @title CreateHabitDto
 * @description Данные, необходимые для создания новой привычки.
 */
export type CreateHabitDto = Extends<
  Pick<HabitModel, 'name' | 'description' | 'icon' | 'reminderRule'>,
  {
    /**
     * Имя привычки.
     */
    name: string & tags.MaxLength<256>;

    /**
     * Описание привычки (необязательно).
     */
    description?: string;

    /**
     * Иконка для привычки (необязательно).
     */
    icon?: string;

    /**
     * Правило напоминания (например, cron-строка) (необязательно).
     */
    reminderRule?: string;
  }
>;

/**
 * @title UpdateHabitDto
 * @description Частичные данные для обновления существующей привычки.
 */
export type UpdateHabitDto = Partial<CreateHabitDto> & {
  /**
   * Дата окончания привычки (для завершения, необязательно).
   */
  finish?: Date | null;
};

// Функция для генерации "slug" из имени, который будет использоваться как codeName
const generateCodeName = (name: string): string => {
  return slugify(name);
};

@Injectable()
export class HabitsService {
  // Инжекция объекта базы данных Drizzle
  constructor(
    @InjectDrizzle(DB_TAG)
    private readonly db: DB,
  ) {}

  /**
   * @description Создает новую привычку для указанного пользователя.
   * @param userId ID пользователя, создающего привычку.
   * @param createHabitDto Данные для создания привычки.
   * @returns Созданная привычка.
   */
  async create(userId: string, createHabitDto: CreateHabitDto) {
    const codeName = generateCodeName(createHabitDto.name);

    const [newHabit] = await this.db
      .insert(habit)
      .values({
        ...createHabitDto,
        userId: userId,
        codeName,
        start: new Date(),
      })
      .returning();

    if (!newHabit) {
      throw new Error('Failed to create habit');
    }

    return newHabit;
  }

  /**
   * @description Возвращает все привычки для указанного пользователя с фильтрацией.
   * @param userId ID текущего пользователя.
   * @param query Параметры запроса для фильтрации.
   * @returns Список привычек.
   */
  async findAll(userId: string, query: TGetHabitQuery = {}) {
    const {
      status = 'active',
      startDateGte,
      finishDateLte,
      search,
      size = 20,
      page = 1,
    } = query;

    const calculatedLimit = size;

    const calculatedOffset = (page - 1) * size;

    // Формирование массива условий (WHERE clauses)
    const filters: (SQL<unknown> | undefined)[] = [
      eq(habit.userId, userId), // Всегда фильтруем по текущему пользователю
    ];

    // Фильтрация по статусу
    if (status === 'active') {
      filters.push(isNull(habit.finish)); // Активные = finish IS NULL
    } else if (status === 'finished') {
      filters.push(isNotNull(habit.finish)); // Завершенные = finish IS NOT NULL
    }

    // Фильтрация по датам
    if (startDateGte) {
      filters.push(gte(habit.start, new Date(startDateGte)));
    }
    if (finishDateLte) {
      filters.push(lte(habit.finish, new Date(finishDateLte)));
    }

    // Поиск по имени/codeName: ищем совпадение либо в имени, либо в codeName
    if (search) {
      const searchPattern = `%${search.toLowerCase()}%`;

      filters.push(
        and(
          like(habit.name, searchPattern),
          like(habit.codeName, searchPattern),
        ),
      );
    }

    // Выполнение запроса с учетом всех фильтров
    return this.db.query.habit.findMany({
      where: and(...filters),
      limit: calculatedLimit,
      offset: calculatedOffset,
      orderBy: [habit.createdAt],
    });
  }

  /**
   * @description Находит одну привычку по ID, принадлежащую указанному пользователю.
   * @param id ID привычки.
   * @param userId ID текущего пользователя.
   * @returns Привычка или выбрасывает NotFoundException.
   */
  async findOne(id: string, userId: string) {
    const foundHabit = await this.db.query.habit.findFirst({
      where: and(eq(habit.id, id), eq(habit.userId, userId)),
    });

    if (!foundHabit) {
      throw new NotFoundException(
        `Habit with ID ${id} not found or doesn't belong to the user.`,
      );
    }

    return foundHabit;
  }

  /**
   * @description Обновляет привычку по ID, принадлежащую указанному пользователю.
   * @param id ID привычки.
   * @param userId ID текущего пользователя.
   * @param updateHabitDto Данные для обновления.
   * @returns Обновленная привычка.
   */
  async update(id: string, userId: string, updateHabitDto: UpdateHabitDto) {
    // Сначала убедимся, что привычка существует и принадлежит пользователю
    await this.findOne(id, userId);

    const [updatedHabit] = await this.db
      .update(habit)
      .set({
        ...updateHabitDto,
        updatedAt: new Date(),
      })
      .where(eq(habit.id, id))
      .returning();

    if (!updatedHabit) {
      throw new NotFoundException(
        `Habit with ID ${id} not found during update.`,
      );
    }

    return updatedHabit;
  }

  /**
   * @description Удаляет привычку по ID, принадлежащую указанному пользователю.
   * @param id ID привычки.
   * @param userId ID текущего пользователя.
   * @returns Объект с информацией об удалении.
   */
  async remove(id: string, userId: string) {
    // Сначала убедимся, что привычка существует и принадлежит пользователю
    await this.findOne(id, userId);

    const [deletedHabit] = await this.db
      .delete(habit)
      .where(eq(habit.id, id))
      .returning({ id: habit.id, name: habit.name });

    if (!deletedHabit) {
      throw new NotFoundException(
        `Habit with ID ${id} not found during removal.`,
      );
    }

    return {
      message: `Habit "${deletedHabit.name}" with ID ${deletedHabit.id} successfully removed.`,
    };
  }

  /**
   * @description Отдаёт статистику по привычке.
   * @param userId ID текущего пользователя.
   * @param id ID привычки.
   * @returns Объект с информацией об статистике.
   */
  async getHabitStats(userId: string, id?: string) {
    const whereSelection: (SQL<unknown> | undefined)[] = [eq(user.id, userId)];

    if (!!id) {
      whereSelection.push(eq(habit.id, id));
    }

    const rankedDates = await this.db.$with('RankedDates').as(
      this.db
        .select({
          habitId: habitCheckmark.habitId,
          checkDate: habitCheckmark.date,
          rowNumber:
            sql<number>`ROW_NUMBER() OVER (PARTITION BY ${habitCheckmark.habitId} ORDER BY ${habitCheckmark.date})`.as(
              'rowNumber',
            ),
        })
        .from(habitCheckmark)
        .innerJoin(habit, eq(habitCheckmark.habitId, habit.id))
        .innerJoin(user, eq(habit.userId, user.id))
        .where(and(...whereSelection)),
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
