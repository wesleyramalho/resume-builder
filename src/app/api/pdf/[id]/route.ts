import { NextRequest, NextResponse } from "next/server";
import { generateResumePDF } from "@/lib/pdf";
import { Resume } from "@/types/resume";

export async function POST(req: NextRequest) {
  let resume: Resume;
  let locale: string = "en";
  try {
    const body = await req.json();
    // Support both { ...resume } and { resume, locale } shapes
    if (body.data && body.id) {
      resume = body as Resume;
      locale = body.locale ?? "en";
    } else {
      resume = body as Resume;
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  let buffer: Buffer;
  try {
    buffer = await generateResumePDF(resume, locale);
  } catch (err) {
    console.error("[pdf] generation error:", err);
    const message = process.env.NODE_ENV === "development" ? String(err) : "PDF rendering failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
  const uint8 = new Uint8Array(buffer);

  return new NextResponse(uint8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(resume.name)}.pdf"`,
      "Content-Length": buffer.length.toString(),
    },
  });
}
