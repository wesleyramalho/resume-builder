import { NextRequest, NextResponse } from "next/server";
import { generateCoverLetterPDF } from "@/lib/pdf";
import { CoverLetter } from "@/types/coverLetter";

export async function POST(req: NextRequest) {
  let coverLetter: CoverLetter;
  let locale: string = "en";
  try {
    const body = await req.json();
    locale = body.locale ?? "en";
    coverLetter = body as CoverLetter;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  let buffer: Buffer;
  try {
    buffer = await generateCoverLetterPDF(coverLetter, locale);
  } catch (err) {
    console.error("[cover-letter-pdf] generation error:", err);
    const message = process.env.NODE_ENV === "development" ? String(err) : "PDF rendering failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
  const uint8 = new Uint8Array(buffer);

  return new NextResponse(uint8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(coverLetter.name)}.pdf"`,
      "Content-Length": buffer.length.toString(),
    },
  });
}
