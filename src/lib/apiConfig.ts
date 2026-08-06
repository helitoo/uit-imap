const FALLBACK_API_URL = "https://cdn.jsdelivr.net/gh/UIT-iMap/uit-imap-data";

export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() ||
  FALLBACK_API_URL;
