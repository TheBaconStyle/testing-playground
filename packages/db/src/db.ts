import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export function createConnectionString(
  user: string,
  password: string,
  host: string,
  port: string,
  dbName: string
) {
  return `postgres://${user}:${password}@${host}:${port}/${dbName}`;
}

const connectionPool = new Pool({ connectionString });

export const db = drizzle(connectionPool, { schema });

export type DBType = NodePgDatabase<typeof schema>;

export function createDrizzleDB(
  ...args: Parameters<typeof createConnectionString>
) {
  const connectionString = createConnectionString(...args);
  const connectionPool = new Pool({ connectionString });
  return drizzle(connectionPool, { schema });
}
