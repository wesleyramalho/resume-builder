"use client";

import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/useResumeStore";
import { importResumeFromFile } from "@/lib/resumeImport";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  resumeId: string;
}

export default function ImportResumeIntoButton({ resumeId }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
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

      updateResume(resumeId, data);

      const exp = data.experience?.length ?? 0;
      const edu = data.education?.length ?? 0;
      toast.success(`Imported: ${exp} experience, ${edu} education entries`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to parse resume.",
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={(props) => (
              <Button
                {...props}
                variant="outline"
                size="sm"
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
                  {importing ? "Importing..." : "Import"}
                </span>
              </Button>
            )}
          />
          <TooltipContent>
            Import from a PDF or Word document
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
