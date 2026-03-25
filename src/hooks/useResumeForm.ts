"use client";

import { useEffect, useRef } from "react";
import { useForm, UseFormReturn, DefaultValues, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/store/useResumeStore";
import { ResumeData } from "@/types/resume";

interface UseResumeFormOptions<T extends FieldValues> {
  resumeId: string;
  schema: Parameters<typeof zodResolver>[0];
  defaultValues: DefaultValues<T>;
  /** Map form values back to a partial ResumeData for the store */
  toResumeData: (values: T) => Partial<ResumeData>;
}

/**
 * Wraps react-hook-form with auto-sync to the zustand resume store.
 * Watches all form values and debounces writes to the store.
 * Resets the form when store data changes externally (e.g., LinkedIn import).
 */
export function useResumeForm<T extends FieldValues>({
  resumeId,
  schema,
  defaultValues,
  toResumeData,
}: UseResumeFormOptions<T>): UseFormReturn<T> {
  const updateResume = useResumeStore((s) => s.updateResume);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSyncedJson = useRef(JSON.stringify(defaultValues));

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  }) as UseFormReturn<T>;

  // Watch all values and sync to store with debounce
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const data = toResumeData(values as T);
        lastSyncedJson.current = JSON.stringify(data);
        updateResume(resumeId, data);
      }, 300);
    });
    return () => {
      subscription.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [form, resumeId, updateResume, toResumeData]);

  // Reset form when store data changes externally (not from our own writes)
  const currentJson = JSON.stringify(defaultValues);
  useEffect(() => {
    // Skip if this change came from our own form → store sync
    if (currentJson === lastSyncedJson.current) return;
    form.reset(defaultValues);
  }, [currentJson]); // eslint-disable-line react-hooks/exhaustive-deps

  return form;
}
