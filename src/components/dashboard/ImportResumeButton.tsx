"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { importResumeFromFile } from "@/lib/resumeImport";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ImportResumeButton() {
  const router = useRouter();
  const createResume = useResumeStore((s) => s.createResume);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const t = useTranslations("dashboard");
  const tc = useTranslations("common");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setImporting(true);
    try {
      const { data, textLength } = await importResumeFromFile(file);

      if (textLength < 50) {
        toast.warning(t("scanWarning"));
      }

      const resume = createResume("Imported Resume", data);

      const exp = data.experience?.length ?? 0;
      const edu = data.education?.length ?? 0;
      const skills =
        data.skillGroups?.reduce((n, g) => n + g.skills.length, 0) ?? 0;
      toast.success(
        t("importSuccess", { exp, edu, skills: skills > 0 ? `, ${skills} skills` : "" }),
      );

      router.push(`/editor/${resume.id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t("parseFailed"),
      );
    } finally {
      setImporting(false);
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc"
        onChange={handleFile}
        className="hidden"
      />
      <Button
        size="sm"
        variant="outline"
        disabled={importing}
        onClick={() => fileInputRef.current?.click()}
        className="font-sans text-xs uppercase tracking-widest gap-1.5"
      >
        {importing ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Upload />
        )}
        <span className="hidden sm:inline">
          {importing ? tc("importing") : t("importResume")}
        </span>
        <span className="sm:hidden">{importing ? "..." : tc("import")}</span>
      </Button>
    </>
  );
}
