"use client";

import { useState } from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface MonthYearPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
}

function formatDisplay(value: string): string {
  if (!value) return "";
  const [year, month] = value.split("-");
  const m = parseInt(month, 10);
  if (isNaN(m) || m < 1 || m > 12) return value;
  return `${MONTHS[m - 1]} ${year}`;
}

export default function MonthYearPicker({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  id,
  label,
}: MonthYearPickerProps) {
  const currentYear = new Date().getFullYear();
  const initialYear = value ? parseInt(value.split("-")[0], 10) : currentYear;
  const [viewYear, setViewYear] = useState(initialYear);
  const [open, setOpen] = useState(false);

  const selectedMonth = value ? parseInt(value.split("-")[1], 10) : null;
  const selectedYear = value ? parseInt(value.split("-")[0], 10) : null;

  function handleSelect(monthIndex: number) {
    const mm = String(monthIndex + 1).padStart(2, "0");
    onChange(`${viewYear}-${mm}`);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs font-sans uppercase tracking-widest text-text-subtle">
          {label}
        </label>
      )}
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          id={id}
          disabled={disabled}
          className="flex items-center gap-2 w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-left transition-colors hover:border-ring focus:outline-none focus:border-ring disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CalendarDays className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value ? formatDisplay(value) : placeholder}
          </span>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner sideOffset={4} align="start">
            <PopoverPrimitive.Popup className="z-50 bg-card border border-border rounded-lg shadow-lg p-3 w-[220px]">
              {/* Year navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y - 1)}
                  className="p-1 rounded hover:bg-surface-soft text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-sans font-semibold text-foreground">
                  {viewYear}
                </span>
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y + 1)}
                  className="p-1 rounded hover:bg-surface-soft text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Month grid */}
              <div className="grid grid-cols-3 gap-1">
                {MONTHS.map((month, i) => {
                  const isSelected = selectedYear === viewYear && selectedMonth === i + 1;
                  return (
                    <button
                      key={month}
                      type="button"
                      onClick={() => handleSelect(i)}
                      className={`rounded-md px-2 py-1.5 text-xs font-sans transition-colors ${
                        isSelected
                          ? "bg-foreground text-background"
                          : "text-foreground hover:bg-surface-soft"
                      }`}
                    >
                      {month}
                    </button>
                  );
                })}
              </div>
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
}
