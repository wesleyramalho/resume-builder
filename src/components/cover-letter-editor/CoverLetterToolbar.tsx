"use client";

import { ArrowLeft, Check, Loader2, FileDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CoverLetter } from "@/types/coverLetter";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { useCoverLetterAutoSave } from "@/hooks/useCoverLetterAutoSave";
import { useExportCoverLetterPDF } from "@/hooks/useExportCoverLetterPDF";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface Props {
  coverLetter: CoverLetter;
}

export default function CoverLetterToolbar({ coverLetter }: Props) {
  const router = useRouter();
  const t = useTranslations("coverLetter");
  const tc = useTranslations("common");
  const saveStatus = useCoverLetterAutoSave(coverLetter.id);
  const updateName = useCoverLetterStore((s) => s.updateCoverLetterName);
  const { exportPDF, exporting } = useExportCoverLetterPDF();

  return (
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-30">
      <button
        onClick={() => router.push("/dashboard")}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={t("backToDashboard")}
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <div className="h-4 w-px bg-border" />

      <input
        value={coverLetter.name}
        onChange={(e) => updateName(coverLetter.id, e.target.value)}
        className="flex-1 min-w-0 bg-transparent text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none"
        placeholder={t("coverLetterName")}
        aria-label={t("coverLetterName")}
      />

      <div className="hidden sm:flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest text-muted-foreground">
        {saveStatus === "saving" ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            {tc("saving")}
          </>
        ) : (
          <>
            <Check className="w-3 h-3 text-emerald-500" />
            {tc("saved")}
          </>
        )}
      </div>

      <Button
        size="sm"
        onClick={() => exportPDF(coverLetter)}
        disabled={exporting}
        className="font-sans text-xs uppercase tracking-widest gap-2"
      >
        {exporting ? <Loader2 className="animate-spin" /> : <FileDown />}
        <span className="hidden sm:inline">{tc("export")}</span>
      </Button>

      <div className="hidden sm:flex">
        <LanguageSwitcher />
      </div>
      <ThemeToggle />
    </div>
  );
}
