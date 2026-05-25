import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { env } from "./env";

export const db: NodePgDatabase = drizzle(env.DATABASE_URL) as NodePgDatabase;
export * from "drizzle-orm";
export default db;
