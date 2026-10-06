/** ₹ with Indian digit grouping, no decimals. For whole-rupee UI input. */
export function inr(amount) {
  const n = Math.round(Number(amount) || 0);
  return "₹" + n.toLocaleString("en-IN");
}

/**
 * Format a stored amount. Every money column is integer PAISE, so this is the
 * one to use for anything read from the database. Paise are shown only when
 * there are some: 9900 → "₹99", 9405 → "₹94.05".
 */
export function inrPaise(paise) {
  const p = Math.round(Number(paise) || 0);
  return "₹" + (p / 100).toLocaleString("en-IN", {
    minimumFractionDigits: p % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

/** "2 Sept" / "2 Sept 2024" when the year differs from now. */
export function shortDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: sameYear ? undefined : "numeric",
  });
}

/** "AR" from "Arjun R." — for avatar-less initial badges. */
export function initials(name, fallback = "T") {
  const src = (name || fallback).trim();
  return (
    src
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || fallback
  );
}

/** "just now" / "3h ago" / "5d ago" / falls back to shortDate past a week. */
export function relativeTime(value) {
  if (!value) return "";
  const diff = Date.now() - new Date(value).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return shortDate(value);
}
