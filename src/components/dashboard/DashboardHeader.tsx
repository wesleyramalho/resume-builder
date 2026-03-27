"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, LogOut, Upload, MoreVertical } from "lucide-react";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import ImportResumeButton from "@/components/dashboard/ImportResumeButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useResumeStore } from "@/store/useResumeStore";
import type { ResumeData } from "@/types/resume";

interface LinkedInImportResponse {
  data?: Partial<ResumeData>;
}
import TemplatePicker from "@/components/dashboard/TemplatePicker";
import { getTemplate } from "@/lib/resumeTemplates";
import { importResumeFromFile } from "@/lib/resumeImport";
import { toast } from "sonner";

export default function DashboardHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const createResume = useResumeStore((s) => s.createResume);
  const hasConsumedImportIntent = useRef(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const [mobileImporting, setMobileImporting] = useState(false);

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

      const resume = createResume("Imported Resume", data);

      const exp = data.experience?.length ?? 0;
      const edu = data.education?.length ?? 0;
      const skills =
        data.skillGroups?.reduce((n, g) => n + g.skills.length, 0) ?? 0;
      toast.success(
        `Imported: ${exp} experience, ${edu} education${skills > 0 ? `, ${skills} skills` : ""}`,
      );

      router.push(`/editor/${resume.id}`);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to parse resume. Please try a different file.",
      );
    } finally {
      setMobileImporting(false);
    }
  }

  function handleTemplateSelect(templateId: string) {
    setPickerOpen(false);
    if (templateId === "blank") {
      const resume = createResume();
      router.push(`/editor/${resume.id}`);
      return;
    }
    const tmpl = getTemplate(templateId);
    const resume = createResume(
      tmpl?.name ?? "Untitled Resume",
      tmpl?.sampleData,
      templateId,
    );
    router.push(`/editor/${resume.id}`);
  }

  const handleLinkedInImport = useCallback(
    async (consumeIntent: boolean) => {
      setImportError(null);

      if (status === "loading") return;

      if (!session) {
        await signIn("linkedin", { callbackUrl: "/dashboard?intent=import" });
        return;
      }

      setIsImporting(true);
      try {
        const response = await fetch("/api/linkedin/import", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Unable to import your LinkedIn profile right now.");
        }

        const result = (await response.json()) as LinkedInImportResponse;
        if (!result.data) {
          throw new Error("LinkedIn import returned no data.");
        }

        const importedResume = createResume("LinkedIn Resume", result.data);
        router.push(`/editor/${importedResume.id}`);
      } catch (error) {
        setImportError(
          error instanceof Error ? error.message : "Import failed.",
        );
        if (consumeIntent) {
          router.replace("/dashboard");
        }
      } finally {
        setIsImporting(false);
      }
    },
    [createResume, router, session, status],
  );

  useEffect(() => {
    const intent = searchParams.get("intent");
    if (intent !== "import" || hasConsumedImportIntent.current) return;
    if (status === "loading") return;
    hasConsumedImportIntent.current = true;
    void handleLinkedInImport(true);
  }, [handleLinkedInImport, searchParams, status]);

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  return (
    <header className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between mb-12 gap-4">
      <div>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-subtle mb-2">
          Portfolio Overview
        </p>
        <h1
          className="font-sans font-bold text-foreground"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          My Resumes
        </h1>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Manage your career blueprints. Each version is optimized for authority
          and editorial precision.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Hidden file input for mobile dropdown import */}
        <input
          ref={mobileFileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleMobileFileImport}
          className="hidden"
        />

        {/* Desktop buttons (hidden on mobile) */}
        <Button
          onClick={() => setPickerOpen(true)}
          className="hidden sm:inline-flex bg-foreground text-background hover:bg-foreground/90 font-sans text-xs uppercase tracking-widest gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Resume
        </Button>

        <div className="hidden sm:flex">
          <ImportResumeButton />
        </div>

        {session ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger render={(props) => (
                  <Button
                    {...props}
                    variant="outline"
                    disabled={isImporting}
                    onClick={() => void handleLinkedInImport(false)}
                    className="hidden sm:inline-flex font-sans text-xs uppercase tracking-widest gap-2"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                    {isImporting ? "Importing..." : "Start with LinkedIn"}
                  </Button>
                )} />
                <TooltipContent>
                  Imports limited info like your profile photo, name, and headline
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Mobile action menu (visible only on mobile) */}
            <DropdownMenu>
              <DropdownMenuTrigger className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-border bg-surface-soft hover:bg-surface-strong transition-colors">
                <MoreVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-card border-border"
              >
                <DropdownMenuItem
                  onClick={() => setPickerOpen(true)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create New Resume
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => mobileFileInputRef.current?.click()}
                  disabled={mobileImporting}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {mobileImporting ? "Importing..." : "Import Resume"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void handleLinkedInImport(false)}
                  disabled={isImporting}
                  className="gap-2"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  {isImporting ? "Importing..." : "Start with LinkedIn"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User avatar dropdown (always visible) */}
            <DropdownMenu>
              <DropdownMenuTrigger className="w-9 h-9 rounded-full bg-surface-soft border border-border flex items-center justify-center font-sans text-xs font-bold text-foreground hover:bg-surface-strong transition-colors overflow-hidden">
                {session.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initials
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-card border-border"
              >
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-destructive focus:text-destructive gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={() =>
              signIn("linkedin", { callbackUrl: "/dashboard?intent=import" })
            }
            className="font-sans text-xs uppercase tracking-widest gap-2"
          >
            <LinkedInIcon className="w-4 h-4" />
            Sign In with LinkedIn
          </Button>
        )}
      </div>
      {importError ? (
        <p className="absolute -bottom-6 right-0 text-xs text-destructive font-sans">
          {importError}
        </p>
      ) : null}

      <TemplatePicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={handleTemplateSelect}
      />
    </header>
  );
}
