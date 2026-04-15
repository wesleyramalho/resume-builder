import { Font } from "@react-pdf/renderer";
import path from "path";

const DEVANAGARI_FONT = "NotoSansDevanagari";
const DEFAULT_FONT = "Helvetica";

// Resolve fonts from the workspace package directory
// process.cwd() is the Next.js project root; fonts are in packages/pdf/fonts/
const fontsDir = path.resolve(process.cwd(), "packages/pdf/fonts");

Font.register({
  family: DEVANAGARI_FONT,
  fonts: [
    { src: path.join(fontsDir, "NotoSansDevanagari-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "NotoSansDevanagari-Bold.ttf"), fontWeight: 700 },
  ],
});

// Disable automatic hyphenation so words don't break mid-word
Font.registerHyphenationCallback((word) => [word]);

/** Returns the appropriate font family for a given locale */
export function getPdfFont(locale: string): string {
  if (locale === "hi") return DEVANAGARI_FONT;
  return DEFAULT_FONT;
}
