"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import GitHubIcon from "@/components/icons/GitHubIcon";

export default function Footer() {
  const t = useTranslations("footer");

  const LEGAL_LINKS = [
    { href: "/privacy" as const, label: t("privacyPolicy") },
    { href: "/terms" as const, label: t("termsOfService") },
    { href: "/cookies" as const, label: t("cookiePolicy") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <footer className="border-t border-border px-6 md:px-12 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a
          href="https://wesleyramalho.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pixel-me.svg"
            alt="Wesley Ramalho"
            width={28}
            height={28}
            className="rounded bg-black"
          />
          {t("createdBy")}
        </a>

        <nav className="grid grid-cols-2 gap-x-4 gap-y-2 justify-items-center md:flex md:items-center md:gap-4">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-center"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/wesleyramalho/resume-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-center inline-flex items-center gap-1"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            {t("openSource")}
          </a>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto mt-4">
        <p className="text-[10px] text-muted-foreground/60 text-center md:text-left">
          &copy; {new Date().getFullYear()} {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
