"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function SiteNav() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-12 py-4 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="font-sans text-sm font-bold uppercase tracking-widest text-foreground"
        >
          {t("appName")}
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <Button
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="bg-foreground text-background hover:bg-foreground/90 font-sans text-xs uppercase tracking-widest"
        >
          <span className="sm:hidden">{session ? t("resumes") : t("start")}</span>
          <span className="hidden sm:inline">{session ? t("myResumes") : t("buildYourResume")}</span>
        </Button>
      </div>
    </nav>
  );
}
