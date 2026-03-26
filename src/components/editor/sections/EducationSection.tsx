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
import { educationEntrySchema } from "@/lib/schemas";
import { Plus, Trash2, GripVertical } from "lucide-react";
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

interface SortableEduItemProps {
  field: { id: string };
  idx: number;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  setValue: ReturnType<typeof useForm<FormValues>>["setValue"];
  watch: ReturnType<typeof useForm<FormValues>>["watch"];
  remove: (idx: number) => void;
}

function SortableEduItem({ field, idx, register, setValue, watch, remove }: SortableEduItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: field.id });

  const edu = watch(`education.${idx}`);

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
            {edu?.school || `Education ${idx + 1}`}
          </p>
        </div>
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
}

export default function EducationSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateResumeRef = useRef(updateResume);
  updateResumeRef.current = updateResume;
  const resumeIdRef = useRef(resumeId);
  resumeIdRef.current = resumeId;

  const lastSyncedJson = useRef(JSON.stringify(data.education));

  const { register, control, watch, setValue, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { education: structuredClone(data.education) },
    mode: "onChange",
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: "education" });

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    move(oldIndex, newIndex);
  }

  useEffect(() => {
    const sub = watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (values.education) {
          lastSyncedJson.current = JSON.stringify(values.education);
          updateResumeRef.current(resumeIdRef.current, { education: structuredClone(values.education) as ResumeData["education"] });
        }
      }, 300);
    });
    return () => {
      sub.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const storeJson = JSON.stringify(data.education);
  useEffect(() => {
    if (storeJson === lastSyncedJson.current) return;
    reset({ education: structuredClone(data.education) });
  }, [storeJson]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AccordionItem value="education" className="border-border">
      <AccordionTrigger className="text-sm font-sans uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Education
        <span className="ml-auto mr-2 text-xs text-muted-foreground font-normal">
          {fields.length} {fields.length === 1 ? "entry" : "entries"}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            {fields.map((field, idx) => (
              <SortableEduItem
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
            school: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: null,
            gpa: "",
            highlights: "",
          })}
          className="w-full border border-dashed border-border hover:border-brand-secondary/60 hover:bg-surface-soft font-sans text-xs uppercase tracking-widest gap-2 h-10"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
