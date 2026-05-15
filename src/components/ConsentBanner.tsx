"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useConsent } from "@/components/providers/ConsentProvider";

export default function ConsentBanner() {
  const { showBanner, accept, reject } = useConsent();
  const t = useTranslations("consent");

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-lg border border-border bg-card text-card-foreground shadow-lg p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex-1">
            <p className="font-sans font-semibold text-sm text-foreground mb-1">
              {t("title")}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("description")}{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t("privacyLink")}
              </Link>{" "}
              ·{" "}
              <Link
                href="/cookies"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t("cookiesLink")}
              </Link>
            </p>
          </div>
          <div className="flex flex-row gap-2 sm:flex-col sm:gap-2 sm:min-w-32">
            <Button
              size="sm"
              variant="outline"
              onClick={reject}
              className="flex-1 sm:flex-none font-sans text-xs uppercase tracking-widest"
            >
              {t("reject")}
            </Button>
            <Button
              size="sm"
              onClick={accept}
              className="flex-1 sm:flex-none font-sans text-xs uppercase tracking-widest"
            >
              {t("accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
