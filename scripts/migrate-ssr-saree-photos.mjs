/**
 * Copy SSR Tex saree model photos into Sri Kumaran Silks Supabase Storage.
 * Source: legacy SSR project public bucket (same filenames as before).
 *
 * Usage: node scripts/migrate-ssr-saree-photos.mjs
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const OLD_SSR_BASE =
  "https://qhtwwyqlsnckorndmhmt.supabase.co/storage/v1/object/public/media/sakthi/";

const SAREE_FILES = [
  "saree-R-tapgdDCDppiSQlGdkRl.webp",
  "saree-pdIkXPnfznIDPsDJ4k4PE.webp",
  "saree-U0Rtn9BZSywuxw19vrXla.webp",
  "saree-N2Osq4mnOsiSNYN62fSbu.webp",
  "upload-yMQI_X4Up0VTMyFXk9ZU7.webp",
  "upload-RzPrdVNd6zAdsxUqjC0WD.webp",
  "upload-TYcLFtrenilsOJUUynu8U.webp",
  "upload-jYVtTkgJ_e2FyiDDUc9Jg.webp",
];

function loadEnv() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) throw new Error("Missing .env.local");
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

async function main() {
  const env = loadEnv();
  const ref = env.NEXT_PUBLIC_SUPABASE_PROJECT_REF;
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = env.DATABASE_SERVICE_ROLE || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!ref || !url || !key) {
    throw new Error("Missing Supabase env in .env.local");
  }

  const sb = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log(`Target: ${url}/storage/.../media/sakthi/\n`);

  for (const file of SAREE_FILES) {
    const sourceUrl = OLD_SSR_BASE + file;
    const res = await fetch(sourceUrl);
    if (!res.ok) {
      throw new Error(`Download failed ${file}: ${res.status}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const storagePath = `sakthi/${file}`;

    const { error } = await sb.storage.from("media").upload(storagePath, buffer, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: true,
    });

    if (error) throw new Error(`Upload failed ${file}: ${error.message}`);
    console.log(`OK ${storagePath} (${buffer.length} bytes)`);
  }

  console.log("\nAll SSR saree photos copied to Sri Kumaran Silks storage.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
