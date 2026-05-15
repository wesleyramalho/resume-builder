import posthog from "posthog-js";
import { isAnalyticsEnabled } from "@/lib/consent";

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!isAnalyticsEnabled()) return;
  posthog.capture(event, properties);
}
