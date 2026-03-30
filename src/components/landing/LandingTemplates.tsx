"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import ResumePreview from "@/components/editor/preview/ResumePreview";
import { TEMPLATES, getTemplate } from "@/lib/resumeTemplates";
import { getLocalizedSampleData } from "@/lib/localizedSampleData";
import { createEmptyResumeData } from "@/lib/resumeDefaults";
import { useResumeStore } from "@/store/useResumeStore";
import type { ResumeData } from "@/types/resume";

function getSampleData(templateId: string, locale: string): ResumeData {
  const tmpl = TEMPLATES.find((t) => t.id === templateId);
  const localizedData = getLocalizedSampleData(templateId, locale);
  return {
    ...createEmptyResumeData(),
    ...(localizedData ?? tmpl?.sampleData),
    photo: tmpl?.previewPhoto,
  } as ResumeData;
}

export default function LandingTemplates() {
  const router = useRouter();
  const createResume = useResumeStore((s) => s.createResume);
  const locale = useLocale();
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="template-card opacity-0 group cursor-pointer rounded-lg border border-border p-3 hover:border-ring transition-colors"
              onClick={() => handleUseTemplate(tmpl.id)}
            >
              <div className="relative mb-2 overflow-hidden rounded aspect-3/4">
                <div className="absolute inset-0 pointer-events-none">
                  <ResumePreview
                    data={getSampleData(tmpl.id, locale)}
                    templateId={tmpl.id}
                  />
                </div>
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                  <span className="bg-background text-foreground font-sans text-xs uppercase tracking-widest px-4 py-2 rounded-md">
                    {t("useTemplate")}
                  </span>
                </div>
              </div>

              <p className="text-xs font-semibold text-foreground">
                {tt(tmpl.id)}
              </p>
              <p className="text-[9px] text-muted-foreground leading-relaxed mt-0.5">
                {tt(`${tmpl.id}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
