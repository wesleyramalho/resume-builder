"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";

interface Props {
  resumeId: string;
  data: ResumeData;
}

export default function PersonalInfoSection({ resumeId, data }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);

  function update(patch: Partial<ResumeData>) {
    updateResume(resumeId, patch);
  }

  function updateContact(field: keyof ResumeData["contact"], value: string) {
    updateResume(resumeId, { contact: { ...data.contact, [field]: value } });
  }

  return (
    <AccordionItem value="personal" className="border-border">
      <AccordionTrigger className="text-sm font-mono uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Personal Info
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            id="fullName"
            label="Full Name"
            value={data.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="Alexander Vaughn"
          />
          <FormInput
            id="headline"
            label="Headline"
            value={data.headline}
            onChange={(e) => update({ headline: e.target.value })}
            placeholder="Senior Software Engineer"
          />
        </div>

        <FormTextarea
          id="summary"
          label="Professional Summary"
          value={data.summary}
          onChange={(e) => update({ summary: e.target.value })}
          placeholder="Dedicated to building scalable, design-forward products..."
          rows={3}
        />

        <div className="border-t border-border pt-4">
          <p className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-3">Contact</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              id="email"
              label="Email"
              type="email"
              value={data.contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
              placeholder="alex@example.com"
            />
            <FormInput
              id="phone"
              label="Phone"
              type="tel"
              value={data.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
              placeholder="+1 (555) 123 4567"
            />
            <FormInput
              id="location"
              label="Location"
              value={data.contact.location}
              onChange={(e) => updateContact("location", e.target.value)}
              placeholder="New York, NY"
            />
            <FormInput
              id="linkedin"
              label="LinkedIn"
              value={data.contact.linkedin}
              onChange={(e) => updateContact("linkedin", e.target.value)}
              placeholder="linkedin.com/in/yourprofile"
            />
            <FormInput
              id="website"
              label="Website"
              value={data.contact.website}
              onChange={(e) => updateContact("website", e.target.value)}
              placeholder="yourwebsite.com"
              className="sm:col-span-2"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
