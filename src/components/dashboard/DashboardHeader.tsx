"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Plus, LogOut } from "lucide-react";
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
import { track } from "@/lib/analytics";

export default function DashboardHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const tc = useTranslations("common");
  const createResume = useResumeStore((s) => s.createResume);
  const hasConsumedImportIntent = useRef(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const [, setMobileImporting] = useState(false);

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
        toast.warning(t("scanWarning"));
      }
      const resume = createResume(t("importedResume"), data);
      track("file_imported", { fileType: file.name.split(".").pop() });
      const exp = data.experience?.length ?? 0;
      const edu = data.education?.length ?? 0;
      const skills =
        data.skillGroups?.reduce((n, g) => n + g.skills.length, 0) ?? 0;
      toast.success(
        t("importSuccess", { exp, edu, skills: skills > 0 ? t("skillsSuffix", { count: skills }) : "" }),
      );
      router.push(`/editor/${resume.id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t("parseFailed"),
      );
    } finally {
      setMobileImporting(false);
    }
  }

  function handleTemplateSelect(templateId: string) {
    setPickerOpen(false);
    track("template_selected", { templateId });
    if (templateId === "blank") {
      const resume = createResume();
      router.push(`/editor/${resume.id}`);
      return;
    }
    const tmpl = getTemplate(templateId);
    const resume = createResume(
      tmpl?.name ?? t("untitledResume"),
      tmpl?.sampleData,
      templateId,
    );
    router.push(`/editor/${resume.id}`);
  }

  const callbackUrl = locale === "en" ? "/dashboard?intent=import" : `/${locale}/dashboard?intent=import`;

  const handleLinkedInImport = useCallback(
    async (consumeIntent: boolean) => {
      setImportError(null);

      if (status === "loading") return;

      if (!session) {
        await signIn("linkedin", { callbackUrl });
        return;
      }

      setIsImporting(true);
      try {
        const response = await fetch("/api/linkedin/import", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error(t("importError"));
        }

        const result = (await response.json()) as LinkedInImportResponse;
        if (!result.data) {
          throw new Error(t("importNoData"));
        }

        const importedResume = createResume(t("importedResume"), result.data);
        track("linkedin_import");
        router.push(`/editor/${importedResume.id}`);
      } catch (error) {
        setImportError(
          error instanceof Error ? error.message : t("importFailed"),
        );
        if (consumeIntent) {
          router.replace("/dashboard");
        }
      } finally {
        setIsImporting(false);
      }
    },
    [createResume, router, session, status, callbackUrl, t],
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
          {t("portfolioOverview")}
        </p>
        <h1
          className="font-sans font-bold text-foreground"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-sm">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={mobileFileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleMobileFileImport}
          className="hidden"
        />

        <Button
          size="sm"
          onClick={() => setPickerOpen(true)}
          className="hidden sm:inline-flex bg-foreground text-background hover:bg-foreground/90 font-sans text-xs uppercase tracking-widest gap-2"
        >
          <Plus className="w-4 h-4" />
          {t("createNew")}
        </Button>

        <div className="hidden sm:flex">
          <ImportResumeButton />
        </div>

        {session ? (
          <>
            <div className="flex flex-col items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={(props) => (
                      <Button
                        {...props}
                        size="sm"
                        variant="outline"
                        disabled={isImporting}
                        onClick={() => void handleLinkedInImport(false)}
                        className="font-sans text-xs uppercase tracking-widest gap-2"
                      >
                        <LinkedInIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          {isImporting ? tc("importing") : t("importFromLinkedIn")}
                        </span>
                        <span className="sm:hidden">
                          {isImporting ? "..." : t("importFromLinkedIn")}
                        </span>
                      </Button>
                    )}
                  />
                  <TooltipContent>{tc("linkedInTooltip")}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-[10px] text-muted-foreground font-sans mt-1">{tc("linkedInLimited")}</span>
            </div>

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
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-destructive focus:text-destructive gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={(props) => (
                    <Button
                      {...props}
                      size="sm"
                      variant="outline"
                      onClick={() => signIn("linkedin", { callbackUrl })}
                      className="font-sans text-xs uppercase tracking-widest gap-2"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                      {t("signInLinkedIn")}
                    </Button>
                  )}
                />
                <TooltipContent>{tc("linkedInTooltip")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-[10px] text-muted-foreground font-sans mt-1">{tc("linkedInLimited")}</span>
          </div>
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
