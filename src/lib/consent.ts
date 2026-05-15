/**
 * Consent state for analytics. Brazilian users (per LGPD) must explicitly
 * opt in before any data collection begins. For non-BR users the app
 * preserves its prior behaviour (immediate PostHog init, DNT-respected).
 *
 * Two localStorage keys are used:
 *   - architect-suite-consent          → the user's stored decision
 *   - architect-suite-analytics-enabled → cached boolean read by track()
 *
 * The provider keeps both keys in sync. track() is called from non-React
 * code (Zustand stores, hooks) and needs a synchronous read — hence the
 * second flag.
 */

export const CONSENT_STORAGE_KEY = "architect-suite-consent";
export const ANALYTICS_FLAG_KEY = "architect-suite-analytics-enabled";

/** Bump to invalidate all existing consents and re-prompt every user. */
export const CONSENT_VERSION = 1;

export type ConsentStatus = "accepted" | "rejected" | "unset";

interface ConsentRecord {
  status: "accepted" | "rejected";
  version: number;
  timestamp: number;
}

export function readConsent(): ConsentStatus {
  if (typeof window === "undefined") return "unset";
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return "unset";
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.version !== CONSENT_VERSION) return "unset";
    if (parsed.status === "accepted" || parsed.status === "rejected") {
      return parsed.status;
    }
    return "unset";
  } catch {
    return "unset";
  }
}

export function writeConsent(status: "accepted" | "rejected"): void {
  if (typeof window === "undefined") return;
  const record: ConsentRecord = {
    status,
    version: CONSENT_VERSION,
    timestamp: Date.now(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage may be unavailable (private mode, quota) — ignore.
  }
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Set by ConsentProvider whenever its state changes. */
export function setAnalyticsEnabled(value: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ANALYTICS_FLAG_KEY, value ? "true" : "false");
  } catch {
    // ignore
  }
}

/** SSR-safe synchronous read. Used by track() in non-React call sites. */
export function isAnalyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(ANALYTICS_FLAG_KEY) === "true";
  } catch {
    return false;
  }
}
