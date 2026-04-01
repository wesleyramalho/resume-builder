export function generateId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);
}

/** Format a "YYYY-MM" date string to a localized short month + year */
export function formatMonthYear(
  ym: string | null,
  locale: string = "en-US",
  presentLabel: string = "Present",
): string {
  if (!ym) return presentLabel;
  const [year, month] = ym.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
}
