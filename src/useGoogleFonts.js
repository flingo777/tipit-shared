import { useEffect } from "react";

/** Injects the tipit font stack once. Shared by every non-landing screen. */
export function useGoogleFonts() {
  useEffect(() => {
    const id = "tipit-font-link";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);
  }, []);
}
