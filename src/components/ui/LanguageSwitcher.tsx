"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

const LANGUAGES = [
  { code: "en" as const, flag: "\u{1F1FA}\u{1F1F8}", label: "English" },
  { code: "pt-BR" as const, flag: "\u{1F1E7}\u{1F1F7}", label: "Portugu\u00EAs (Brasil)" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  function selectLocale(code: string) {
    setOpen(false);
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Switch language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="uppercase text-xs font-medium">{current.code === "en" ? "EN" : "PT"}</span>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner sideOffset={6} align="end">
          <PopoverPrimitive.Popup className="z-50 bg-card border border-border rounded-lg shadow-lg p-1 min-w-[180px]">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLocale(lang.code)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  locale === lang.code
                    ? "bg-surface-strong text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-soft"
                }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
