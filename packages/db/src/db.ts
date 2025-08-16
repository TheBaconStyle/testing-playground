import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";
import {getTableColumns} from 'drizzle-orm'

export function createConnectionString(
  user: string,
  password: string,
  host: string,
  port: string,
  dbName: string
) {
  return `postgres://${user}:${password}@${host}:${port}/${dbName}`;
}

const connectionString = createConnectionString(
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  process.env.DB_HOST!,
  process.env.DB_PORT!,
  process.env.DB_NAME!
);

const connectionPool = new Pool({ connectionString });

export const db = drizzle(connectionPool, { schema });

export type DB = NodePgDatabase<typeof schema>;

export { schema }
