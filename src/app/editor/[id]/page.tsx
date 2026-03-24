"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
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

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditorPage({ params }: Props) {
  const { id } = use(params);
  const resume = useResumeStore((s) => s.resumes.find((r) => r.id === id));
  const [activeSection, setActiveSection] = useState("personal");

  if (!resume) {
    notFound();
  }

  const data = resume.data;

  const formContent = (
    <Accordion
      value={[activeSection]}
      onValueChange={(v: string[]) => v.length && setActiveSection(v[v.length - 1])}
      className="divide-y divide-border"
    >
      <PersonalInfoSection resumeId={id} data={data} />
      <ExperienceSection resumeId={id} data={data} />
      <EducationSection resumeId={id} data={data} />
      <SkillsSection resumeId={id} data={data} />
      <ProjectsSection resumeId={id} data={data} />
    </Accordion>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EditorToolbar resume={resume} />

      {/* Desktop: three-column layout */}
      <div className="hidden lg:grid flex-1" style={{ gridTemplateColumns: "240px 1fr 1fr" }}>
        {/* Left: nav sidebar */}
        <aside className="border-r border-border px-3 flex flex-col bg-surface-soft/60">
          <div className="mb-2 mt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-subtle px-3">
              Professional Draft #1
            </p>
          </div>
          <EditorNav activeSection={activeSection} onSelect={setActiveSection} />

          <div className="mt-auto pb-4 px-3 space-y-2">
            <button className="flex items-center gap-2 w-full text-xs font-mono text-muted-foreground hover:text-foreground transition-colors py-1">
              <span className="text-base leading-none">⚙</span>
              Settings
            </button>
            <button className="flex items-center gap-2 w-full text-xs font-mono text-muted-foreground hover:text-foreground transition-colors py-1">
              <span className="text-base leading-none">?</span>
              Help Center
            </button>
          </div>
        </aside>

        {/* Center: form */}
        <div className="border-r border-border flex flex-col overflow-hidden bg-card">
          <div className="px-6 py-4 border-b border-border">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-subtle">
              Section 01 — {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activeSection === "personal" && "Detail your professional trajectory."}
              {activeSection === "experience" && "Highlight your most relevant career milestones."}
              {activeSection === "education" && "Academic foundation and credentials."}
              {activeSection === "skills" && "Technical proficiencies and expertise areas."}
              {activeSection === "projects" && "Showcase your notable projects and work."}
            </p>
          </div>
          <ScrollArea className="flex-1">
            <div className="px-6 py-4">{formContent}</div>
          </ScrollArea>
        </div>

        {/* Right: live preview */}
        <div className="flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2 bg-card">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-subtle">
              Live Preview Rendering
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <ResumePreview data={data} />
          </div>
        </div>
      </div>

      {/* Mobile: tabs */}
      <div className="lg:hidden flex-1">
        <Tabs defaultValue="edit" className="h-full flex flex-col">
          <TabsList className="rounded-none border-b border-border bg-transparent px-4 gap-4 h-10 justify-start">
            <TabsTrigger
              value="edit"
              className="font-mono text-[10px] uppercase tracking-widest data-[state=active]:text-foreground data-[state=active]:border-b data-[state=active]:border-foreground rounded-none bg-transparent"
            >
              Edit
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="font-mono text-[10px] uppercase tracking-widest data-[state=active]:text-foreground data-[state=active]:border-b data-[state=active]:border-foreground rounded-none bg-transparent"
            >
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="flex-1 overflow-auto mt-0">
            <div className="flex">
              <div className="w-14 border-r border-border flex flex-col items-center py-2 gap-2 bg-surface-soft/60">
                <EditorNav activeSection={activeSection} onSelect={setActiveSection} />
              </div>
              <div className="flex-1 px-4 py-4">{formContent}</div>
            </div>
          </TabsContent>
          <TabsContent value="preview" className="flex-1 overflow-hidden mt-0 h-full">
            <ResumePreview data={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
