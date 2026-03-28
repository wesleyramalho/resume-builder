"use client";

import { useTranslations } from "next-intl";
import { TEMPLATES } from "@/lib/resumeTemplates";
import { createEmptyResumeData } from "@/lib/resumeDefaults";
import type { ResumeData } from "@/types/resume";
import ResumeThumbnail from "@/components/dashboard/ResumeThumbnail";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (templateId: string) => void;
}

function getSampleData(templateId: string): ResumeData {
  const tmpl = TEMPLATES.find((t) => t.id === templateId);
  return {
    ...createEmptyResumeData(),
    ...tmpl?.sampleData,
    photo: tmpl?.previewPhoto,
  } as ResumeData;
}

export default function TemplatePicker({ open, onOpenChange, onSelect }: Props) {
  const t = useTranslations("dashboard");
  const tt = useTranslations("templates");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{t("chooseTemplate")}</DialogTitle>
          <DialogDescription>
            {t("chooseTemplateDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          <button
            onClick={() => onSelect("blank")}
            className="text-left rounded-lg border border-dashed border-border p-3 hover:border-ring hover:bg-surface-soft transition-colors"
          >
            <div className="aspect-[3/4] bg-surface-soft rounded flex items-center justify-center mb-2">
              <span className="text-2xl text-muted-foreground/40">+</span>
            </div>
            <p className="text-xs font-semibold text-foreground">{t("blank")}</p>
            <p className="text-[9px] text-muted-foreground leading-relaxed mt-0.5">
              {t("startFromScratch")}
            </p>
          </button>

          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => onSelect(tmpl.id)}
              className="text-left rounded-lg border border-border p-3 hover:border-ring hover:bg-surface-soft transition-colors"
            >
              <div className="mb-2">
                <ResumeThumbnail
                  data={getSampleData(tmpl.id)}
                  templateId={tmpl.id}
                />
              </div>
              <p className="text-xs font-semibold text-foreground">{tt(tmpl.id)}</p>
              <p className="text-[9px] text-muted-foreground leading-relaxed mt-0.5">
                {tt(`${tmpl.id}Desc`)}
              </p>
            </button>
          ))}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
