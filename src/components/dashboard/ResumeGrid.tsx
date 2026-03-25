"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { Resume } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import ResumeCard from "./ResumeCard";

interface Props {
  resumes: Resume[];
}

export default function ResumeGrid({ resumes }: Props) {
  const router = useRouter();
  const createResume = useResumeStore((s) => s.createResume);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || resumes.length === 0) return;

    gsap.fromTo(
      ".resume-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.1,
      },
    );
  }, [resumes.length]);

  function handleCreate() {
    const resume = createResume();
    router.push(`/editor/${resume.id}`);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      {resumes.map((resume) => (
        <div key={resume.id} className="resume-card opacity-0">
          <ResumeCard resume={resume} />
        </div>
      ))}

      {/* New Resume card */}
      <button
        onClick={handleCreate}
        className="group border border-dashed border-border rounded-lg aspect-[3/4] flex flex-col items-center justify-center gap-3 hover:border-brand-secondary/60 hover:bg-surface-soft transition-all text-muted-foreground hover:text-foreground"
      >
        <div className="w-10 h-10 rounded-full border border-border group-hover:border-brand-secondary/60 flex items-center justify-center transition-colors">
          <Plus className="w-5 h-5" />
        </div>
        <div className="text-center">
          <p className="font-sans font-medium text-sm">New Career Path</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-1">
            Start fresh from blank canvas
          </p>
        </div>
      </button>
    </div>
  );
}
