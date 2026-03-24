"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const HEADLINE = "Curate Your Career Narrative.";
const LINKEDIN_OAUTH_ENABLED = process.env.NEXT_PUBLIC_LINKEDIN_OAUTH_ENABLED === "true";

export default function LandingHero() {
  const hasAnimated = useRef(false);
  const router = useRouter();
  const [linkedInError, setLinkedInError] = useState<string | null>(null);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.from(".hero-char", {
      opacity: 0,
      y: 50,
      rotateX: -90,
      duration: 0.45,
      ease: "power3.out",
      stagger: 0.025,
      delay: 0.2,
      transformOrigin: "0% 50% -40px",
    });

    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.9 }
    );

    gsap.fromTo(
      ".hero-cta",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.1 }
    );

    gsap.fromTo(
      ".hero-mockup",
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );
  }, []);

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
    <section className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, color-mix(in srgb, var(--brand-primary) 18%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-subtle mb-6">
            The Editorial Architect
          </p>

          <h1
            className="font-sans font-bold leading-[1.05] tracking-tight text-foreground mb-6 [perspective:800px]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
            aria-label={HEADLINE}
          >
            {HEADLINE.split(" ").map((word, wi, words) => (
              <React.Fragment key={wi}>
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="hero-char inline-block"
                      aria-hidden="true"
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 && (
                  <span className="hero-char inline-block" aria-hidden="true">
                    &nbsp;
                  </span>
                )}
              </React.Fragment>
            ))}
          </h1>

          <p className="hero-subtitle text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
            Move beyond form fields. Treat your resume like an editorial with
            real-time collaboration and tools designed for professional authority.
          </p>

          <div className="hero-cta flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={handleStart}
              className="bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase tracking-widest"
            >
              Start Drafting →
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => void handleLinkedInImport()}
              className="font-mono text-xs uppercase tracking-widest"
            >
              Import from LinkedIn
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => {
                document.getElementById("sample")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-border hover:bg-muted font-mono text-xs uppercase tracking-widest"
            >
              View Gallery
            </Button>
          </div>
          {linkedInError ? (
            <p className="mt-3 text-[11px] text-destructive font-mono uppercase tracking-wider">
              {linkedInError}
            </p>
          ) : null}
        </div>

        {/* Right: mockup */}
        <div className="hero-mockup hidden lg:block">
          <div className="bg-card border border-border rounded-lg p-4 aspect-[4/3] flex items-center justify-center shadow-sm">
            <div className="w-full space-y-3">
              {/* Fake resume preview lines */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-surface-strong" />
                <div className="h-2 bg-surface-strong rounded w-32" />
              </div>
              <div className="h-px bg-border" />
              {[80, 60, 90, 55, 70].map((w, i) => (
                <div key={i} className="h-1.5 bg-surface-strong rounded" style={{ width: `${w}%` }} />
              ))}
              <div className="h-3" />
              {[45, 75, 50].map((w, i) => (
                <div key={i} className="h-1.5 bg-surface-soft rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-mono text-text-subtle uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
              Live Preview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
