import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (key && navigator.doNotTrack !== "1") {
  posthog.init(key, {
    api_host: host,
    capture_pageview: true,
    capture_pageleave: true,
    person_profiles: "identified_only",
    ip: false,
    persistence: "localStorage",
  });
}

export function onRouterTransitionStart(url: string) {
  posthog.capture("$pageview", { $current_url: url });
}
