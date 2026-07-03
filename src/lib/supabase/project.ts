/** Active Supabase project — override via NEXT_PUBLIC_SUPABASE_* in .env.local */
export const DEFAULT_SUPABASE_PROJECT_REF = "wfwumugsfylbkailvwvl";

export function getSupabaseProjectRef(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF?.trim() ||
    DEFAULT_SUPABASE_PROJECT_REF
  );
}

export function getSupabaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return `https://${getSupabaseProjectRef()}.supabase.co`;
}

/** Public storage prefix for shop media keys (`sakthi/...`). */
export function shopMediaBaseUrl(): string {
  return `${getSupabaseUrl()}/storage/v1/object/public/media/sakthi/`;
}
