"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import {
  FileDown,
  ArrowLeft,
  Check,
  Loader2,
  Palette,
  MoreVertical,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Resume, ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { useResumeAutoSave } from "@/hooks/useResumeAutoSave";
import { useExportPDF } from "@/hooks/useExportPDF";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTemplate } from "@/lib/resumeTemplates";
import ThemeToggle from "@/components/ui/ThemeToggle";
import TemplatePicker from "@/components/dashboard/TemplatePicker";
import ImportResumeIntoButton from "@/components/editor/ImportResumeIntoButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { importResumeFromFile } from "@/lib/resumeImport";

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
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const [mobileImporting, setMobileImporting] = useState(false);

  const currentTemplate = resume.templateId
    ? getTemplate(resume.templateId)
    : null;

  function handleTemplateSelect(templateId: string) {
    setTemplatePickerOpen(false);
    if (templateId !== "blank") {
      updateTemplateId(resume.id, templateId);
    }
  }

  async function handleMobileFileImport(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setMobileImporting(true);
    try {
      const { data, textLength } = await importResumeFromFile(file);
      if (textLength < 50) {
        toast.warning(
          "Very little text was extracted. The file may be a scanned document.",
        );
      }
      updateResume(resume.id, data);
      const exp = data.experience?.length ?? 0;
      const edu = data.education?.length ?? 0;
      toast.success(`Imported: ${exp} experience, ${edu} education entries`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to parse resume.",
      );
    } finally {
      setMobileImporting(false);
    }
  }

  const handleLinkedInImport = useCallback(async () => {
    if (!session) {
      await signIn("linkedin", {
        callbackUrl: `/editor/${resume.id}?intent=import`,
      });
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
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-30">
      {/* Hidden file input for mobile dropdown import */}
      <input
        ref={mobileFileInputRef}
        type="file"
        accept=".pdf,.docx,.doc"
        onChange={handleMobileFileImport}
        className="hidden"
      />

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
        className="flex-1 min-w-0 bg-transparent text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none"
        placeholder="Resume Name"
        aria-label="Resume name"
      />

      {/* Template switcher (desktop only) */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => setTemplatePickerOpen(true)}
        className="font-sans text-xs uppercase tracking-widest gap-1.5 shrink-0"
      >
        <Palette />
        <span className="hidden sm:inline">
          {currentTemplate?.name ?? "Default"}
        </span>
      </Button>
      <TemplatePicker
        open={templatePickerOpen}
        onOpenChange={setTemplatePickerOpen}
        onSelect={handleTemplateSelect}
      />

      {/* Save status (desktop only) */}
      <div className="hidden sm:flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest text-muted-foreground">
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

      {/* Import file button (desktop only) */}
      <div className="hidden sm:flex">
        <ImportResumeIntoButton resumeId={resume.id} />
      </div>

      {/* LinkedIn button (desktop only) */}
      {!resume.data.linkedInImported && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => void handleLinkedInImport()}
          disabled={importing}
          className="font-sans text-xs uppercase tracking-widest gap-2 hidden sm:inline-flex"
        >
          {importing ? (
            <Loader2 className="animate-spin" />
          ) : (
            <LinkedInIcon />
          )}
          <span className="hidden md:inline">Import</span>
        </Button>
      )}

      {/* Mobile action menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="sm:hidden inline-flex items-center justify-center w-7 h-7 rounded-md border border-border bg-surface-soft hover:bg-surface-strong transition-colors shrink-0">
          <MoreVertical className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border">
          <DropdownMenuItem
            onClick={() => setTemplatePickerOpen(true)}
            className="gap-2"
          >
            <Palette className="w-4 h-4" />
            {currentTemplate?.name ?? "Change Template"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => mobileFileInputRef.current?.click()}
            disabled={mobileImporting}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            {mobileImporting ? "Importing..." : "Import File"}
          </DropdownMenuItem>
          {!resume.data.linkedInImported && (
            <DropdownMenuItem
              onClick={() => void handleLinkedInImport()}
              disabled={importing}
              className="gap-2"
            >
              <LinkedInIcon className="w-4 h-4" />
              {importing ? "Importing..." : "Start with LinkedIn"}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export PDF (always visible) */}
      <Button
        size="sm"
        onClick={() => exportPDF(resume)}
        disabled={exporting}
        className="font-sans text-xs uppercase tracking-widest gap-2"
      >
        {exporting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <FileDown />
        )}
        <span className="hidden sm:inline">Export PDF</span>
        <span className="sm:hidden">Export</span>
      </Button>
      <ThemeToggle />
    </div>
  );
}
