"use client";

import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { generateId } from "@/lib/utils";
import { experienceEntrySchema } from "@/lib/schemas";
import { Plus, Trash2, GripVertical } from "lucide-react";
import AIImproveButton from "@/components/ui/AIImproveButton";
import MonthYearPicker from "@/components/ui/MonthYearPicker";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const formSchema = z.object({
  experience: z.array(experienceEntrySchema),
});

type FormValues = z.infer<typeof formSchema>;

interface SortableExpItemProps {
  field: { id: string };
  idx: number;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  setValue: ReturnType<typeof useForm<FormValues>>["setValue"];
  watch: ReturnType<typeof useForm<FormValues>>["watch"];
  remove: (idx: number) => void;
}

function SortableExpItem({ field, idx, register, setValue, watch, remove }: SortableExpItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: field.id });

  const exp = watch(`experience.${idx}`);

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`border border-border bg-card rounded-lg p-4 space-y-3 ${isDragging ? "opacity-50 shadow-lg" : ""}`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <button
            {...listeners}
            {...attributes}
            tabIndex={-1}
            aria-label="Drag to reorder"
            className="p-1 text-muted-foreground/40 hover:text-muted-foreground cursor-grab active:cursor-grabbing shrink-0"
          >
            <GripVertical className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
          <p className="text-xs font-sans text-text-subtle">
            {exp?.company || `Experience ${idx + 1}`}
          </p>
        </div>
        <button
          onClick={() => remove(idx)}
          className="text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Remove experience"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormInput
          id={`company-${field.id}`}
          label="Company / Studio"
          placeholder="Metropolis Design Group"
          {...register(`experience.${idx}.company`)}
        />
        <FormInput
          id={`title-${field.id}`}
          label="Position"
          placeholder="Senior Architect"
          {...register(`experience.${idx}.title`)}
        />
        <FormInput
          id={`location-${field.id}`}
          label="Location"
          placeholder="New York, NY"
          {...register(`experience.${idx}.location`)}
        />
        <div />
        <MonthYearPicker
          id={`startDate-${field.id}`}
          label="Start Date"
          value={exp?.startDate ?? ""}
          onChange={(v) => setValue(`experience.${idx}.startDate`, v)}
        />
        <div className="space-y-1">
          <MonthYearPicker
            id={`endDate-${field.id}`}
            label="End Date"
            value={exp?.endDate ?? ""}
            disabled={exp?.current}
            onChange={(v) => setValue(`experience.${idx}.endDate`, v || null)}
          />
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer mt-1">
            <input
              type="checkbox"
              {...register(`experience.${idx}.current`)}
              onChange={(e) => {
                setValue(`experience.${idx}.current`, e.target.checked);
                if (e.target.checked) setValue(`experience.${idx}.endDate`, null);
              }}
              className="rounded"
            />
            Present
          </label>
        </div>
      </div>

      <FormTextarea
        id={`desc-${field.id}`}
        label="Description (one bullet per line)"
        placeholder={"Led a team of 12 junior architects...\nImplemented BIM workflows..."}
        rows={4}
        {...register(`experience.${idx}.description`)}
        action={
          <AIImproveButton
            text={exp?.description ?? ""}
            fieldType="experience"
            onAccept={(v) => setValue(`experience.${idx}.description`, v)}
          />
        }
      />
    </div>
  );
}

export default function ExperienceSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateResumeRef = useRef(updateResume);
  updateResumeRef.current = updateResume;
  const resumeIdRef = useRef(resumeId);
  resumeIdRef.current = resumeId;

  const lastSyncedJson = useRef(JSON.stringify(data.experience));

  const { register, control, watch, setValue, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { experience: structuredClone(data.experience) },
    mode: "onChange",
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: "experience" });

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    move(oldIndex, newIndex);
  }

  // Auto-sync to store
  useEffect(() => {
    const sub = watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (values.experience) {
          lastSyncedJson.current = JSON.stringify(values.experience);
          updateResumeRef.current(resumeIdRef.current, { experience: structuredClone(values.experience) as ResumeData["experience"] });
        }
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset form when store data changes externally
  const storeJson = JSON.stringify(data.experience);
  useEffect(() => {
    if (storeJson === lastSyncedJson.current) return;
    reset({ experience: structuredClone(data.experience) });
  }, [storeJson]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AccordionItem value="experience" className="border-border">
      <AccordionTrigger className="text-sm font-sans uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Experience
        <span className="ml-auto mr-2 text-xs text-muted-foreground font-normal">
          {fields.length} {fields.length === 1 ? "entry" : "entries"}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-6">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            {fields.map((field, idx) => (
              <SortableExpItem
                key={field.id}
                field={field}
                idx={idx}
                register={register}
                setValue={setValue}
                watch={watch}
                remove={remove}
              />
            ))}
          </SortableContext>
        </DndContext>

        <Button
          variant="ghost"
          onClick={() => append({
            id: generateId(),
            company: "",
            title: "",
            location: "",
            startDate: "",
            endDate: null,
            current: false,
            description: "",
          })}
          className="w-full border border-dashed border-border hover:border-brand-secondary/60 hover:bg-surface-soft font-sans text-xs uppercase tracking-widest gap-2 h-10"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
