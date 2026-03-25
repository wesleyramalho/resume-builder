"use client";

import { useState } from "react";
import { Resume } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";

interface PDFErrorResponse {
  error?: string;
}

export function useExportPDF() {
  const [exporting, setExporting] = useState(false);
  const incrementExportCount = useResumeStore((s) => s.incrementExportCount);

  async function exportPDF(resume: Resume) {
    setExporting(true);
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(resume)));
      const res = await fetch(
        `/api/pdf/${resume.id}?data=${encodeURIComponent(encoded)}`,
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as PDFErrorResponse;
        throw new Error(body.error ?? `PDF generation failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resume.name.replace(/\s+/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      incrementExportCount(resume.id);
    } catch (err) {
      console.error("Export PDF error:", err);
    } finally {
      setExporting(false);
    }
  }

  return { exportPDF, exporting };
}
