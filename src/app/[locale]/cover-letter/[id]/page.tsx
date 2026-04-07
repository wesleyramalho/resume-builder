"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ id: string }>;
}

export default function CoverLetterEditorPage({ params }: Props) {
  const { id } = use(params);
  const coverLetter = useCoverLetterStore((s) =>
    s.coverLetters.find((cl) => cl.id === id),
  );
  const t = useTranslations("common");

  if (!coverLetter) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 md:px-12 py-4 flex items-center gap-4 sticky top-0 z-40 bg-background/90 backdrop-blur-md">
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="font-sans text-sm font-medium text-foreground truncate">
          {coverLetter.name}
        </h1>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h2
            className="font-sans font-bold text-foreground mb-3"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
          >
            {coverLetter.name}
          </h2>
        </div>
      </div>

      <Footer />
    </div>
  );
}
