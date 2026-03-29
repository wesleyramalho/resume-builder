import { MoreHorizontal, MoreVertical } from "lucide-react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MoreMenuTriggerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function MoreMenuTrigger({ orientation = "vertical", className }: MoreMenuTriggerProps) {
  const Icon = orientation === "horizontal" ? MoreHorizontal : MoreVertical;
  return (
    <DropdownMenuTrigger
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-md border border-border bg-surface-soft hover:bg-surface-strong text-muted-foreground hover:text-foreground transition-colors shrink-0",
        className
      )}
    >
      <Icon className="w-4 h-4" />
    </DropdownMenuTrigger>
  );
}
