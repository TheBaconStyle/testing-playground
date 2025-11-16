import { habit } from 'db/schema';
import { createSelectSchema } from 'drizzle-zod';

const habitBaseSchema = createSelectSchema(habit);
