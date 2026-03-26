"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import GlowBorderCanvas from "@/components/ui/GlowBorderCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LandingCTA() {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.96, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <div ref={cardRef} className="relative inline-block w-full" style={{ opacity: 0 }}>
          {/* Glow border */}
          <GlowBorderCanvas
            borderRadius={12}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          <div className="relative bg-card border border-border rounded-xl p-6 sm:p-12 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-subtle mb-4">
              Start Your Story
            </p>
            <h2
              className="font-sans font-bold text-foreground mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
            >
              Build Your Resume.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
              Join professionals who treat their resume as a career document, not a
              form submission.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase tracking-widest px-10"
              >
                Build Your Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
