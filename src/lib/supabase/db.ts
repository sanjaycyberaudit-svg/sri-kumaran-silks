import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { resolveDatabaseUrl } from "./resolve-database-url";

const connectionString = resolveDatabaseUrl(process.env.DATABASE_URL ?? "");

/** True when direct Postgres is available (admin/scripts). Storefront uses GraphQL without this. */
export function isDatabaseConfigured(): boolean {
  return Boolean(connectionString);
}

/** Lazy postgres client — storefront uses GraphQL; direct SQL is optional (admin/scripts). */
const client = connectionString
  ? postgres(connectionString, {
      prepare: false,
      max: 3,
      idle_timeout: 20,
      connect_timeout: 15,
    })
  : null;

const db = client
  ? drizzle(client, { schema })
  : (new Proxy({} as PostgresJsDatabase<typeof schema>, {
      get() {
        throw new Error(
          "DATABASE_URL is not configured. Storefront uses Supabase GraphQL; set DATABASE_URL for admin/scripts.",
        );
      },
    }) as PostgresJsDatabase<typeof schema>);

export default db;
