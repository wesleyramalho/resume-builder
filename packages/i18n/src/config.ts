export const locales = ["en", "pt-BR", "es", "it", "zh", "ja", "de", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
