"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { ProjectEntry, ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import AIImproveButton from "@/components/ui/AIImproveButton";

interface Props {
  resumeId: string;
  data: ResumeData;
}

function createEmptyProject(): ProjectEntry {
  return {
    id: generateId(),
    name: "",
    description: "",
    url: "",
    technologies: [],
    startDate: "",
    endDate: null,
  };
}

export default function ProjectsSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);

  function updateProject(id: string, patch: Partial<ProjectEntry>) {
    updateResume(resumeId, {
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  }

  function removeProject(id: string) {
    updateResume(resumeId, { projects: data.projects.filter((p) => p.id !== id) });
  }

  function addProject() {
    updateResume(resumeId, { projects: [...data.projects, createEmptyProject()] });
  }

  return (
    <AccordionItem value="projects" className="border-border border-b-0">
      <AccordionTrigger className="text-sm font-mono uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Projects
        <span className="ml-auto mr-2 text-xs text-muted-foreground font-normal">
          {data.projects.length} {data.projects.length === 1 ? "project" : "projects"}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
        {data.projects.map((proj, idx) => (
          <div key={proj.id} className="border border-border bg-card rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-text-subtle">
                {proj.name || `Project ${idx + 1}`}
              </p>
              <button
                onClick={() => removeProject(proj.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                id={`projName-${proj.id}`}
                label="Project Name"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                placeholder="My Awesome Project"
              />
              <FormInput
                id={`projUrl-${proj.id}`}
                label="URL (optional)"
                value={proj.url ?? ""}
                onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                placeholder="github.com/user/project"
              />
              <FormInput
                id={`projTech-${proj.id}`}
                label="Technologies (comma separated)"
                value={proj.technologies.join(", ")}
                onChange={(e) =>
                  updateProject(proj.id, {
                    technologies: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="React, TypeScript, Node.js"
                className="sm:col-span-2"
              />
              <FormInput
                id={`projStart-${proj.id}`}
                label="Start Date"
                value={proj.startDate}
                onChange={(e) => updateProject(proj.id, { startDate: e.target.value })}
                placeholder="YYYY-MM"
              />
              <FormInput
                id={`projEnd-${proj.id}`}
                label="End Date"
                value={proj.endDate ?? ""}
                onChange={(e) =>
                  updateProject(proj.id, { endDate: e.target.value || null })
                }
                placeholder="YYYY-MM or leave blank"
              />
            </div>
            <FormTextarea
              id={`projDesc-${proj.id}`}
              label="Description"
              value={proj.description}
              onChange={(e) => updateProject(proj.id, { description: e.target.value })}
              rows={3}
              placeholder="A platform that helps..."
              action={
                <AIImproveButton
                  text={proj.description}
                  fieldType="project"
                  onAccept={(v) => updateProject(proj.id, { description: v })}
                />
              }
            />
          </div>
        ))}

        <Button
          variant="ghost"
          onClick={addProject}
          className="w-full border border-dashed border-border hover:border-brand-secondary/60 hover:bg-surface-soft font-mono text-xs uppercase tracking-widest gap-2 h-10"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
