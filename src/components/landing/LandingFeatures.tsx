"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Eye, Download, LayoutList } from "lucide-react";

const FEATURES = [
  {
    icon: Eye,
    title: "Preview in Real-Time",
    description:
      "Watch your professional story evolve instantly. Our live preview ensures your output is pixel perfect as you type.",
  },
  {
    icon: Download,
    title: "Easy Export",
    description:
      "High-fidelity PDFs that bypass applicant tracking systems (ATS) with ease. Clean metadata, professional formatting, always.",
  },
  {
    icon: LayoutList,
    title: "Reorder Sections",
    description:
      "Drag-and-drop to remodel your resume instantly — prioritize your experience based on the specific role you're targeting with zero friction.",
  },
];

export default function LandingFeatures() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    ScrollTrigger.batch(".feature-card", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.12 }
        ),
      once: true,
      start: "top 85%",
    });

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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeading className="features-heading mb-12">
          The Toolkit — Precision Instruments for Your Profile
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <GlassCard
              key={i}
              className="feature-card p-6 flex flex-col gap-4 opacity-0"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-surface-soft border border-border">
                <f.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans font-semibold text-foreground text-lg">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
