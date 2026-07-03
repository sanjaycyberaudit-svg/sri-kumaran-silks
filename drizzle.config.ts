import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import { resolveDatabaseUrl } from "./src/lib/supabase/resolve-database-url";

dotenv.config({ path: ".env.local" });
dotenv.config();

const connectionString = resolveDatabaseUrl(process.env.DATABASE_URL);

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

export default {
  schema: "./src/lib/supabase/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
