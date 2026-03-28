"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggle() {
    const next = locale === "en" ? "pt-BR" : "en";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase text-xs font-medium">
        {locale === "en" ? "EN" : "PT"}
      </span>
    </button>
  );
}
