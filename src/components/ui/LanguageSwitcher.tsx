"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { code: "en" as const, flag: "\u{1F1FA}\u{1F1F8}", label: "English" },
  { code: "pt-BR" as const, flag: "\u{1F1E7}\u{1F1F7}", label: "Portugu\u00EAs (Brasil)" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  function selectLocale(code: string) {
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Switch language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="uppercase text-xs font-medium">{current.code === "en" ? "EN" : "PT"}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-card border-border min-w-[180px]">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => selectLocale(lang.code)}
            className={`gap-2.5 ${locale === lang.code ? "font-medium bg-surface-strong" : ""}`}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
