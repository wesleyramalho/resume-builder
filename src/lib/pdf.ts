import { renderToBuffer } from "@react-pdf/renderer";
import ResumePDFDocument from "@/components/pdf/ResumePDFDocument";
import { Resume } from "@/types/resume";
import React from "react";

export async function generateResumePDF(resume: Resume): Promise<Buffer> {
  // Cast via unknown to satisfy @react-pdf/renderer's strict DocumentProps expectation
  const element = React.createElement(ResumePDFDocument, {
    resume,
  }) as unknown as React.ReactElement<
    import("@react-pdf/renderer").DocumentProps
  >;
  const buffer = await renderToBuffer(element);
  return Buffer.from(buffer);
}
