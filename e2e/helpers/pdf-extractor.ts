import fs from "fs";
import type { Download } from "@playwright/test";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

/**
 * Extracts all text content from a Playwright Download object (PDF).
 */
export async function extractTextFromDownload(
  download: Download,
): Promise<string> {
  const filePath = await download.path();
  if (!filePath) throw new Error("Download has no file path");
  const buffer = fs.readFileSync(filePath);
  const result = await pdfParse(buffer);
  return result.text as string;
}

/**
 * Normalizes text for fuzzy comparison: collapses whitespace and lowercases.
 */
export function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}
