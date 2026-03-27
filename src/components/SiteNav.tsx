"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function SiteNav() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-12 py-4 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="font-sans text-sm font-bold uppercase tracking-widest text-foreground"
        >
          MyPDFCV
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <ThemeToggle />
        <Button
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="bg-foreground text-background hover:bg-foreground/90 font-sans text-xs uppercase tracking-widest"
        >
          <span className="sm:hidden">{session ? "Resumes" : "Start"}</span>
          <span className="hidden sm:inline">{session ? "My Resumes" : "Build Your Resume"}</span>
        </Button>
      </div>
    </nav>
  );
}
