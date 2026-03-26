"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Eye, Download, GripVertical } from "lucide-react";
import Link from "next/link";

const SECTION_ROWS = ["Work Experience", "Skills & Expertise", "Education"];
// Each pair is 2 adjacent swaps that together rotate all 3 items down by one position.
// swap[0,1] then swap[1,2]: top two swap, then bottom two swap → full rotation.
// 3 pairs = 3 rotations → naturally returns to original order.
const ROTATION_PAIRS: [[number, number], [number, number]][] = [
  [
    [0, 1],
    [1, 2],
  ],
  [
    [0, 1],
    [1, 2],
  ],
  [
    [0, 1],
    [1, 2],
  ],
];

export default function LandingFeatures() {
  const reorderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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
      },
    );

    // Left cards stagger up
    ScrollTrigger.batch(".feature-card-left", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15,
          },
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
      },
    );

    // Auto-play reorder animation on the section list (loops continuously)
    if (reorderRef.current) {
      const items =
        reorderRef.current.querySelectorAll<HTMLElement>(".reorder-item");
      if (items.length === 3) {
        const ROW_HEIGHT = items[0].offsetHeight + 8; // item height + gap

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0,
          scrollTrigger: {
            trigger: reorderRef.current,
            start: "top 85%",
            once: true,
          },
          delay: 1.5,
        });

        // Track current visual position of each DOM item
        const pos = [0, 1, 2]; // pos[domIdx] = visualPos

        for (const [swap1, swap2] of ROTATION_PAIRS) {
          // First adjacent swap (fast)
          const [visA1, visB1] = swap1;
          const domA1 = pos.indexOf(visA1);
          const domB1 = pos.indexOf(visB1);
          pos[domA1] = visB1;
          pos[domB1] = visA1;
          tl.to(items[domA1], {
            y: (pos[domA1] - domA1) * ROW_HEIGHT,
            duration: 0.4,
            ease: "power2.inOut",
          });
          tl.to(
            items[domB1],
            {
              y: (pos[domB1] - domB1) * ROW_HEIGHT,
              duration: 0.4,
              ease: "power2.inOut",
            },
            "<",
          );

          // Second adjacent swap immediately after — completes the full rotation
          const [visA2, visB2] = swap2;
          const domA2 = pos.indexOf(visA2);
          const domB2 = pos.indexOf(visB2);
          pos[domA2] = visB2;
          pos[domB2] = visA2;
          tl.to(items[domA2], {
            y: (pos[domA2] - domA2) * ROW_HEIGHT,
            duration: 0.4,
            ease: "power2.inOut",
          });
          tl.to(
            items[domB2],
            {
              y: (pos[domB2] - domB2) * ROW_HEIGHT,
              duration: 0.4,
              ease: "power2.inOut",
            },
            "<",
          );

          // Pause to show the stable rotation state
          tl.to({}, { duration: 2 });
        }
      }
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="features-heading mb-12">
          <SectionHeading className="mb-3">Everything You Need</SectionHeading>
          <h2
            className="font-sans font-bold text-foreground"
            style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)" }}
          >
            No Catch. No Paywall. Just Tools.
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
                  See every change instantly as you type. Our dual-pane editor
                  shows your final PDF in real time — no surprises at export.
                </p>
              </div>
              {/* Mini preview mockup */}
              <div className="mt-auto flex gap-2 opacity-60">
                <div className="flex-1 bg-surface-soft rounded border border-border p-2 space-y-1.5">
                  {[70, 50, 85, 45].map((w, i) => (
                    <div
                      key={i}
                      className="h-1 bg-surface-strong rounded"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
                <div className="flex-1 bg-surface-soft rounded border border-border p-2 space-y-1.5">
                  {[80, 55, 70, 40].map((w, i) => (
                    <div
                      key={i}
                      className="h-1 bg-surface-strong rounded"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Easy Export */}
            <GlassCard className="feature-card-left opacity-0 p-6 flex flex-col gap-4 min-h-65">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-surface-soft border border-border">
                <Download
                  className="w-5 h-5 text-foreground"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-foreground text-lg mb-2">
                  Easy Export
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  One-click PDF export — no account, no payment, no limits.
                  ATS-friendly formatting with clean metadata, every time.
                </p>
              </div>
              {/* PDF download mockup */}
              <div className="mt-auto">
                <Link
                  href="/dashboard"
                  className="inline-flex cursor-pointer items-center gap-2 bg-foreground text-background text-[10px] font-sans uppercase tracking-widest rounded px-3 py-2"
                >
                  <Download className="w-3 h-3" strokeWidth={2} />
                  Download PDF
                </Link>
              </div>
            </GlassCard>
          </div>

          {/* Right column — tall dark card */}
          <div className="feature-card-right opacity-0 rounded-xl bg-foreground text-background p-6 flex flex-col gap-4 min-h-135">
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10">
              <GripVertical
                className="w-5 h-5 text-background/70"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-background text-lg mb-2">
                Reorder Sections
              </h3>
              <p className="text-sm text-background/60 leading-relaxed">
                Drag and drop to reorder your resume sections. Tailor the layout
                for each role you&apos;re applying to, no copy-pasting required.
              </p>
            </div>

            {/* Section list mockup */}
            <div ref={reorderRef} className="mt-auto space-y-2">
              {SECTION_ROWS.map((label, i) => (
                <div
                  key={label}
                  className={`reorder-item flex items-center justify-between rounded-lg px-4 py-3 border ${
                    i === 0
                      ? "border-white/20 bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <span className="text-xs font-sans uppercase tracking-widest text-background/70">
                    {label}
                  </span>
                  <span className="text-background/30 text-sm font-sans">
                    —
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
