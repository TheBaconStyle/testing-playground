import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from 'db/schema';
import { createConnectionString } from 'db';

const connectionString = createConnectionString(
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  process.env.DB_HOST!,
  process.env.DB_PORT!,
  process.env.DB_NAME!
);

export const DB_TAG = 'DB_TAG';

const connectionPool = new Pool({ connectionString });

export const db = drizzle(connectionPool, { schema });