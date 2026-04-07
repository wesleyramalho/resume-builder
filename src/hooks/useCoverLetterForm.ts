"use client";

import { useEffect, useRef } from "react";
import { useForm, UseFormReturn, DefaultValues, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { CoverLetterData } from "@/types/coverLetter";

interface UseCoverLetterFormOptions<T extends FieldValues> {
  coverLetterId: string;
  schema: Parameters<typeof zodResolver>[0];
  defaultValues: DefaultValues<T>;
  toCoverLetterData: (values: T) => Partial<CoverLetterData>;
}

export function useCoverLetterForm<T extends FieldValues>({
  coverLetterId,
  schema,
  defaultValues,
  toCoverLetterData,
}: UseCoverLetterFormOptions<T>): UseFormReturn<T> {
  const updateCoverLetter = useCoverLetterStore((s) => s.updateCoverLetter);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSyncedJson = useRef(JSON.stringify(defaultValues));

  const updateRef = useRef(updateCoverLetter);
  updateRef.current = updateCoverLetter;
  const toDataRef = useRef(toCoverLetterData);
  toDataRef.current = toCoverLetterData;
  const idRef = useRef(coverLetterId);
  idRef.current = coverLetterId;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: structuredClone(defaultValues) as DefaultValues<T>,
    mode: "onTouched",
  }) as UseFormReturn<T>;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = form.watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const data = toDataRef.current(values as T);
        lastSyncedJson.current = JSON.stringify(data);
        updateRef.current(idRef.current, structuredClone(data));
      }, 300);
    });
    return () => {
      subscription.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentJson = JSON.stringify(defaultValues);
  useEffect(() => {
    if (currentJson === lastSyncedJson.current) return;
    form.reset(structuredClone(defaultValues));
  }, [currentJson]); // eslint-disable-line react-hooks/exhaustive-deps

  return form;
}
