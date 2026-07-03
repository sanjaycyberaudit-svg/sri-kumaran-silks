import postgres from "postgres";

const ref = "wfwumugsfylbkailvwvl";
const pass = process.argv[2] ?? process.env.SUPABASE_DB_PASSWORD ?? "";

if (!pass) {
  console.error("Usage: node scripts/probe-db-regions.mjs <database-password>");
  process.exit(1);
}

const regions = [
  "ap-south-1",
  "us-east-1",
  "eu-west-1",
  "ap-southeast-1",
  "ap-northeast-1",
  "eu-central-1",
];

for (const region of regions) {
  for (const prefix of ["aws-0", "aws-1"]) {
    for (const port of [5432, 6543]) {
      const url = `postgresql://postgres.${ref}:${encodeURIComponent(pass)}@${prefix}-${region}.pooler.supabase.com:${port}/postgres`;
      const sql = postgres(url, { max: 1, connect_timeout: 5, prepare: false });
      try {
        await sql`select 1 as ok`;
        console.log("CONNECTED", { prefix, region, port });
        await sql.end();
        process.exit(0);
      } catch {
        await sql.end({ timeout: 1 }).catch(() => {});
      }
    }
  }
}

console.log("No working pooler connection for this password.");
