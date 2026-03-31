import fs from "fs";
import type { Download } from "@playwright/test";

/**
 * Extracts all text content from a Playwright Download object (PDF).
 */
export async function extractTextFromDownload(
  download: Download,
): Promise<string> {
  const filePath = await download.path();
  if (!filePath) throw new Error("Download has no file path");
  const buffer = fs.readFileSync(filePath);
  // pdf-parse v1 uses a default export function
  const pdfParse = (await import("pdf-parse")).default;
  const result = await pdfParse(buffer);
  return result.text as string;
}

/**
 * Normalizes text for comparison: collapses whitespace and lowercases.
 * Use for HTML preview text where spacing is reliable.
 */
export function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

/**
 * Normalizes PDF text by stripping ALL whitespace then lowercasing.
 * PDF renderers like @react-pdf add letter-spacing that pdf-parse extracts as
 * spaces between characters (e.g. "a l e x" instead of "alex").
 */
export function normalizePdfText(text: string): string {
  return text.replace(/\s+/g, "").toLowerCase();
}

/**
 * Checks if normalized PDF text contains the expected term (also space-stripped).
 */
export function pdfContains(pdfText: string, term: string): boolean {
  return normalizePdfText(pdfText).includes(normalizePdfText(term));
}
