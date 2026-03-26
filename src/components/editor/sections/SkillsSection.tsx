"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { skillGroupSchema } from "@/lib/schemas";
import { Plus, Trash2, X } from "lucide-react";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const formSchema = z.object({
  skillGroups: z.array(skillGroupSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function SkillsSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  const lastSyncedJson = useRef(JSON.stringify(data.skillGroups));

  const { register, control, watch, setValue, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { skillGroups: data.skillGroups },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "skillGroups" });

  useEffect(() => {
    const sub = watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (values.skillGroups) {
          lastSyncedJson.current = JSON.stringify(values.skillGroups);
          updateResume(resumeId, { skillGroups: values.skillGroups as ResumeData["skillGroups"] });
        }
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [watch, resumeId, updateResume]);

  const storeJson = JSON.stringify(data.skillGroups);
  useEffect(() => {
    if (storeJson === lastSyncedJson.current) return;
    reset({ skillGroups: data.skillGroups });
  }, [storeJson]); // eslint-disable-line react-hooks/exhaustive-deps

  function addSkill(groupIdx: number) {
    const groupId = fields[groupIdx]?.id;
    if (!groupId) return;
    const val = (newSkills[groupId] ?? "").trim();
    if (!val) return;
    const current = watch(`skillGroups.${groupIdx}.skills`) ?? [];
    setValue(`skillGroups.${groupIdx}.skills`, [...current, val]);
    setNewSkills((prev) => ({ ...prev, [groupId]: "" }));
  }

  function removeSkill(groupIdx: number, skill: string) {
    const current = watch(`skillGroups.${groupIdx}.skills`) ?? [];
    setValue(`skillGroups.${groupIdx}.skills`, current.filter((s) => s !== skill));
  }

  const totalSkills = fields.reduce((sum, _, idx) => {
    const skills = watch(`skillGroups.${idx}.skills`);
    return sum + (skills?.length ?? 0);
  }, 0);

  return (
    <AccordionItem value="skills" className="border-border">
      <AccordionTrigger className="text-sm font-sans uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Skills
        <span className="ml-auto mr-2 text-xs text-muted-foreground font-normal">
          {totalSkills} skills
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
        {fields.map((field, idx) => {
          const skills = watch(`skillGroups.${idx}.skills`) ?? [];
          return (
            <div key={field.id} className="border border-border bg-card rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <FormInput
                  id={`skillCat-${field.id}`}
                  label="Category"
                  placeholder="Frontend, Languages, Tools..."
                  className="flex-1"
                  {...register(`skillGroups.${idx}.category`)}
                />
                <button
                  onClick={() => remove(idx)}
                  className="text-muted-foreground hover:text-destructive transition-colors mt-5"
                  aria-label="Remove skill group"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 px-2 py-0.5 bg-surface-soft border border-border rounded text-xs font-sans"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(idx, skill)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add skill */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkills[field.id] ?? ""}
                  onChange={(e) => setNewSkills((prev) => ({ ...prev, [field.id]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill(idx);
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                  className="flex-1 bg-input border border-border rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-colors"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => addSkill(idx)}
                  className="border border-border hover:bg-muted h-8 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          );
        })}

        <Button
          variant="ghost"
          onClick={() => append({ id: generateId(), category: "", skills: [] })}
          className="w-full border border-dashed border-border hover:border-brand-secondary/60 hover:bg-surface-soft font-sans text-xs uppercase tracking-widest gap-2 h-10"
        >
          <Plus className="w-4 h-4" />
          Add Skill Group
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
