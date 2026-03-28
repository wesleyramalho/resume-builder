import { renderToBuffer } from "@react-pdf/renderer";
import ResumePDFDocument from "@/components/pdf/ResumePDFDocument";
import { Resume } from "@/types/resume";
import React from "react";

export async function generateResumePDF(resume: Resume, locale: string = "en"): Promise<Buffer> {
  const element = React.createElement(ResumePDFDocument, {
    resume,
    locale,
  }) as unknown as React.ReactElement<
    import("@react-pdf/renderer").DocumentProps
  >;
  const buffer = await renderToBuffer(element);
  return Buffer.from(buffer);
}
