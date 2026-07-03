/**
 * Add Sri Kumaran Silks saree categories to Supabase (safe upsert — does not delete products).
 *
 * Usage:
 *   npm run db:seed-collections
 *   npm run db:seed-collections -- --remove-demo
 */
import seedKumaranCollections from "../src/lib/supabase/seedData/kumaranCollections";

const removeDemo = process.argv.includes("--remove-demo");

seedKumaranCollections({ removeDemo })
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
