"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import YouTubeIcon from "@/components/icons/YouTubeIcon";
import { track } from "@/lib/analytics";
import {
  EXPORT_SUCCESS_EVENT,
  YOUTUBE_URL,
  hasShownPrompt,
  markPromptShown,
} from "@/lib/subscribePrompt";

export default function SubscribePromptModal() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("subscribe");

  useEffect(() => {
    function handleExportSuccess() {
      if (hasShownPrompt()) return;
      setOpen(true);
      track("youtube_prompt_shown");
    }
    window.addEventListener(EXPORT_SUCCESS_EVENT, handleExportSuccess);
    return () => {
      window.removeEventListener(EXPORT_SUCCESS_EVENT, handleExportSuccess);
    };
  }, []);

  const handleSubscribe = useCallback(() => {
    window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer");
    markPromptShown("subscribed");
    track("youtube_prompt_subscribed");
    setOpen(false);
  }, []);

  // `via` distinguishes the explicit "Maybe later" button from a soft close
  // (X / backdrop / Esc) so PostHog can break down intent.
  const handleDismiss = useCallback((via: "later" | "close") => {
    markPromptShown("dismissed");
    track("youtube_prompt_dismissed", { via });
    setOpen(false);
  }, []);

  // Treat backdrop click / X / Esc as "dismissed" so we never re-prompt
  // someone who already chose not to subscribe.
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next && open) {
        handleDismiss("close");
      } else {
        setOpen(next);
      }
    },
    [open, handleDismiss],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">{t("title")}</DialogTitle>
          <DialogDescription className="leading-relaxed pt-1">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDismiss("later")}
            className="font-sans text-xs uppercase tracking-widest"
          >
            {t("later")}
          </Button>
          <Button
            size="sm"
            onClick={handleSubscribe}
            className="font-sans text-xs uppercase tracking-widest gap-2"
          >
            <YouTubeIcon className="w-4 h-4" />
            {t("subscribe")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
