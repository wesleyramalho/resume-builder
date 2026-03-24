"use client";

import { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { SkillGroup, ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { Plus, Trash2, X } from "lucide-react";

interface Props {
  resumeId: string;
  data: ResumeData;
}

function createEmptySkillGroup(): SkillGroup {
  return { id: generateId(), category: "", skills: [] };
}

export default function SkillsSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  function updateGroup(id: string, patch: Partial<SkillGroup>) {
    updateResume(resumeId, {
      skillGroups: data.skillGroups.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    });
  }

  function removeGroup(id: string) {
    updateResume(resumeId, { skillGroups: data.skillGroups.filter((g) => g.id !== id) });
  }

  function addSkill(groupId: string) {
    const val = (newSkills[groupId] ?? "").trim();
    if (!val) return;
    const group = data.skillGroups.find((g) => g.id === groupId);
    if (!group) return;
    updateGroup(groupId, { skills: [...group.skills, val] });
    setNewSkills((prev) => ({ ...prev, [groupId]: "" }));
  }

  function removeSkill(groupId: string, skill: string) {
    const group = data.skillGroups.find((g) => g.id === groupId);
    if (!group) return;
    updateGroup(groupId, { skills: group.skills.filter((s) => s !== skill) });
  }

  return (
    <AccordionItem value="skills" className="border-border">
      <AccordionTrigger className="text-sm font-mono uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Skills
        <span className="ml-auto mr-2 text-xs text-muted-foreground font-normal">
          {data.skillGroups.flatMap((g) => g.skills).length} skills
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
        {data.skillGroups.map((group) => (
          <div key={group.id} className="border border-border bg-card rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <FormInput
                id={`skillCat-${group.id}`}
                label="Category"
                value={group.category}
                onChange={(e) => updateGroup(group.id, { category: e.target.value })}
                placeholder="Frontend, Languages, Tools..."
                className="flex-1"
              />
              <button
                onClick={() => removeGroup(group.id)}
                className="text-muted-foreground hover:text-destructive transition-colors mt-5"
                aria-label="Remove skill group"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 px-2 py-0.5 bg-surface-soft border border-border rounded text-xs font-mono"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(group.id, skill)}
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
                value={newSkills[group.id] ?? ""}
                onChange={(e) => setNewSkills((prev) => ({ ...prev, [group.id]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(group.id);
                  }
                }}
                placeholder="Type a skill and press Enter"
                className="flex-1 bg-input border border-border rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-colors"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => addSkill(group.id)}
                className="border border-border hover:bg-muted h-8 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="ghost"
          onClick={() =>
            updateResume(resumeId, {
              skillGroups: [...data.skillGroups, createEmptySkillGroup()],
            })
          }
          className="w-full border border-dashed border-border hover:border-brand-secondary/60 hover:bg-surface-soft font-mono text-xs uppercase tracking-widest gap-2 h-10"
        >
          <Plus className="w-4 h-4" />
          Add Skill Group
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
