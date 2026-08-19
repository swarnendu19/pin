/**
 * UTM parameter capture and storage.
 * Stores attribution data to connect ad clicks → purchases.
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  /** Pinterest click identifier — required for Pinterest conversion attribution */
  epik?: string;
}

const STORAGE_KEY = "movein_attribution";
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

interface StoredAttribution extends UTMParams {
  capturedAt: number;
}

export function captureUTM(): UTMParams | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  const keys: (keyof UTMParams)[] = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "epik",
  ];

  let hasAny = false;
  for (const key of keys) {
    const val = params.get(key);
    if (val) {
      utm[key] = sanitizeParam(val);
      hasAny = true;
    }
  }

  if (!hasAny) return null;

  const stored: StoredAttribution = { ...utm, capturedAt: Date.now() };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    // Also store in localStorage for cross-session persistence (up to 30 days)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage unavailable — continue without persistence
  }

  return utm;
}

export function getAttribution(): UTMParams | null {
  if (typeof window === "undefined") return null;

  try {
    // Prefer sessionStorage (same browsing session)
    const raw = sessionStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const stored: StoredAttribution = JSON.parse(raw);

    // Check TTL
    if (Date.now() - stored.capturedAt > ATTRIBUTION_TTL_MS) {
      clearAttribution();
      return null;
    }

    const { capturedAt: _capturedAt, ...utm } = stored;
    return utm;
  } catch {
    return null;
  }
}

export function clearAttribution() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/** Sanitize URL parameter to prevent injection */
function sanitizeParam(value: string): string {
  // Allow only safe characters for UTM values
  return value.replace(/[^a-zA-Z0-9_\-. ]/g, "").substring(0, 200);
}
