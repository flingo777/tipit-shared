/* ==========================================================================
   Handle rules — shared by onboarding (claim) and the router (/@handle).
   A handle must never collide with a top-level route or a word we may want
   to reserve for the platform.
   ========================================================================== */

export const HANDLE_RE = /^[a-z0-9_]{3,30}$/;

/**
 * Words that can't be claimed as handles: current + planned routes, and
 * platform-sensitive names. Lowercase.
 */
export const RESERVED_HANDLES = new Set([
  // routes that exist or are planned
  "login", "signup", "logout", "auth", "onboarding", "dashboard", "settings",
  "api", "admin", "app", "account", "me", "new", "home",
  // static / infra
  "static", "assets", "public", "www", "mail", "cdn", "status", "health",
  // product surface
  "creator", "creators", "fan", "fans", "explore", "discover", "search",
  "tip", "tips", "pay", "payment", "payments", "payout", "payouts", "checkout",
  "support", "help", "contact", "about", "pricing", "blog", "docs",
  // legal
  "terms", "privacy", "legal", "refund", "refunds", "cancellation", "grievance",
  // brand / reserved
  "tipit", "tipitclub", "official", "team", "root", "null", "undefined",
]);

/** Lowercase and strip anything a handle can't contain (incl. a leading @). */
export function normalizeHandle(raw = "") {
  return raw.toLowerCase().replace(/^@+/, "").replace(/[^a-z0-9_]/g, "");
}

/**
 * Validate a raw handle string.
 * @returns {{ ok: true, handle: string } | { ok: false, reason: string }}
 */
export function validateHandle(raw = "") {
  const handle = normalizeHandle(raw);
  if (handle.length < 3) return { ok: false, reason: "Handle must be at least 3 characters." };
  if (handle.length > 30) return { ok: false, reason: "Handle must be 30 characters or fewer." };
  if (!HANDLE_RE.test(handle)) {
    return { ok: false, reason: "Use only lowercase letters, numbers, and underscores." };
  }
  if (RESERVED_HANDLES.has(handle)) return { ok: false, reason: "That handle is reserved." };
  return { ok: true, handle };
}

/** Cheap check for the router: is this a shape we'd even look up? */
export function isPlausibleHandle(raw = "") {
  const handle = normalizeHandle(raw);
  return HANDLE_RE.test(handle) && !RESERVED_HANDLES.has(handle);
}
