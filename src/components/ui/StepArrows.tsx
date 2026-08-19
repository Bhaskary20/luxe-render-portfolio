import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  className?: string;
}

const arrowClass =
  "pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-fg/30 bg-bg/40 text-fg backdrop-blur-md transition-all duration-standard ease-out-expo hover:scale-105 hover:border-accent hover:bg-accent hover:text-bg disabled:pointer-events-none disabled:opacity-20 disabled:hover:scale-100";

/** Manual prev/next controls for a scroll-locked, step-through section — click-through alternative to wheel input. */
export function StepArrows({ onPrev, onNext, isFirst, isLast, className }: StepArrowsProps) {
  return (
    <div
      className={cn(
        // Fixed, edge-hugging inset rather than one that grows with the
        // breakpoint — container-atelier's own gutter also grows with
        // viewport width, so a scaling inset can land the arrow right on
        // top of that container's text content at some widths.
        "pointer-events-none absolute inset-x-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between",
        className,
      )}
    >
      <button type="button" onClick={onPrev} disabled={isFirst} aria-label="Previous" className={arrowClass}>
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button type="button" onClick={onNext} disabled={isLast} aria-label="Next" className={arrowClass}>
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
