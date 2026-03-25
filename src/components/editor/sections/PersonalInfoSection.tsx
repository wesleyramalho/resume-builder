"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCallback, useRef, useState } from "react";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { useResumeForm } from "@/hooks/useResumeForm";
import { personalInfoSchema, PersonalInfoFormValues } from "@/lib/schemas";
import AIImproveButton from "@/components/ui/AIImproveButton";
import PhotoEditor from "@/components/ui/PhotoEditor";
import { Camera, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  resumeId: string;
  data: ResumeData;
}

const MAX_PHOTO_SIZE = 500 * 1024; // 500KB

export default function PersonalInfoSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSrc, setEditorSrc] = useState("");

  const toResumeData = useCallback(
    (values: PersonalInfoFormValues): Partial<ResumeData> => values,
    [],
  );

  const { register, setValue, watch } = useResumeForm<PersonalInfoFormValues>({
    resumeId,
    schema: personalInfoSchema,
    defaultValues: {
      fullName: data.fullName,
      headline: data.headline,
      summary: data.summary,
      contact: { ...data.contact },
    },
    toResumeData,
  });

  const summary = watch("summary");

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_PHOTO_SIZE) {
      toast.error("Photo must be under 500KB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setEditorSrc(reader.result as string);
      setEditorOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handlePhotoSave(croppedDataUrl: string) {
    updateResume(resumeId, { photo: croppedDataUrl });
  }

  return (
    <AccordionItem value="personal" className="border-border">
      <AccordionTrigger className="text-sm font-mono uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Personal Info
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
        {/* Photo upload */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative w-16 h-16 rounded-full border-2 border-dashed border-border hover:border-ring flex items-center justify-center overflow-hidden transition-colors shrink-0 bg-surface-soft"
          >
            {data.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoSelect}
            className="hidden"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-mono uppercase tracking-widest text-text-subtle">
              Profile Photo
            </p>
            <p className="text-[10px] text-muted-foreground">
              Optional. Max 500KB.
            </p>
            {data.photo && (
              <div className="flex gap-2 mt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setEditorSrc(data.photo!);
                    setEditorOpen(true);
                  }}
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => updateResume(resumeId, { photo: undefined })}
                  className="inline-flex items-center gap-1 text-[10px] text-destructive hover:text-destructive/80 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        <PhotoEditor
          open={editorOpen}
          onOpenChange={setEditorOpen}
          imageSrc={editorSrc}
          onSave={handlePhotoSave}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            id="fullName"
            label="Full Name"
            placeholder="Alexander Vaughn"
            {...register("fullName")}
          />
          <FormInput
            id="headline"
            label="Headline"
            placeholder="Senior Software Engineer"
            {...register("headline")}
          />
        </div>

        <FormTextarea
          id="summary"
          label="Professional Summary"
          placeholder="Dedicated to building scalable, design-forward products..."
          rows={3}
          {...register("summary")}
          action={
            <AIImproveButton
              text={summary}
              fieldType="summary"
              onAccept={(v) => setValue("summary", v)}
            />
          }
        />

        <div className="border-t border-border pt-4">
          <p className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-3">Contact</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="alex@example.com"
              {...register("contact.email")}
            />
            <FormInput
              id="phone"
              label="Phone"
              type="tel"
              placeholder="+1 (555) 123 4567"
              {...register("contact.phone")}
            />
            <FormInput
              id="location"
              label="Location"
              placeholder="New York, NY"
              {...register("contact.location")}
            />
            <FormInput
              id="linkedin"
              label="LinkedIn"
              placeholder="linkedin.com/in/yourprofile"
              {...register("contact.linkedin")}
            />
            <FormInput
              id="website"
              label="Website"
              placeholder="yourwebsite.com"
              className="sm:col-span-2"
              {...register("contact.website")}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
