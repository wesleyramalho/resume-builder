import { NextRequest, NextResponse } from "next/server";
import { generateResumePDF } from "@/lib/pdf";
import { Resume } from "@/types/resume";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const encoded = searchParams.get("data");

  if (!encoded) {
    return NextResponse.json({ error: "Missing data parameter" }, { status: 400 });
  }

  let resume: Resume;
  try {
    const json = decodeURIComponent(atob(encoded));
    resume = JSON.parse(json) as Resume;
  } catch {
    return NextResponse.json({ error: "Invalid data parameter" }, { status: 400 });
  }

  const buffer = await generateResumePDF(resume);
  const uint8 = new Uint8Array(buffer);

  return new NextResponse(uint8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(resume.name)}.pdf"`,
      "Content-Length": buffer.length.toString(),
    },
  });
}
