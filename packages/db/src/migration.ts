import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";

async function bootstrap() {
  const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  const connectionPool = new Pool({ connectionString });

  const db = drizzle(connectionPool, { schema });

  await migrate(db, { migrationsFolder: "migrations" });
}

bootstrap();
