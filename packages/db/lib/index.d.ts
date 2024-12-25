import { Pool } from "pg";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
export declare const connectionString: string;
export declare function createConnectionString(user: string, password: string, host: string, port: string, dbName: string): string;
export * as schema from "./schema";
export declare const db: NodePgDatabase<typeof schema> & {
    $client: Pool;
};
export type DBType = NodePgDatabase<typeof schema>;
export declare function createDrizzleDB(...args: Parameters<typeof createConnectionString>): NodePgDatabase<typeof schema> & {
    $client: Pool;
};
