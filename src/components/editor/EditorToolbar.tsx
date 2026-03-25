"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { FileDown, ArrowLeft, Check, Loader2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Resume, ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { useResumeAutoSave } from "@/hooks/useResumeAutoSave";
import { useExportPDF } from "@/hooks/useExportPDF";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { toast } from "sonner";
import { getTemplate } from "@/lib/resumeTemplates";
import ThemeToggle from "@/components/ui/ThemeToggle";
import TemplatePicker from "@/components/dashboard/TemplatePicker";

interface Props {
  resume: Resume;
}

interface LinkedInImportResponse {
  data?: Partial<ResumeData>;
}

export default function EditorToolbar({ resume }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const saveStatus = useResumeAutoSave(resume.id);
  const { exportPDF, exporting } = useExportPDF();
  const updateResumeName = useResumeStore((s) => s.updateResumeName);
  const updateResume = useResumeStore((s) => s.updateResume);
  const updateTemplateId = useResumeStore((s) => s.updateTemplateId);
  const [importing, setImporting] = useState(false);
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false);
  const hasConsumedImportIntent = useRef(false);

  const currentTemplate = resume.templateId ? getTemplate(resume.templateId) : null;

  function handleTemplateSelect(templateId: string) {
    setTemplatePickerOpen(false);
    if (templateId !== "blank") {
      updateTemplateId(resume.id, templateId);
    }
  }

  const handleLinkedInImport = useCallback(async () => {
    if (!session) {
      await signIn("linkedin", { callbackUrl: `/editor/${resume.id}?intent=import` });
      return;
    }
    setImporting(true);
    try {
      const res = await fetch("/api/linkedin/import", { method: "POST" });
      if (!res.ok) throw new Error("Import failed");
      const result = (await res.json()) as LinkedInImportResponse;
      if (result.data) {
        updateResume(resume.id, { ...result.data, linkedInImported: true });
        toast.success("LinkedIn profile imported");
      }
    } catch {
      toast.error("Unable to import LinkedIn profile");
    } finally {
      setImporting(false);
    }
  }, [session, resume.id, updateResume]);

  // Auto-import after OAuth redirect with ?intent=import
  useEffect(() => {
    const intent = searchParams.get("intent");
    if (intent !== "import" || hasConsumedImportIntent.current) return;
    if (status === "loading" || !session) return;
    hasConsumedImportIntent.current = true;
    void (async () => {
      await handleLinkedInImport();
      router.replace(`/editor/${resume.id}`);
    })();
  }, [handleLinkedInImport, searchParams, session, status, resume.id, router]);

  return (
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-30 overflow-x-auto">
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

      {/* Template switcher */}
      <button
        onClick={() => setTemplatePickerOpen(true)}
        className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border hover:border-ring shrink-0"
      >
        <Palette className="w-3 h-3" />
        <span className="hidden sm:inline">{currentTemplate?.name ?? "Default"}</span>
      </button>
      <TemplatePicker
        open={templatePickerOpen}
        onOpenChange={setTemplatePickerOpen}
        onSelect={handleTemplateSelect}
      />

      {/* Save status */}
      <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
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

      {!resume.data.linkedInImported && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => void handleLinkedInImport()}
          disabled={importing}
          className="font-mono text-xs uppercase tracking-widest gap-2 h-8 hidden sm:inline-flex"
        >
          {importing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LinkedInIcon className="w-3.5 h-3.5" />
          )}
          <span className="hidden md:inline">Import</span>
        </Button>
      )}
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
