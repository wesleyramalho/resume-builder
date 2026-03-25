"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LinkedInIcon from "@/components/icons/LinkedInIcon";

const LINKEDIN_OAUTH_ENABLED = process.env.NEXT_PUBLIC_LINKEDIN_OAUTH_ENABLED === "true";

export default function LandingNav() {
  const { data: session } = useSession();
  const router = useRouter();
  const [linkedInError, setLinkedInError] = useState<string | null>(null);

  async function handleLinkedInImport() {
    setLinkedInError(null);

    if (!LINKEDIN_OAUTH_ENABLED) {
      setLinkedInError("LinkedIn import is not configured yet. Add LinkedIn OAuth env values.");
      return;
    }

    try {
      await signIn("linkedin", { callbackUrl: "/dashboard?intent=import" });
    } catch {
      setLinkedInError("LinkedIn sign-in is unavailable right now. Please try again shortly.");
    }
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
          MyPDFCV
        </Link>

        <Link
          href="/dashboard"
          className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {!session && LINKEDIN_OAUTH_ENABLED && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => void handleLinkedInImport()}
            className="hidden md:flex font-mono text-xs uppercase tracking-widest gap-2"
          >
            <LinkedInIcon className="w-4 h-4" />
            LinkedIn Import
          </Button>
        )}
        <Button
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase tracking-widest"
        >
          {session ? "My Resumes" : "Build Your Resume"}
        </Button>
      </div>

      {linkedInError ? (
        <p className="absolute top-full right-6 mt-2 text-[10px] text-destructive font-mono uppercase tracking-wider">
          {linkedInError}
        </p>
      ) : null}
    </nav>
  );
}
