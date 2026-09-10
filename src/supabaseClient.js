import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * True only when both env vars are present. The UI uses this to show a setup
 * hint instead of a wall of network errors on a fresh clone.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "[tipit] Supabase env vars missing. Copy .env.example to .env and fill in " +
      "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY, then restart the dev server."
  );
}

// Fall back to harmless placeholders so createClient doesn't throw at import
// time; every real call will still fail loudly until .env is set.
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export const PLATFORM_FEE_PCT = Number(import.meta.env.VITE_PLATFORM_FEE_PCT ?? 5);

/** Platform fee for a gross amount, rounded to whole rupees (matches the migrations). */
export function platformFee(amountInr) {
  return Math.round((amountInr * PLATFORM_FEE_PCT) / 100);
}

/** What the creator keeps from a gross amount. */
export function netAmount(amountInr) {
  return amountInr - platformFee(amountInr);
}
