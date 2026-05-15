import posthog from "posthog-js";
import { isAnalyticsEnabled } from "@/lib/consent";

// PostHog is initialised by ConsentProvider, not here. Brazilian users must
// accept the LGPD banner before init runs; non-BR users have it initialised
// on mount in the provider. This file keeps the Next.js client instrumentation
// hook alive — page-view capture is gated on the cached analytics flag.

export function onRouterTransitionStart(url: string) {
  if (!isAnalyticsEnabled()) return;
  posthog.capture("$pageview", { $current_url: url });
}
