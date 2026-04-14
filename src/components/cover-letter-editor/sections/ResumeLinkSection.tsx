"use client";

import { useTranslations } from "next-intl";
import { Link2, Link2Off } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoverLetterData } from "@/types/coverLetter";
import { useResumeStore } from "@/store/useResumeStore";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { track } from "@/lib/analytics";

interface Props {
  coverLetterId: string;
  data: CoverLetterData;
}

export default function ResumeLinkSection({ coverLetterId, data }: Props) {
  const t = useTranslations("coverLetter");
  const resumes = useResumeStore((s) => s.resumes);
  const updateCoverLetter = useCoverLetterStore((s) => s.updateCoverLetter);
  const linkedResume = resumes.find((r) => r.id === data.linkedResumeId);

  function handleLink(resumeId: string) {
    const resume = resumes.find((r) => r.id === resumeId);
    if (!resume) return;
    updateCoverLetter(coverLetterId, {
      linkedResumeId: resumeId,
      senderName: resume.data.fullName,
      senderContact: { ...resume.data.contact },
    });
    track("cover_letter_resume_linked", { resumeId });
  }

  function handleUnlink() {
    updateCoverLetter(coverLetterId, {
      linkedResumeId: undefined,
    });
    track("cover_letter_resume_unlinked");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-sans uppercase tracking-widest text-foreground font-medium">
          {t("resumeLink")}
        </h3>
        {linkedResume && (
          <Badge
            variant="secondary"
            className="text-[10px] font-sans uppercase tracking-widest bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
          >
            <Link2 className="w-3 h-3 mr-1" />
            {t("linked")}
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{t("resumeLinkDesc")}</p>

      {linkedResume ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground flex-1 truncate">
            {linkedResume.name}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleUnlink}
            className="font-sans text-xs uppercase tracking-widest gap-1.5 text-muted-foreground"
          >
            <Link2Off className="w-3.5 h-3.5" />
            {t("unlink")}
          </Button>
        </div>
      ) : (
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) handleLink(e.target.value);
          }}
          className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-ring transition-colors"
        >
          <option value="">{t("selectResume")}</option>
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
