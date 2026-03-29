"use client";

import { useState, useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export function useResumeAutoSave(id: string) {
  const [status, setStatus] = useState<"saved" | "saving">("saved");
  const data = useResumeStore((s) => s.resumes.find((r) => r.id === id)?.data);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("saving");
    const t = setTimeout(() => setStatus("saved"), 600);
    return () => clearTimeout(t);
  }, [data]);

  return status;
}
