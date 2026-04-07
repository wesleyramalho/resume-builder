"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Pencil, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import CoverLetterToolbar from "@/components/cover-letter-editor/CoverLetterToolbar";
import SenderInfoSection from "@/components/cover-letter-editor/sections/SenderInfoSection";
import RecipientSection from "@/components/cover-letter-editor/sections/RecipientSection";
import LetterContentSection from "@/components/cover-letter-editor/sections/LetterContentSection";
import ResumeLinkSection from "@/components/cover-letter-editor/sections/ResumeLinkSection";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ id: string }>;
}

export default function CoverLetterEditorPage({ params }: Props) {
  const { id } = use(params);
  const coverLetter = useCoverLetterStore((s) =>
    s.coverLetters.find((cl) => cl.id === id),
  );
  const t = useTranslations("editor");

  if (!coverLetter) {
    notFound();
  }

  const data = coverLetter.data;

  const formContent = (
    <div className="space-y-8">
      <ResumeLinkSection coverLetterId={id} data={data} />
      <div className="h-px bg-border" />
      <SenderInfoSection coverLetterId={id} data={data} />
      <div className="h-px bg-border" />
      <RecipientSection coverLetterId={id} data={data} />
      <div className="h-px bg-border" />
      <LetterContentSection coverLetterId={id} data={data} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CoverLetterToolbar coverLetter={coverLetter} />

      {/* Desktop: two-column layout */}
      <div
        className="hidden lg:grid flex-1"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* Left: form */}
        <div className="border-r border-border flex flex-col overflow-hidden bg-card">
          <ScrollArea className="flex-1">
            <div className="px-6 py-6">{formContent}</div>
          </ScrollArea>
        </div>

        {/* Right: preview placeholder */}
        <div className="flex flex-col overflow-hidden sticky top-0 h-screen">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2 bg-card">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
            <p className="font-sans text-[10px] uppercase tracking-widest text-text-subtle">
              {t("livePreviewRendering")}
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center text-muted-foreground/30">
            <p className="font-sans text-xs uppercase tracking-widest">
              PDF Preview
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: tabs */}
      <div className="lg:hidden flex-1">
        <Tabs defaultValue="edit" className="h-full flex flex-col">
          <TabsList className="rounded-none border-b border-border bg-background w-full h-12 p-0 gap-0 sticky top-0 z-20">
            <TabsTrigger
              value="edit"
              className="flex-1 flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest rounded-none h-full text-muted-foreground transition-colors data-[state=active]:text-foreground data-[state=active]:tab-glow-border"
            >
              <Pencil className="w-3.5 h-3.5" />
              {t("tabEdit")}
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex-1 flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest rounded-none h-full text-muted-foreground transition-colors data-[state=active]:text-foreground data-[state=active]:tab-glow-border"
            >
              <Eye className="w-3.5 h-3.5" />
              {t("tabPreview")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="flex-1 overflow-auto mt-0">
            <div className="px-3 py-4 sm:px-4">{formContent}</div>
          </TabsContent>
          <TabsContent
            value="preview"
            className="flex-1 overflow-hidden mt-0 h-full flex items-center justify-center text-muted-foreground/30"
          >
            <p className="font-sans text-xs uppercase tracking-widest">
              PDF Preview
            </p>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
