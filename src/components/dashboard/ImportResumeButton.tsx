"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
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

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setImporting(true);
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
          {importing ? "Importing..." : "Import Resume"}
        </span>
        <span className="sm:hidden">{importing ? "..." : "Import"}</span>
      </Button>
    </>
  );
}
