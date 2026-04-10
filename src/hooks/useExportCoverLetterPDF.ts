"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { CoverLetter } from "@/types/coverLetter";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { track } from "@/lib/analytics";

interface PDFErrorResponse {
  error?: string;
}

export function useExportCoverLetterPDF() {
  const [exporting, setExporting] = useState(false);
  const incrementExportCount = useCoverLetterStore((s) => s.incrementExportCount);
  const locale = useLocale();

  async function exportPDF(coverLetter: CoverLetter) {
    setExporting(true);
    try {
      const res = await fetch(`/api/cover-letter-pdf/${coverLetter.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...coverLetter, locale }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as PDFErrorResponse;
        throw new Error(body.error ?? `PDF generation failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${coverLetter.name.replace(/\s+/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      incrementExportCount(coverLetter.id);
      track("cover_letter_pdf_exported", { templateId: coverLetter.templateId, locale });
    } catch (err) {
      console.error("Export Cover Letter PDF error:", err);
    } finally {
      setExporting(false);
    }
  }

  return { exportPDF, exporting };
}
