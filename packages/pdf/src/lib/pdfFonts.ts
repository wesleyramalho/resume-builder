import { Font } from "@react-pdf/renderer";
import path from "path";

const DEVANAGARI_FONT = "NotoSansDevanagari";
const DEFAULT_FONT = "Helvetica";

// Resolve font paths relative to the package root (fonts/ directory)
const fontsDir = path.resolve(__dirname, "../../fonts");

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
