"use client";

import { useState, useEffect } from "react";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";

export function useCoverLetterAutoSave(id: string) {
  const [status, setStatus] = useState<"saved" | "saving">("saved");
  const data = useCoverLetterStore((s) => s.coverLetters.find((cl) => cl.id === id)?.data);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("saving");
    const t = setTimeout(() => setStatus("saved"), 600);
    return () => clearTimeout(t);
  }, [data]);

  return status;
}
