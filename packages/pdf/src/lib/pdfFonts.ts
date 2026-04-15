import { Font } from "@react-pdf/renderer";

const DEVANAGARI_FONT = "NotoSansDevanagari";
const DEFAULT_FONT = "Helvetica";

let devanagariRegistered = false;

function registerDevanagari() {
  if (devanagariRegistered) return;
  devanagariRegistered = true;
  Font.register({
    family: DEVANAGARI_FONT,
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf",
        fontWeight: 400,
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Bold.ttf",
        fontWeight: 700,
      },
    ],
  });
}

// Disable automatic hyphenation so words don't break mid-word
Font.registerHyphenationCallback((word) => [word]);

/** Returns the appropriate font family for a given locale */
export function getPdfFont(locale: string): string {
  if (locale === "hi") {
    registerDevanagari();
    return DEVANAGARI_FONT;
  }
  return DEFAULT_FONT;
}
