"use client";

import { useRouter } from "next/navigation";
import { FileDown, ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Resume } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { useResumeAutoSave } from "@/hooks/useResumeAutoSave";
import { useExportPDF } from "@/hooks/useExportPDF";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface Props {
  resume: Resume;
}

export default function EditorToolbar({ resume }: Props) {
  const router = useRouter();
  const saveStatus = useResumeAutoSave(resume.id);
  const { exportPDF, exporting } = useExportPDF();
  const updateResumeName = useResumeStore((s) => s.updateResumeName);

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-30">
      <button
        onClick={() => router.push("/dashboard")}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Back to dashboard"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <div className="h-4 w-px bg-border" />

      {/* Editable resume name */}
      <input
        value={resume.name}
        onChange={(e) => updateResumeName(resume.id, e.target.value)}
        className="flex-1 bg-transparent text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none"
        placeholder="Resume Name"
        aria-label="Resume name"
      />

      {/* Save status */}
      <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {saveStatus === "saving" ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            Saving
          </>
        ) : (
          <>
            <Check className="w-3 h-3 text-emerald-500" />
            Saved
          </>
        )}
      </div>

      <Button
        size="sm"
        onClick={() => exportPDF(resume)}
        disabled={exporting}
        className="font-mono text-xs uppercase tracking-widest gap-2 h-8"
      >
        {exporting ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <FileDown className="w-3.5 h-3.5" />
        )}
        Export PDF
      </Button>
      <ThemeToggle />
    </div>
  );
}
