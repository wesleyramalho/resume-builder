"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import ResumeThumbnail from "@/components/dashboard/ResumeThumbnail";
import { TEMPLATES, getTemplate } from "@/lib/resumeTemplates";
import { createEmptyResumeData } from "@/lib/resumeDefaults";
import { useResumeStore } from "@/store/useResumeStore";
import type { ResumeData } from "@/types/resume";

function getSampleData(templateId: string): ResumeData {
  const tmpl = TEMPLATES.find((t) => t.id === templateId);
  return {
    ...createEmptyResumeData(),
    ...tmpl?.sampleData,
    photo: tmpl?.previewPhoto,
  } as ResumeData;
}

export default function LandingTemplates() {
  const router = useRouter();
  const createResume = useResumeStore((s) => s.createResume);
  const t = useTranslations("landing");
  const tt = useTranslations("templates");

  function handleUseTemplate(templateId: string) {
    const tmpl = getTemplate(templateId);
    const resume = createResume(
      tmpl?.name ?? "Untitled Resume",
      tmpl?.sampleData,
      templateId,
    );
    router.push(`/editor/${resume.id}`);
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    ScrollTrigger.batch(".template-card", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
          },
        ),
      once: true,
      start: "top 85%",
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <SectionHeading className="mb-3">{t("templatesLabel")}</SectionHeading>
          <h2
            className="font-sans font-bold text-foreground"
            style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)" }}
          >
            {t("templatesHeading")}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            {t("templatesDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="template-card opacity-0 group cursor-pointer"
              onClick={() => handleUseTemplate(tmpl.id)}
            >
              <div className="relative bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-surface-soft/50 max-h-[320px] overflow-hidden">
                  <ResumeThumbnail
                    data={getSampleData(tmpl.id)}
                    templateId={tmpl.id}
                  />
                </div>

                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-background text-foreground font-sans text-xs uppercase tracking-widest px-4 py-2 rounded-md">
                    {t("useTemplate")}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="font-sans font-semibold text-foreground">
                  {tt(tmpl.id)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tt(`${tmpl.id}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
