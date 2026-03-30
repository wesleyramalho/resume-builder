import posthog from "posthog-js";

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (navigator.doNotTrack === "1") return;
  posthog.capture(event, properties);
}
