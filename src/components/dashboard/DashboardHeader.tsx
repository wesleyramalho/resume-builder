"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, LogOut } from "lucide-react";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useResumeStore } from "@/store/useResumeStore";
import type { ResumeData } from "@/types/resume";

interface LinkedInImportResponse {
  data?: Partial<ResumeData>;
}
import TemplatePicker from "@/components/dashboard/TemplatePicker";
import { getTemplate } from "@/lib/resumeTemplates";

export default function DashboardHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const createResume = useResumeStore((s) => s.createResume);
  const hasConsumedImportIntent = useRef(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  function handleTemplateSelect(templateId: string) {
    setPickerOpen(false);
    if (templateId === "blank") {
      const resume = createResume();
      router.push(`/editor/${resume.id}`);
      return;
    }
    const tmpl = getTemplate(templateId);
    const resume = createResume(tmpl?.name ?? "Untitled Resume", tmpl?.sampleData, templateId);
    router.push(`/editor/${resume.id}`);
  }

  const handleLinkedInImport = useCallback(async (consumeIntent: boolean) => {
    setImportError(null);

    if (status === "loading") return;

    if (!session) {
      await signIn("linkedin", { callbackUrl: "/dashboard?intent=import" });
      return;
    }

    setIsImporting(true);
    try {
      const response = await fetch("/api/linkedin/import", { method: "POST" });
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
      setImportError(error instanceof Error ? error.message : "Import failed.");
      if (consumeIntent) {
        router.replace("/dashboard");
      }
    } finally {
      setIsImporting(false);
    }
  }, [createResume, router, session, status]);

  useEffect(() => {
    const intent = searchParams.get("intent");
    if (intent !== "import" || hasConsumedImportIntent.current) return;
    if (status === "loading") return;
    hasConsumedImportIntent.current = true;
    void handleLinkedInImport(true);
  }, [handleLinkedInImport, searchParams, status]);

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "?";

  return (
    <header className="relative flex items-start justify-between mb-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-subtle mb-2">
          Portfolio Overview
        </p>
        <h1 className="font-sans font-bold text-foreground" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          My Resumes
        </h1>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Manage your career blueprints. Each version is optimized for authority and
          editorial precision.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <Button
          onClick={() => setPickerOpen(true)}
          className="bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase tracking-widest gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Resume
        </Button>

        {session ? (
          <>
            <Button
              variant="outline"
              disabled={isImporting}
              onClick={() => void handleLinkedInImport(false)}
              className="font-mono text-xs uppercase tracking-widest gap-2"
            >
              <LinkedInIcon className="w-4 h-4" />
              {isImporting ? "Importing..." : "Import from LinkedIn"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="w-9 h-9 rounded-full bg-surface-soft border border-border flex items-center justify-center font-mono text-xs font-bold text-foreground hover:bg-surface-strong transition-colors overflow-hidden"
              >
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
              <DropdownMenuContent align="end" className="bg-card border-border">
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
            onClick={() => signIn("linkedin", { callbackUrl: "/dashboard?intent=import" })}
            className="font-mono text-xs uppercase tracking-widest gap-2"
          >
            <LinkedInIcon className="w-4 h-4" />
            Sign In with LinkedIn
          </Button>
        )}
      </div>
      {importError ? (
        <p className="absolute -bottom-6 right-0 text-xs text-destructive font-mono">{importError}</p>
      ) : null}

      <TemplatePicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={handleTemplateSelect}
      />
    </header>
  );
}
