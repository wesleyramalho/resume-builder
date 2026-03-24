"use client";

import { User, Briefcase, GraduationCap, Zap, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "projects", label: "Projects", icon: Code },
];

interface Props {
  activeSection: string;
  onSelect: (id: string) => void;
}

export default function EditorNav({ activeSection, onSelect }: Props) {
  return (
    <nav className="flex flex-col gap-1 py-4">
      {SECTIONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-xs font-mono uppercase tracking-widest transition-colors",
            activeSection === id
              ? "bg-surface-strong text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-surface-soft"
          )}
        >
          <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
          {label}
        </button>
      ))}
    </nav>
  );
}
