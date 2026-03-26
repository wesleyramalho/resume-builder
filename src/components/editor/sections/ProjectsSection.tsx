"use client";

import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { projectEntrySchema } from "@/lib/schemas";
import { Plus, Trash2 } from "lucide-react";
import AIImproveButton from "@/components/ui/AIImproveButton";
import MonthYearPicker from "@/components/ui/MonthYearPicker";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const formSchema = z.object({
  projects: z.array(projectEntrySchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProjectsSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastSyncedJson = useRef(JSON.stringify(data.projects));

  const { register, control, watch, setValue, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { projects: data.projects },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "projects" });

  useEffect(() => {
    const sub = watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (values.projects) {
          lastSyncedJson.current = JSON.stringify(values.projects);
          updateResume(resumeId, { projects: values.projects as ResumeData["projects"] });
        }
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [watch, resumeId, updateResume]);

  const storeJson = JSON.stringify(data.projects);
  useEffect(() => {
    if (storeJson === lastSyncedJson.current) return;
    reset({ projects: data.projects });
  }, [storeJson]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AccordionItem value="projects" className="border-border border-b-0">
      <AccordionTrigger className="text-sm font-sans uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Projects
        <span className="ml-auto mr-2 text-xs text-muted-foreground font-normal">
          {fields.length} {fields.length === 1 ? "project" : "projects"}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
        {fields.map((field, idx) => {
          const proj = watch(`projects.${idx}`);
          return (
            <div key={field.id} className="border border-border bg-card rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-sans text-text-subtle">
                  {proj?.name || `Project ${idx + 1}`}
                </p>
                <button
                  onClick={() => remove(idx)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormInput
                  id={`projName-${field.id}`}
                  label="Project Name"
                  placeholder="My Awesome Project"
                  {...register(`projects.${idx}.name`)}
                />
                <FormInput
                  id={`projUrl-${field.id}`}
                  label="URL (optional)"
                  placeholder="github.com/user/project"
                  {...register(`projects.${idx}.url`)}
                />
                <FormInput
                  id={`projTech-${field.id}`}
                  label="Technologies (comma separated)"
                  placeholder="React, TypeScript, Node.js"
                  className="sm:col-span-2"
                  value={proj?.technologies?.join(", ") ?? ""}
                  onChange={(e) => {
                    const techs = e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean);
                    setValue(`projects.${idx}.technologies`, techs);
                  }}
                />
                <MonthYearPicker
                  id={`projStart-${field.id}`}
                  label="Start Date"
                  value={proj?.startDate ?? ""}
                  onChange={(v) => setValue(`projects.${idx}.startDate`, v)}
                />
                <MonthYearPicker
                  id={`projEnd-${field.id}`}
                  label="End Date"
                  value={proj?.endDate ?? ""}
                  onChange={(v) => setValue(`projects.${idx}.endDate`, v || null)}
                />
              </div>
              <FormTextarea
                id={`projDesc-${field.id}`}
                label="Description"
                rows={3}
                placeholder="A platform that helps..."
                {...register(`projects.${idx}.description`)}
                action={
                  <AIImproveButton
                    text={proj?.description ?? ""}
                    fieldType="project"
                    onAccept={(v) => setValue(`projects.${idx}.description`, v)}
                  />
                }
              />
            </div>
          );
        })}

        <Button
          variant="ghost"
          onClick={() => append({
            id: generateId(),
            name: "",
            description: "",
            url: "",
            technologies: [],
            startDate: "",
            endDate: null,
          })}
          className="w-full border border-dashed border-border hover:border-brand-secondary/60 hover:bg-surface-soft font-sans text-xs uppercase tracking-widest gap-2 h-10"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
