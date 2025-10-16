import { createConnectionString, schema } from 'db';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from 'shared/env/backend/env';

export const DB_TAG = 'DB_TAG';

export const db = drizzle(
  new Pool({
    connectionString: createConnectionString(
      env.DB_USER,
      env.DB_PASSWORD,
      env.DB_HOST,
      env.DB_PORT.toString(),
      env.DB_NAME,
    ),
  }),
  { schema },
);

export type DB = NodePgDatabase<typeof schema>;
