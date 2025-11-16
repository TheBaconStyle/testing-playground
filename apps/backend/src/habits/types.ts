import { InferInsertModel } from 'drizzle-orm';
import { schema } from 'db';
import { TrueOmit } from 'shared/types/omit';
import typia from 'typia';
import { Format } from 'typia/lib/tags';
import { Extends } from 'shared/types/extends';
import { TPageQuery } from 'src/shared/types';

type THabit = InferInsertModel<typeof schema.habit>;

export type TCreateHabit = Extends<
  TrueOmit<THabit, 'codeName' | 'createdAt' | 'updatedAt' | 'userId' | 'id'>,
  {
    name: string & typia.tags.MinLength<1> & typia.tags.MaxLength<256>;

    description?: string & typia.tags.MinLength<1> & typia.tags.MaxLength<256>;

    icon?: string & typia.tags.MinLength<1> & typia.tags.MaxLength<256>;

    start?: string & Format<'date'>;

    finish?: string & Format<'date'>;
  }
>;

export type TUpdateHabit = Partial<
  TrueOmit<THabit, 'codeName' | 'createdAt' | 'updatedAt' | 'userId' | 'id'>
>;

/**
 * @title HabitStatus
 * @description Возможные статусы привычки для фильтрации.
 */
export type THabitStatus = 'active' | 'finished' | 'all';


/**
 * @title TGetHabitQuery
 * @description Параметры запроса для получения списка привычек с фильтрацией и пагинацией.
 */
export type TGetHabitQuery = TPageQuery & { // 💡 Расширяем общим типом
  /**
   * Фильтрация по статусу привычки: активная, завершенная или все.
   * @format HabitStatus
   * @default 'active'
   */
  status?: THabitStatus;

  /**
   * Фильтрация по дате начала (дата в формате ISO 8601).
   * Получить привычки, начатые после этой даты.
   * @format date-time
   */
  startDateGte?: string;

  /**
   * Фильтрация по дате окончания (дата в формате ISO 8601).
   * Получить привычки, завершенные до этой даты.
   * @format date-time
   */
  finishDateLte?: string;
  
  /**
   * Строка для поиска по имени или кодовому имени (codeName) привычки.
   */
  search?: string;
};