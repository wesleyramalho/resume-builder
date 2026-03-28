"use client";

import { useCallback } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormTextarea } from "@/components/ui/FormInput";
import { ResumeData } from "@/types/resume";
import { useResumeForm } from "@/hooks/useResumeForm";
import { z } from "zod";
import AIImproveButton from "@/components/ui/AIImproveButton";

const summarySchema = z.object({
  summary: z.string(),
});

type SummaryFormValues = z.infer<typeof summarySchema>;

interface Props {
  resumeId: string;
  data: ResumeData;
}

export default function SummarySection({ resumeId, data }: Props) {
  const toResumeData = useCallback(
    (values: SummaryFormValues): Partial<ResumeData> => values,
    [],
  );

  const { register, setValue, watch } = useResumeForm<SummaryFormValues>({
    resumeId,
    schema: summarySchema,
    defaultValues: {
      summary: data.summary,
    },
    toResumeData,
  });

  const summary = watch("summary");

  return (
    <AccordionItem value="summary" className="border-border">
      <AccordionTrigger className="text-sm font-sans uppercase tracking-widest text-foreground hover:no-underline hover:text-foreground/80 py-4">
        Summary
      </AccordionTrigger>
      <AccordionContent className="pb-6 space-y-4">
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
      </AccordionContent>
    </AccordionItem>
  );
}
