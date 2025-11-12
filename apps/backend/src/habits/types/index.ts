import { InferInsertModel } from 'drizzle-orm';
import { schema } from 'db';
import { TrueOmit } from 'shared/types/omit';
import typia from 'typia';
import { Format } from 'typia/lib/tags';
import { Extends } from 'shared/types/extends';

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
