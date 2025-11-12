import { schema } from 'db';
import { type NodePgDatabase } from 'drizzle-orm/node-postgres';

export const DB_TAG = 'DB_TAG';

export type DB = NodePgDatabase<typeof schema>;
