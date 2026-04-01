declare const locales: readonly ["en", "pt-BR", "es", "it", "zh", "ja", "de"];
type Locale = (typeof locales)[number];
declare const defaultLocale: Locale;

export { type Locale, defaultLocale, locales };
