/** Shared Supabase project helpers for Node scripts (loads .env.local via tsx --env-file). */

export const DEFAULT_SUPABASE_PROJECT_REF = "wfwumugsfylbkailvwvl";

export function getSupabaseProjectRef() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF?.trim() ||
    DEFAULT_SUPABASE_PROJECT_REF
  );
}

export function getSupabaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return `https://${getSupabaseProjectRef()}.supabase.co`;
}

export function shopMediaBaseUrl() {
  return `${getSupabaseUrl()}/storage/v1/object/public/media/sakthi/`;
}
