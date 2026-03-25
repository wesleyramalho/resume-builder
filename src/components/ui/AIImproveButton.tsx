"use client";

import { useState } from "react";
import { Sparkles, Loader2, Check, X } from "lucide-react";
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

  // Downloading state label
  const isDownloading = status === "loading" && modelStatus === "downloading";

  return (
    <div className="flex flex-col gap-2">
      {/* Trigger button */}
      <button
        type="button"
        disabled={disabled || status === "loading"}
        onClick={handleImprove}
        className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            {isDownloading
              ? `Downloading model… ${downloadProgress}%`
              : "Improving…"}
          </>
        ) : (
          <>
            <Sparkles className="w-3 h-3" />
            Improve
          </>
        )}
      </button>

      {/* Error message */}
      {status === "error" && errorMsg && (
        <p className="text-[10px] text-destructive font-mono">{errorMsg}</p>
      )}

      {/* Suggestion panel */}
      {status === "suggestion" && suggestion && (
        <div className="rounded-md border border-brand-secondary/30 bg-brand-secondary/5 p-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
            AI Suggestion
          </p>
          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
            {suggestion}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={handleAccept}
              className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-brand-secondary hover:text-foreground transition-colors"
            >
              <Check className="w-3 h-3" />
              Accept
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
              Dismiss
            </button>
          </div>
          <p className="text-[9px] text-muted-foreground/60 mt-2 leading-relaxed">
            Powered by open-source AI (Flan-T5, Apache 2.0). Suggestions may be inaccurate — always review before using.
          </p>
        </div>
      )}
    </div>
  );
}
