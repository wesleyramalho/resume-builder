"use client";

import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";
import { useResumeStore } from "@/store/useResumeStore";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ResumeGrid from "@/components/dashboard/ResumeGrid";
import CoverLetterGrid from "@/components/dashboard/CoverLetterGrid";
import { Link } from "@/i18n/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const resumes = useResumeStore((s) => s.resumes);
  const coverLetters = useCoverLetterStore((s) => s.coverLetters);
  const t = useTranslations("common");
  const td = useTranslations("dashboard");
  const [activeTab, setActiveTab] = useState<"resumes" | "cover-letters">("resumes");

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar */}
      <nav className="border-b border-border px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-40 bg-background/90 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-sans text-sm font-bold uppercase tracking-widest text-foreground"
          >
            {t("appName")}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>

      {/* Sticky tabs bar */}
      <div className="sticky top-14.25 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex gap-1">
          <button
            onClick={() => setActiveTab("resumes")}
            className={`relative font-sans text-sm uppercase tracking-widest px-4 py-3 transition-colors ${
              activeTab === "resumes"
                ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {td("resumesTab")}
          </button>
          <button
            onClick={() => setActiveTab("cover-letters")}
            className={`relative font-sans text-sm uppercase tracking-widest px-4 py-3 transition-colors ${
              activeTab === "cover-letters"
                ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {td("coverLettersTab")}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <Suspense>
          <DashboardHeader activeTab={activeTab} />
        </Suspense>

        {activeTab === "resumes" && <ResumeGrid resumes={resumes} />}
        {activeTab === "cover-letters" && <CoverLetterGrid coverLetters={coverLetters} />}
      </div>
      <Footer />
    </div>
  );
}
