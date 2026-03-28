"use client";

import { useState } from "react";
import { Sparkles, Loader2, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAIImprove } from "@/hooks/useAIImprove";
import type { FieldType } from "@/types/ai-worker";

interface AIImproveButtonProps {
  text: string;
  fieldType: FieldType;
  onAccept: (improvedText: string) => void;
}

type Status = "idle" | "loading" | "suggestion" | "error";

export default function AIImproveButton({ text, fieldType, onAccept }: AIImproveButtonProps) {
  const { improve, modelStatus, downloadProgress } = useAIImprove();
  const [status, setStatus] = useState<Status>("idle");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const t = useTranslations("ai");

  const disabled = text.trim().length < 10;

  async function handleImprove() {
    setStatus("loading");
    setErrorMsg(null);
    try {
      const result = await improve(text, fieldType);
      setSuggestion(result);
      setStatus("suggestion");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to improve text");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  function handleAccept() {
    if (suggestion) onAccept(suggestion);
    setSuggestion(null);
    setStatus("idle");
  }

  function handleDismiss() {
    setSuggestion(null);
    setStatus("idle");
  }

  const isDownloading = status === "loading" && modelStatus === "downloading";

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={disabled || status === "loading"}
        onClick={handleImprove}
        className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            {isDownloading
              ? t("loadingModel", { progress: downloadProgress })
              : t("improving")}
          </>
        ) : (
          <>
            <Sparkles className="w-3 h-3" />
            {t("improve")}
          </>
        )}
      </button>

      {status === "error" && errorMsg && (
        <p className="text-[10px] text-destructive font-sans">{errorMsg}</p>
      )}

      {status === "suggestion" && suggestion && (
        <div className="rounded-md border border-brand-secondary/30 bg-brand-secondary/5 p-3">
          <p className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground mb-1.5">
            {t("suggestion")}
          </p>
          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
            {suggestion}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={handleAccept}
              className="inline-flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest text-brand-secondary hover:text-foreground transition-colors"
            >
              <Check className="w-3 h-3" />
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="inline-flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
              {t("dismiss")}
            </button>
          </div>
          <p className="text-[9px] text-muted-foreground/60 mt-2 leading-relaxed">
            {t("disclaimer")}
          </p>
        </div>
      )}
    </div>
  );
}
