import { createConnectionString } from 'db/source/db';
import * as schema from 'db/source/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const connectionString = createConnectionString(
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  process.env.DB_HOST!,
  process.env.DB_PORT!,
  process.env.DB_NAME!,
);

const connectionPool = new Pool({ connectionString });

export const db = drizzle(connectionPool, { schema });
