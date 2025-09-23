import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export function createConnectionString(
  user: string,
  password: string,
  host: string,
  port: string,
  dbName: string
) {
  return `postgres://${user}:${password}@${host}:${port}/${dbName}`;
}

export type DB = NodePgDatabase<typeof schema>;

export { schema };

