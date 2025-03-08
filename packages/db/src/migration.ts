import { db } from ".";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function bootstrap() {
  await migrate(db, { migrationsFolder: "migrations" });
}

bootstrap();
