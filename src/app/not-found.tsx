"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <h1
        className="font-sans font-bold text-foreground tracking-tight"
        style={{ fontSize: "clamp(6rem, 15vw, 12rem)" }}
      >
        404
      </h1>
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        Page Not Found
      </p>
      <p className="text-muted-foreground max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/dashboard" className={buttonVariants({ className: "bg-foreground text-background hover:bg-foreground/90 font-sans text-xs uppercase tracking-widest" })}>
        Go to Dashboard
      </Link>
    </div>
  );
}
