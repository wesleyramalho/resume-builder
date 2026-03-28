"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <h1
        className="font-sans font-bold text-foreground tracking-tight"
        style={{ fontSize: "clamp(6rem, 15vw, 12rem)" }}
      >
        {t("title")}
      </h1>
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {t("subtitle")}
      </p>
      <p className="text-muted-foreground max-w-sm mb-8">
        {t("description")}
      </p>
      <Link href="/dashboard" className={buttonVariants({ className: "bg-foreground text-background hover:bg-foreground/90 font-sans text-xs uppercase tracking-widest" })}>
        {t("goToDashboard")}
      </Link>
    </div>
  );
}
