"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Eye, User, Briefcase, GraduationCap } from "lucide-react";

export default function LandingHero() {
  const hasAnimated = useRef(false);
  const mockupRef = useRef<HTMLDivElement>(null);
  const heroCardsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations("landing");

  const HEADLINE_WORDS = [
    { text: t("headlineYour"), teal: false },
    { text: t("headlineResume"), teal: false },
    { text: t("headlineFree"), teal: true },
    { text: t("headlineForever"), teal: false },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.9 },
    );

    gsap.fromTo(
      ".hero-cta",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.1 },
    );

    gsap.fromTo(
      ".hero-mockup",
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power2.out", delay: 0.5 },
    );

    if (mockupRef.current) {
      gsap.to(mockupRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (heroCardsRef.current) {
      const cards =
        heroCardsRef.current.querySelectorAll<HTMLElement>(".hero-card");
      if (cards.length >= 2) {
        const card1 = cards[0];
        const card2 = cards[1];
        const gap = 8;
        const h1 = card1.offsetHeight + gap;
        const h2 = card2.offsetHeight + gap;

        gsap
          .timeline({ repeat: -1, repeatDelay: 2, delay: 2 })
          .to(card1, { y: h2, duration: 0.5, ease: "power2.inOut" }, "swap")
          .to(card2, { y: -h1, duration: 0.5, ease: "power2.inOut" }, "swap")
          .to({}, { duration: 2 })
          .to(card1, { y: 0, duration: 0.5, ease: "power2.inOut" }, "back")
          .to(card2, { y: 0, duration: 0.5, ease: "power2.inOut" }, "back");
      }
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, color-mix(in srgb, var(--brand-primary) 18%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1
            className="font-sans font-bold leading-[1.05] tracking-tight mb-6 [perspective:800px] overflow-hidden"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          >
            {HEADLINE_WORDS.map((word, wi) => (
              <React.Fragment key={wi}>
                <span
                  className={`inline-block whitespace-nowrap ${word.teal ? "text-brand-primary" : "text-foreground"}`}
                >
                  {word.text.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="hero-char inline-block"
                      aria-hidden="true"
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {wi < HEADLINE_WORDS.length - 1 && (
                  <span
                    className="hero-char inline-block text-foreground"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </span>
                )}
              </React.Fragment>
            ))}
            <span className="sr-only">{t("headlineSr")}</span>
          </h1>

          <p className="hero-subtitle text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mb-8">
            {t("subtitle")}
          </p>

          <div className="hero-cta flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => router.push("/dashboard")}
              className="bg-foreground text-background hover:bg-foreground/90 font-sans text-xs uppercase tracking-widest"
            >
              {t("cta")}
            </Button>
          </div>
        </div>

        <div ref={mockupRef} className="hero-mockup hidden lg:block">
          <div className="bg-surface-soft rounded-xl border border-border p-3 shadow-lg animate-glow-border">
            <div className="flex gap-2 h-[340px]">
              <div className="w-[30%] bg-card rounded-lg border border-border p-3 flex flex-col gap-1.5">
                <div className="h-1.5 bg-surface-strong rounded w-20 mb-3" />
                {[User, Briefcase, GraduationCap].map((Icon, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-md px-2 py-2 ${i === 0 ? "bg-surface-strong" : ""}`}
                  >
                    <Icon
                      className="w-3.5 h-3.5 text-muted-foreground shrink-0"
                      strokeWidth={1.5}
                    />
                    <div className="h-1.5 bg-surface-strong rounded flex-1" />
                  </div>
                ))}
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="bg-card rounded-lg border border-border p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-px h-8 bg-foreground/20 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-1.5 bg-surface-strong rounded w-24" />
                      <div className="h-3 bg-foreground/70 rounded w-40" />
                      <div className="h-1.5 bg-surface-strong rounded w-full" />
                      <div className="h-1.5 bg-surface-strong rounded w-4/5" />
                    </div>
                  </div>
                </div>

                <div ref={heroCardsRef} className="flex flex-col gap-2">
                  <div className="hero-card bg-accent/40 rounded-lg border border-brand-primary/20 p-3 relative">
                    <div className="h-1.5 bg-muted-foreground/20 rounded w-16 mb-2" />
                    <div className="h-3 bg-foreground/50 rounded w-36 mb-1.5" />
                    <div className="h-1.5 bg-muted-foreground/20 rounded w-3/4" />
                    <div className="absolute top-3 right-3 grid grid-cols-2 gap-[3px]">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-muted-foreground/40"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="hero-card bg-card rounded-lg border border-border p-3">
                    <div className="h-1.5 bg-surface-strong rounded w-20 mb-2" />
                    <div className="h-2.5 bg-surface-strong rounded w-28" />
                  </div>
                </div>

                <div className="flex justify-end mt-auto">
                  <div className="flex items-center gap-1.5 bg-surface-soft border border-border rounded-lg px-3 py-1.5">
                    <Eye
                      className="w-3 h-3 text-foreground"
                      strokeWidth={1.5}
                    />
                    <span className="text-[9px] font-sans uppercase tracking-widest text-foreground">
                      {t("livePreview")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
