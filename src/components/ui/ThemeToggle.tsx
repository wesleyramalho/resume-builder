"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={toggleTheme}
      className="font-sans text-[10px] uppercase tracking-widest gap-1.5"
      aria-label="Toggle color theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
}

