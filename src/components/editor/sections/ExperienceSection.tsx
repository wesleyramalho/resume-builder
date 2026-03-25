"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { ExperienceEntry, ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { Plus, Trash2, GripVertical } from "lucide-react";
import AIImproveButton from "@/components/ui/AIImproveButton";

interface Props {
  resumeId: string;
  data: ResumeData;
}

function createEmptyExperience(): ExperienceEntry {
  return {
    id: generateId(),
    company: "",
    title: "",
    location: "",
    startDate: "",
    endDate: null,
    current: false,
    description: "",
  };
}

export default function ExperienceSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);

  function updateExp(id: string, patch: Partial<ExperienceEntry>) {
    updateResume(resumeId, {
      experience: data.experience.map((e) =>
        e.id === id ? { ...e, ...patch } : e
      ),
    });
  }

  function addExp() {
    updateResume(resumeId, {
      experience: [...data.experience, createEmptyExperience()],
    });
  }

  function removeExp(id: string) {
    updateResume(resumeId, {
      experience: data.experience.filter((e) => e.id !== id),
    });
  }

  return (
    <AccordionItem value="experience" className="border-border">
      <AccordionTrigger className="text-sm font-mono uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Experience
        <span className="ml-auto mr-2 text-xs text-muted-foreground font-normal">
          {data.experience.length} {data.experience.length === 1 ? "entry" : "entries"}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-6">
        {data.experience.map((exp, idx) => (
          <div key={exp.id} className="border border-border bg-card rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs font-mono text-text-subtle">
                  {exp.company || `Experience ${idx + 1}`}
                </p>
              </div>
              <button
                onClick={() => removeExp(exp.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                id={`company-${exp.id}`}
                label="Company / Studio"
                value={exp.company}
                onChange={(e) => updateExp(exp.id, { company: e.target.value })}
                placeholder="Metropolis Design Group"
              />
              <FormInput
                id={`title-${exp.id}`}
                label="Position"
                value={exp.title}
                onChange={(e) => updateExp(exp.id, { title: e.target.value })}
                placeholder="Senior Architect"
              />
              <FormInput
                id={`location-${exp.id}`}
                label="Location"
                value={exp.location}
                onChange={(e) => updateExp(exp.id, { location: e.target.value })}
                placeholder="New York, NY"
              />
              <div />
              <FormInput
                id={`startDate-${exp.id}`}
                label="Start Date"
                value={exp.startDate}
                onChange={(e) => updateExp(exp.id, { startDate: e.target.value })}
                placeholder="YYYY-MM"
              />
              <div className="space-y-1">
                <FormInput
                  id={`endDate-${exp.id}`}
                  label="End Date"
                  value={exp.endDate ?? ""}
                  disabled={exp.current}
                  onChange={(e) => updateExp(exp.id, { endDate: e.target.value || null })}
                  placeholder="YYYY-MM"
                />
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) =>
                      updateExp(exp.id, { current: e.target.checked, endDate: e.target.checked ? null : exp.endDate })
                    }
                    className="rounded"
                  />
                  Present
                </label>
              </div>
            </div>

            <FormTextarea
              id={`desc-${exp.id}`}
              label="Description (one bullet per line)"
              value={exp.description}
              onChange={(e) => updateExp(exp.id, { description: e.target.value })}
              placeholder={"Led a team of 12 junior architects...\nImplemented BIM workflows..."}
              rows={4}
              action={
                <AIImproveButton
                  text={exp.description}
                  fieldType="experience"
                  onAccept={(v) => updateExp(exp.id, { description: v })}
                />
              }
            />
          </div>
        ))}

        <Button
          variant="ghost"
          onClick={addExp}
          className="w-full border border-dashed border-border hover:border-brand-secondary/60 hover:bg-surface-soft font-mono text-xs uppercase tracking-widest gap-2 h-10"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
