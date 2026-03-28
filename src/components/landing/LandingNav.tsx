"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import LinkedInIcon from "@/components/icons/LinkedInIcon";

const LINKEDIN_OAUTH_ENABLED =
  process.env.NEXT_PUBLIC_LINKEDIN_OAUTH_ENABLED === "true";

export default function LandingNav() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations("landing");
  const tc = useTranslations("common");
  const [linkedInError, setLinkedInError] = useState<string | null>(null);

  async function handleLinkedInImport() {
    setLinkedInError(null);

    if (!LINKEDIN_OAUTH_ENABLED) {
      setLinkedInError(t("linkedInNotConfigured"));
      return;
    }

    try {
      await signIn("linkedin", { callbackUrl: "/dashboard?intent=import" });
    } catch {
      setLinkedInError(t("linkedInUnavailable"));
    }
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-12 py-4 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="font-sans text-sm font-bold uppercase tracking-widest text-foreground"
        >
          {tc("appName")}
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        {!session && LINKEDIN_OAUTH_ENABLED && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => void handleLinkedInImport()}
            className="hidden md:flex font-sans text-xs uppercase tracking-widest gap-2"
          >
            <LinkedInIcon className="w-4 h-4" />
            {t("startWithLinkedIn")}
          </Button>
        )}
        <Button
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="bg-foreground text-background hover:bg-foreground/90 font-sans text-xs uppercase tracking-widest"
        >
          <span className="sm:hidden">{session ? tc("resumes") : tc("start")}</span>
          <span className="hidden sm:inline">{session ? tc("myResumes") : tc("buildYourResume")}</span>
        </Button>
      </div>

      {linkedInError ? (
        <p className="absolute top-full right-6 mt-2 text-[10px] text-destructive font-sans uppercase tracking-wider">
          {linkedInError}
        </p>
      ) : null}
    </nav>
  );
}
