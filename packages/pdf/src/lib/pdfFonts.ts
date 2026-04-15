import { Font } from "@react-pdf/renderer";

const DEFAULT_FONT = "Helvetica";

interface FontDef {
  family: string;
  regular: string;
  bold: string;
}

const NOTO_BASE = "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf";
const CJK_BASE = "https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF";

const LOCALE_FONTS: Record<string, FontDef> = {
  hi: {
    family: "NotoSansDevanagari",
    regular: `${NOTO_BASE}/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf`,
    bold: `${NOTO_BASE}/NotoSansDevanagari/NotoSansDevanagari-Bold.ttf`,
  },
  zh: {
    family: "NotoSansCJKsc",
    regular: `${CJK_BASE}/SimplifiedChinese/NotoSansCJKsc-Regular.otf`,
    bold: `${CJK_BASE}/SimplifiedChinese/NotoSansCJKsc-Bold.otf`,
  },
  ja: {
    family: "NotoSansCJKjp",
    regular: `${CJK_BASE}/Japanese/NotoSansCJKjp-Regular.otf`,
    bold: `${CJK_BASE}/Japanese/NotoSansCJKjp-Bold.otf`,
  },
};

const registeredFonts = new Set<string>();

function registerFont(def: FontDef) {
  if (registeredFonts.has(def.family)) return;
  registeredFonts.add(def.family);
  Font.register({
    family: def.family,
    fonts: [
      { src: def.regular, fontWeight: 400 },
      { src: def.regular, fontWeight: 400, fontStyle: "italic" },
      { src: def.bold, fontWeight: 700 },
      { src: def.bold, fontWeight: 700, fontStyle: "italic" },
    ],
  });
}

// Disable automatic hyphenation so words don't break mid-word
Font.registerHyphenationCallback((word) => [word]);

/** Returns the appropriate font family for a given locale, registering it if needed */
export function getPdfFont(locale: string): string {
  const def = LOCALE_FONTS[locale];
  if (def) {
    registerFont(def);
    return def.family;
  }
  return DEFAULT_FONT;
}
