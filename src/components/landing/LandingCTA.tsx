"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import GlowBorderCanvas from "@/components/ui/GlowBorderCanvas";

const LINKEDIN_OAUTH_ENABLED = process.env.NEXT_PUBLIC_LINKEDIN_OAUTH_ENABLED === "true";

export default function LandingCTA() {
  const router = useRouter();
  const [linkedInError, setLinkedInError] = useState<string | null>(null);

  function handleStart() {
    router.push("/dashboard");
  }

  async function handleLinkedInImport() {
    setLinkedInError(null);

    if (!LINKEDIN_OAUTH_ENABLED) {
      setLinkedInError("LinkedIn import is not configured yet. Add LinkedIn OAuth env values.");
      return;
    }

    try {
      await signIn("linkedin", { callbackUrl: "/dashboard?intent=import" });
    } catch {
      setLinkedInError("LinkedIn sign-in is unavailable right now. Please try again shortly.");
    }
  }

  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative inline-block w-full">
          {/* Glow border */}
          <GlowBorderCanvas
            borderRadius={12}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          <div className="relative bg-card border border-border rounded-xl p-12 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-subtle mb-4">
              Minimal Effort Design
            </p>
            <h2
              className="font-sans font-bold text-foreground mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
            >
              Build Your Statement.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
              Join professionals who treat their resume as a career document, not a
              form submission.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={handleStart}
                className="bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase tracking-widest px-10"
              >
                Start Drafting
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => void handleLinkedInImport()}
                className="font-mono text-xs uppercase tracking-widest px-8"
              >
                Import from LinkedIn
              </Button>
            </div>
            {linkedInError ? (
              <p className="mt-4 text-[11px] text-destructive font-mono uppercase tracking-wider">
                {linkedInError}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
