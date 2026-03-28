"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, FileDown, Copy, Trash2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Resume } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { useExportPDF } from "@/hooks/useExportPDF";
import { formatDate } from "@/lib/utils";
import ResumeThumbnail from "./ResumeThumbnail";

interface Props {
  resume: Resume;
}

export default function ResumeCard({ resume }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const tc = useTranslations("common");
  const [showDelete, setShowDelete] = useState(false);
  const deleteResume = useResumeStore((s) => s.deleteResume);
  const duplicateResume = useResumeStore((s) => s.duplicateResume);
  const { exportPDF, exporting } = useExportPDF();

  function handleEdit() {
    router.push(`/editor/${resume.id}`);
  }

  function handleDuplicate() {
    duplicateResume(resume.id);
  }

  function handleDelete() {
    deleteResume(resume.id);
    setShowDelete(false);
  }

  return (
    <>
      <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-brand-secondary/50 transition-colors shadow-sm">
        <div className="relative p-3 bg-surface-soft/70 cursor-pointer" onClick={handleEdit}>
          <ResumeThumbnail data={resume.data} templateId={resume.templateId} />
          {resume.status === "draft" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-sans text-[10px] uppercase tracking-widest text-amber-400">
                  {t("drafting")}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="font-sans font-semibold text-sm text-foreground truncate cursor-pointer hover:text-foreground/80 transition-colors"
              onClick={handleEdit}
            >
              {resume.name}
            </h3>
            <Badge
              variant={resume.status === "complete" ? "default" : "secondary"}
              className={`text-[10px] font-sans uppercase tracking-widest flex-shrink-0 ${
                resume.status === "complete"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20"
              }`}
            >
              {resume.status}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground font-sans mb-3">
            {resume.status === "draft" ? t("created") : t("lastEdited")}{" "}
            {formatDate(resume.updatedAt, locale)}
          </p>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleEdit}
              className="flex-1 font-sans text-xs uppercase tracking-widest h-8"
            >
              {resume.status === "draft" ? t("continueDrafting") : tc("edit")}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="h-9 w-9 sm:h-8 sm:w-8 border border-border hover:bg-muted rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem onClick={handleEdit} className="gap-2">
                  <Pencil className="w-4 h-4" />
                  {tc("edit")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => exportPDF(resume)}
                  disabled={exporting}
                  className="gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  {t("exportPdf")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate} className="gap-2">
                  <Copy className="w-4 h-4" />
                  {t("duplicate")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDelete(true)}
                  className="gap-2 text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  {tc("delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>{t("deleteResume")}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t("deleteConfirmation", { name: resume.name })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDelete(false)}>
              {tc("cancel")}
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {tc("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
