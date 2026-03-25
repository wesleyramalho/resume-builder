"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Eye, Download, GripVertical } from "lucide-react";

const SECTION_ROWS = ["Work Experience", "Skills & Expertise", "Education"];

export default function LandingFeatures() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      ".features-heading",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-heading",
          start: "top 90%",
          once: true,
        },
      }
    );

    // Left cards stagger up
    ScrollTrigger.batch(".feature-card-left", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.15 }
        ),
      once: true,
      start: "top 85%",
    });

    // Right card slides in from right
    gsap.fromTo(
      ".feature-card-right",
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".feature-card-right",
          start: "top 85%",
          once: true,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="features-heading mb-12">
          <SectionHeading className="mb-3">The Toolkit</SectionHeading>
          <h2
            className="font-sans font-bold text-foreground"
            style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)" }}
          >
            Precision Instruments for Your Profile
          </h2>
        </div>

        {/* Bento grid: 2 cols, left has 2 stacked cards, right spans both rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Preview in Real-Time */}
            <GlassCard className="feature-card-left opacity-0 p-6 flex flex-col gap-4 min-h-65">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-surface-soft border border-border">
                <Eye className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-foreground text-lg mb-2">
                  Preview in Real-Time
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Watch your professional story evolve instantly. Our dual-pane system
                  ensures your output is pixel-perfect as you type.
                </p>
              </div>
              {/* Mini preview mockup */}
              <div className="mt-auto flex gap-2 opacity-60">
                <div className="flex-1 bg-surface-soft rounded border border-border p-2 space-y-1.5">
                  {[70, 50, 85, 45].map((w, i) => (
                    <div key={i} className="h-1 bg-surface-strong rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="flex-1 bg-surface-soft rounded border border-border p-2 space-y-1.5">
                  {[80, 55, 70, 40].map((w, i) => (
                    <div key={i} className="h-1 bg-surface-strong rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Easy Export */}
            <GlassCard className="feature-card-left opacity-0 p-6 flex flex-col gap-4 min-h-65">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-surface-soft border border-border">
                <Download className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-foreground text-lg mb-2">
                  Easy Export
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  High-fidelity PDF exports that bypass applicant tracking systems (ATS)
                  with ease. Clean metadata, professional formatting, always.
                </p>
              </div>
              {/* PDF download mockup */}
              <div className="mt-auto">
                <div className="inline-flex items-center gap-2 bg-foreground text-background text-[10px] font-mono uppercase tracking-widest rounded px-3 py-2">
                  <Download className="w-3 h-3" strokeWidth={2} />
                  Download PDF
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right column — tall dark card */}
          <div
            className="feature-card-right opacity-0 rounded-xl bg-foreground text-background p-6 flex flex-col gap-4 min-h-135"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10">
              <GripVertical className="w-5 h-5 text-background/70" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-background text-lg mb-2">
                Reorder Sections
              </h3>
              <p className="text-sm text-background/60 leading-relaxed">
                Drag, drop, and re-architect your resume hierarchy. Prioritize your
                strengths based on the specific role you&apos;re targeting with zero friction.
              </p>
            </div>

            {/* Section list mockup */}
            <div className="mt-auto space-y-2">
              {SECTION_ROWS.map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 border ${
                    i === 0
                      ? "border-white/20 bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-background/70">
                    {label}
                  </span>
                  <span className="text-background/30 text-sm font-mono">—</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
