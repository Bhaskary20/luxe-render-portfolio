import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  className?: string;
  variant?: "accent" | "brass" | "sage" | "blueprint" | "neutral";
}

const colorMap: Record<NonNullable<TagProps["variant"]>, string> = {
  accent: "text-accent-text border-accent/30",
  brass: "text-brass-text border-brass/30",
  sage: "text-sage-text border-sage/30",
  blueprint: "text-blueprint-text border-blueprint/30",
  neutral: "text-fg-muted border-border",
};

export function Tag({ children, className, variant = "accent" }: TagProps) {
  return (
    <span
      className={cn(
        "tag-mono inline-flex items-center rounded-full border px-3 py-1",
        colorMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
