"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

export default function LandingResumeSample() {
  const sampleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (sampleRef.current) {
      gsap.fromTo(
        sampleRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sampleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    gsap.fromTo(
      ".sample-label",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sample-label",
          start: "top 90%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id="sample" className="py-24 px-6 md:px-12 bg-surface-soft/70">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeading className="sample-label mb-4 justify-center">
            Minimalist Design
          </SectionHeading>
          <h2
            className="font-sans font-bold text-foreground"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Designed to be Read.
          </h2>
        </div>

        {/* Resume sample mockup */}
        <div
          ref={sampleRef}
          className="max-w-2xl mx-auto bg-card text-card-foreground border border-border rounded-lg p-10 shadow-xl font-sans"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="border-b border-border pb-6 mb-6">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-card-foreground">
              Alexander Vaughn
            </h3>
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mt-1">
              Senior Technical Architect | New York City
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-text-subtle">
              <span>alex.vaughn@buildmyresume.io</span>
              <span>+1 (555) 847 3441</span>
              <span>New York, NY</span>
            </div>
          </div>

          {/* Profile */}
          <div className="mb-6">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-subtle mb-2">
              Profile
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dedicated to the intersection of art and infrastructure. Over 12 years of
              experience building scalable, design-forward frameworks.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-subtle mb-3">
              Professional Experience
            </h4>
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-card-foreground">
                    Metropolis Design Group
                  </p>
                  <p className="text-xs text-muted-foreground">Principal Systems Lead</p>
                </div>
                <span className="text-[10px] text-text-subtle font-mono">Jan 2019 – Present</span>
              </div>
              <ul className="mt-2 space-y-1">
                {[
                  "Associated large-scale urban development projects with budgets exceeding $40M.",
                  "Pioneered BIM detailing information modeling workflows that reduced design errors by 32%.",
                  "Maintained a team of 12 architects, fostering a culture of editorial design excellence.",
                ].map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-border mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-subtle mb-2">
              Education
            </h4>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-bold text-card-foreground">Pratt Institute</p>
                <p className="text-xs text-muted-foreground">Bachelor of Architecture & Art</p>
              </div>
              <span className="text-[10px] text-text-subtle font-mono">Sep – 2008</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-subtle mb-2">
              Technical Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Revit", "AutoCAD", "Rhino 3D", "V-Ray", "Grasshopper"].map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-border text-muted-foreground rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Quote */}
          <p className="mt-8 pt-6 border-t border-border text-xs text-text-subtle italic text-center">
            &ldquo;Build My Resume transformed my resume from a simple list into a career statement.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
