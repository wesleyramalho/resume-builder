"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { EducationEntry, ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface Props {
  resumeId: string;
  data: ResumeData;
}

function createEmptyEducation(): EducationEntry {
  return {
    id: generateId(),
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: null,
    gpa: "",
    highlights: "",
  };
}

export default function EducationSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);

  function updateEdu(id: string, patch: Partial<EducationEntry>) {
    updateResume(resumeId, {
      education: data.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  }

  function addEdu() {
    updateResume(resumeId, { education: [...data.education, createEmptyEducation()] });
  }

  function removeEdu(id: string) {
    updateResume(resumeId, { education: data.education.filter((e) => e.id !== id) });
  }

  return (
    <AccordionItem value="education" className="border-border">
      <AccordionTrigger className="text-sm font-mono uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Education
        <span className="ml-auto mr-2 text-xs text-muted-foreground font-normal">
          {data.education.length} {data.education.length === 1 ? "entry" : "entries"}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
        {data.education.map((edu, idx) => (
          <div key={edu.id} className="border border-border bg-card rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs font-mono text-text-subtle">
                  {edu.school || `Education ${idx + 1}`}
                </p>
              </div>
              <button
                onClick={() => removeEdu(edu.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove education"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormInput
                id={`school-${edu.id}`}
                label="School"
                value={edu.school}
                onChange={(e) => updateEdu(edu.id, { school: e.target.value })}
                placeholder="Pratt Institute"
              />
              <FormInput
                id={`degree-${edu.id}`}
                label="Degree"
                value={edu.degree}
                onChange={(e) => updateEdu(edu.id, { degree: e.target.value })}
                placeholder="Bachelor of Architecture"
              />
              <FormInput
                id={`field-${edu.id}`}
                label="Field of Study"
                value={edu.field}
                onChange={(e) => updateEdu(edu.id, { field: e.target.value })}
                placeholder="Architecture & Art"
              />
              <FormInput
                id={`gpa-${edu.id}`}
                label="GPA (optional)"
                value={edu.gpa ?? ""}
                onChange={(e) => updateEdu(edu.id, { gpa: e.target.value })}
                placeholder="3.9"
              />
              <FormInput
                id={`eduStart-${edu.id}`}
                label="Start Date"
                value={edu.startDate}
                onChange={(e) => updateEdu(edu.id, { startDate: e.target.value })}
                placeholder="YYYY-MM"
              />
              <FormInput
                id={`eduEnd-${edu.id}`}
                label="End Date"
                value={edu.endDate ?? ""}
                onChange={(e) => updateEdu(edu.id, { endDate: e.target.value || null })}
                placeholder="YYYY-MM or leave blank"
              />
            </div>
            <FormTextarea
              id={`eduHighlights-${edu.id}`}
              label="Highlights (optional)"
              value={edu.highlights}
              onChange={(e) => updateEdu(edu.id, { highlights: e.target.value })}
              placeholder="Dean's List, relevant coursework, thesis..."
              rows={2}
            />
          </div>
        ))}

        <Button
          variant="ghost"
          onClick={addEdu}
          className="w-full border border-dashed border-border hover:border-brand-secondary/60 hover:bg-surface-soft font-mono text-xs uppercase tracking-widest gap-2 h-10"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
