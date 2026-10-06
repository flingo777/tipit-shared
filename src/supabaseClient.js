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

/** The fee in basis points (500 = 5%), matching the server's PLATFORM_FEE_PCT. */
export const PLATFORM_FEE_BPS = Math.round(PLATFORM_FEE_PCT * 100);

/**
 * Display-only mirrors of _shared/money.ts. In PAISE, half-up to the nearest
 * paisa, so the "creator keeps" line a supporter sees before paying is the
 * number the server will actually book. The old whole-rupee versions rounded
 * the fee to ₹5 on a ₹99 tip; the server now books ₹4.95.
 */
export function platformFeePaise(amountPaise) {
  return Math.round((amountPaise * PLATFORM_FEE_BPS) / 10000);
}

export function netPaise(amountPaise) {
  return amountPaise - platformFeePaise(amountPaise);
}
