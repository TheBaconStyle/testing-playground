import * as schema from 'db/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type DBType = NodePgDatabase<typeof schema>;
