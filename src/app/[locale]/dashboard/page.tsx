"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { useResumeStore } from "@/store/useResumeStore";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ResumeGrid from "@/components/dashboard/ResumeGrid";
import CoverLetterGrid from "@/components/dashboard/CoverLetterGrid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "@/i18n/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const resumes = useResumeStore((s) => s.resumes);
  const coverLetters = useCoverLetterStore((s) => s.coverLetters);
  const t = useTranslations("common");
  const td = useTranslations("dashboard");

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

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <Suspense>
          <DashboardHeader />
        </Suspense>

        <Tabs defaultValue="resumes">
          <TabsList variant="line" className="mb-8">
            <TabsTrigger value="resumes" className="font-sans text-sm uppercase tracking-widest">
              {td("resumesTab")}
            </TabsTrigger>
            <TabsTrigger value="cover-letters" className="font-sans text-sm uppercase tracking-widest">
              {td("coverLettersTab")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumes">
            <ResumeGrid resumes={resumes} />
          </TabsContent>

          <TabsContent value="cover-letters">
            <CoverLetterGrid coverLetters={coverLetters} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
