"use client";

import { useResumeStore } from "@/store/useResumeStore";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ResumeGrid from "@/components/dashboard/ResumeGrid";
import CareerInsights from "@/components/dashboard/CareerInsights";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function DashboardPage() {
  const resumes = useResumeStore((s) => s.resumes);

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar */}
      <nav className="border-b border-border px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-40 bg-background/90 backdrop-blur-md">
        <Link href="/" className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
          ArchitectSuite
        </Link>
        <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <Link href="/dashboard" className="text-foreground border-b border-brand-primary pb-0.5">
            Dashboard
          </Link>
          <span className="hover:text-foreground transition-colors cursor-pointer">Templates</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Resumes</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Support</span>
        </div>
        <ThemeToggle />
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div>
            <ResumeGrid resumes={resumes} />
          </div>
          <aside>
            <CareerInsights resumes={resumes} />
          </aside>
        </div>
      </div>
    </div>
  );
}
