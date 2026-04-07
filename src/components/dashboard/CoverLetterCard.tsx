"use client";

import { useState } from "react";
import { Pencil, Copy, Trash2, FileText } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import MoreMenuTrigger from "@/components/ui/MoreMenuTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CoverLetter } from "@/types/coverLetter";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { formatDate } from "@/lib/utils";

interface Props {
  coverLetter: CoverLetter;
}

export default function CoverLetterCard({ coverLetter }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("coverLetter");
  const tc = useTranslations("common");
  const [showDelete, setShowDelete] = useState(false);
  const deleteCoverLetter = useCoverLetterStore((s) => s.deleteCoverLetter);
  const duplicateCoverLetter = useCoverLetterStore((s) => s.duplicateCoverLetter);

  function handleEdit() {
    router.push(`/cover-letter/${coverLetter.id}`);
  }

  function handleDuplicate() {
    duplicateCoverLetter(coverLetter.id);
  }

  function handleDelete() {
    deleteCoverLetter(coverLetter.id);
    setShowDelete(false);
  }

  const preview = coverLetter.data.bodyParagraphs.find((p) => p.trim());

  return (
    <>
      <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-brand-secondary/50 transition-colors shadow-sm">
        <div
          className="relative p-4 bg-surface-soft/70 cursor-pointer aspect-[3/4] flex flex-col items-center justify-center"
          onClick={handleEdit}
        >
          <FileText className="w-10 h-10 text-muted-foreground/40 mb-3" />
          {preview ? (
            <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-6 text-center px-2">
              {preview}
            </p>
          ) : (
            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
              {t("drafting")}
            </p>
          )}
          {coverLetter.status === "draft" && (
            <div className="absolute top-3 left-3">
              <div className="bg-background/90 backdrop-blur-sm border border-border rounded-full px-2 py-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-sans text-[9px] uppercase tracking-widest text-amber-400">
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
              {coverLetter.name}
            </h3>
            <Badge
              variant={coverLetter.status === "complete" ? "default" : "secondary"}
              className={`text-[10px] font-sans uppercase tracking-widest flex-shrink-0 ${
                coverLetter.status === "complete"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20"
              }`}
            >
              {coverLetter.data.recipient.company || (coverLetter.status === "draft" ? t("drafting") : t("lastEdited"))}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground font-sans mb-3">
            {coverLetter.status === "draft" ? t("created") : t("lastEdited")}{" "}
            {formatDate(coverLetter.updatedAt, locale)}
          </p>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleEdit}
              className="flex-1 font-sans text-xs uppercase tracking-widest h-8"
            >
              {coverLetter.status === "draft" ? t("continueDrafting") : tc("edit")}
            </Button>

            <DropdownMenu>
              <MoreMenuTrigger className="h-9 w-9 sm:h-8 sm:w-8" />
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem onClick={handleEdit} className="gap-2">
                  <Pencil className="w-4 h-4" />
                  {tc("edit")}
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
            <DialogTitle>{t("deleteCoverLetter")}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t("deleteConfirmation", { name: coverLetter.name })}
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
