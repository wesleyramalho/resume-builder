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
import { educationEntrySchema } from "@/lib/schemas";
import { Plus, Trash2 } from "lucide-react";
import AIImproveButton from "@/components/ui/AIImproveButton";
import MonthYearPicker from "@/components/ui/MonthYearPicker";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const formSchema = z.object({
  education: z.array(educationEntrySchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function EducationSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastSyncedJson = useRef(JSON.stringify(data.education));

  const { register, control, watch, setValue, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { education: data.education },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "education" });

  useEffect(() => {
    const sub = watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (values.education) {
          lastSyncedJson.current = JSON.stringify(values.education);
          updateResume(resumeId, { education: values.education as ResumeData["education"] });
        }
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [watch, resumeId, updateResume]);

  const storeJson = JSON.stringify(data.education);
  useEffect(() => {
    if (storeJson === lastSyncedJson.current) return;
    reset({ education: data.education });
  }, [storeJson]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AccordionItem value="education" className="border-border">
      <AccordionTrigger className="text-sm font-mono uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Education
        <span className="ml-auto mr-2 text-xs text-muted-foreground font-normal">
          {fields.length} {fields.length === 1 ? "entry" : "entries"}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
        {fields.map((field, idx) => {
          const edu = watch(`education.${idx}`);
          return (
            <div key={field.id} className="border border-border bg-card rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-mono text-text-subtle">
                  {edu?.school || `Education ${idx + 1}`}
                </p>
                <button
                  onClick={() => remove(idx)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormInput
                  id={`school-${field.id}`}
                  label="School"
                  placeholder="Pratt Institute"
                  {...register(`education.${idx}.school`)}
                />
                <FormInput
                  id={`degree-${field.id}`}
                  label="Degree"
                  placeholder="Bachelor of Architecture"
                  {...register(`education.${idx}.degree`)}
                />
                <FormInput
                  id={`field-${field.id}`}
                  label="Field of Study"
                  placeholder="Architecture & Art"
                  {...register(`education.${idx}.field`)}
                />
                <FormInput
                  id={`gpa-${field.id}`}
                  label="GPA (optional)"
                  placeholder="3.9"
                  {...register(`education.${idx}.gpa`)}
                />
                <MonthYearPicker
                  id={`eduStart-${field.id}`}
                  label="Start Date"
                  value={edu?.startDate ?? ""}
                  onChange={(v) => setValue(`education.${idx}.startDate`, v)}
                />
                <MonthYearPicker
                  id={`eduEnd-${field.id}`}
                  label="End Date"
                  value={edu?.endDate ?? ""}
                  onChange={(v) => setValue(`education.${idx}.endDate`, v || null)}
                />
              </div>
              <FormTextarea
                id={`eduHighlights-${field.id}`}
                label="Highlights (optional)"
                placeholder="Dean's List, relevant coursework, thesis..."
                rows={2}
                {...register(`education.${idx}.highlights`)}
                action={
                  <AIImproveButton
                    text={edu?.highlights ?? ""}
                    fieldType="education"
                    onAccept={(v) => setValue(`education.${idx}.highlights`, v)}
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
            school: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: null,
            gpa: "",
            highlights: "",
          })}
          className="w-full border border-dashed border-border hover:border-brand-secondary/60 hover:bg-surface-soft font-mono text-xs uppercase tracking-widest gap-2 h-10"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
