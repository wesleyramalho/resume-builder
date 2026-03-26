"use client";

import { Suspense } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ResumeGrid from "@/components/dashboard/ResumeGrid";
// import CareerInsights from "@/components/dashboard/CareerInsights";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const resumes = useResumeStore((s) => s.resumes);

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar */}
      <nav className="border-b border-border px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-40 bg-background/90 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-sans text-sm font-bold uppercase tracking-widest text-foreground"
          >
            MyPDFCV
          </Link>

          <Link
            href="/dashboard"
            className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Dashboard
          </Link>
        </div>
        <ThemeToggle />
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <Suspense>
          <DashboardHeader />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div>
            <ResumeGrid resumes={resumes} />
          </div>
          {/* <aside>
            <CareerInsights resumes={resumes} />
          </aside> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
