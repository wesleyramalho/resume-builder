"use client";

import { Suspense, use, useState } from "react";
import { notFound } from "next/navigation";
import { ChevronUp, ChevronDown, Pencil, Eye } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { Accordion } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditorNav from "@/components/editor/EditorNav";
import EditorToolbar from "@/components/editor/EditorToolbar";
import PersonalInfoSection from "@/components/editor/sections/PersonalInfoSection";
import ExperienceSection from "@/components/editor/sections/ExperienceSection";
import EducationSection from "@/components/editor/sections/EducationSection";
import SkillsSection from "@/components/editor/sections/SkillsSection";
import ProjectsSection from "@/components/editor/sections/ProjectsSection";
import ResumePreview from "@/components/editor/preview/ResumePreview";
import Footer from "@/components/Footer";
import type { ResumeData } from "@/types/resume";

const SECTION_COMPONENTS: Record<
  string,
  React.FC<{ resumeId: string; data: ResumeData }>
> = {
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
};

const DEFAULT_ORDER = ["experience", "education", "skills", "projects"];

interface Props {
  params: Promise<{ id: string }>;
}

const SECTION_DESCRIPTIONS: Record<string, string> = {
  personal: "Detail your professional trajectory.",
  experience: "Highlight your most relevant career milestones.",
  education: "Academic foundation and credentials.",
  skills: "Technical proficiencies and expertise areas.",
  projects: "Showcase your notable projects and work.",
  summary: "A brief professional summary statement.",
};

export default function EditorPage({ params }: Props) {
  const { id } = use(params);
  const resume = useResumeStore((s) => s.resumes.find((r) => r.id === id));
  const [activeSection, setActiveSection] = useState<string | null>("personal");

  if (!resume) {
    notFound();
  }

  const data = resume.data;

  const sectionOrder = data.sectionOrder?.length
    ? data.sectionOrder
    : DEFAULT_ORDER;

  const formContent = (
    <Accordion
      value={activeSection ? [activeSection] : []}
      onValueChange={(v: string[]) =>
        setActiveSection(v.length ? v[v.length - 1] : null)
      }
      className="divide-y divide-border"
    >
      <PersonalInfoSection resumeId={id} data={data} />
      {sectionOrder.map((key) => {
        const Section = SECTION_COMPONENTS[key];
        return Section ? <Section key={key} resumeId={id} data={data} /> : null;
      })}
    </Accordion>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Suspense>
        <EditorToolbar resume={resume} />
      </Suspense>

      {/* Desktop: three-column layout */}
      <div
        className="hidden lg:grid flex-1"
        style={{ gridTemplateColumns: "240px 1fr 1fr" }}
      >
        {/* Left: nav sidebar */}
        <aside className="border-r border-border px-3 flex flex-col bg-surface-soft/60 sticky top-0 h-screen overflow-auto">
          <div className="mb-2 mt-3">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-text-subtle px-3">
              Professional Draft #1
            </p>
          </div>
          <EditorNav
            resumeId={id}
            sectionOrder={data.sectionOrder ?? []}
            activeSection={activeSection ?? ""}
            onSelect={setActiveSection}
          />
        </aside>

        {/* Center: form */}
        <div className="border-r border-border flex flex-col overflow-hidden bg-card">
          <div className="px-6 py-4 border-b border-border flex items-start justify-between gap-4 sticky top-0 z-10 bg-card">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-text-subtle">
                {activeSection
                  ? `Section 01 — ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}`
                  : "All Sections"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeSection
                  ? SECTION_DESCRIPTIONS[activeSection]
                  : "Click a section below to expand it."}
              </p>
            </div>
            <button
              onClick={() =>
                setActiveSection(activeSection ? null : "personal")
              }
              title={activeSection ? "Collapse all" : "Expand"}
              className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              {activeSection ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
          <ScrollArea className="flex-1">
            <div className="px-6 py-4">{formContent}</div>
          </ScrollArea>
        </div>

        {/* Right: live preview */}
        <div className="flex flex-col overflow-hidden sticky top-0 h-screen">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2 bg-card">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="font-sans text-[10px] uppercase tracking-widest text-text-subtle">
              Live Preview Rendering
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <ResumePreview data={data} templateId={resume.templateId} />
          </div>
        </div>
      </div>

      {/* Mobile: tabs */}
      <div className="lg:hidden flex-1">
        <Tabs defaultValue="edit" className="h-full flex flex-col">
          <TabsList className="rounded-none border-b border-border bg-background w-full h-12 p-0 gap-0 sticky top-0 z-20">
            <TabsTrigger
              value="edit"
              className="flex-1 flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest rounded-none h-full border-b-2 border-transparent data-[state=active]:text-foreground data-[state=active]:border-foreground data-[state=active]:bg-surface-soft/50 text-muted-foreground transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex-1 flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest rounded-none h-full border-b-2 border-transparent data-[state=active]:text-foreground data-[state=active]:border-foreground data-[state=active]:bg-surface-soft/50 text-muted-foreground transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="flex-1 overflow-auto mt-0">
            <div className="px-3 py-3 sm:px-4 sm:py-4">{formContent}</div>
          </TabsContent>
          <TabsContent
            value="preview"
            className="flex-1 overflow-hidden mt-0 h-full"
          >
            <ResumePreview data={data} templateId={resume.templateId} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
