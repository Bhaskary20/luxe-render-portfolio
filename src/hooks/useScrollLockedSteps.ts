import { useEffect, useRef, useState } from "react";

interface UseScrollLockedStepsOptions {
  count: number;
  /** Section must be at least this visible before wheel input gets captured. */
  lockThreshold?: number;
  /** How long input is ignored after a step, so one wheel gesture advances exactly one step. */
  cooldownMs?: number;
}

/**
 * True scroll-lock for a "pinned, step through N things" section: while the
 * section referenced by `sectionRef` fills the viewport, wheel input is
 * captured and converted into discrete steps (0..count-1) — normal page
 * scroll is fully suppressed via a capture-phase listener (so it beats
 * Lenis's own bubble-phase wheel handler to the event) until the user is at
 * either end and keeps scrolling outward, at which point that event is left
 * untouched and falls through to Lenis/native scroll as usual.
 */
export function useScrollLockedSteps({ count, lockThreshold = 0.85, cooldownMs = 750 }: UseScrollLockedStepsOptions) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const activeRef = useRef(0);
  const coolingRef = useRef(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setLocked(entry.intersectionRatio >= lockThreshold), {
      threshold: [0, lockThreshold, 1],
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [lockThreshold]);

  useEffect(() => {
    if (!locked) return;

    const onWheel = (e: WheelEvent) => {
      const goingDown = e.deltaY > 0;
      const atStart = activeRef.current <= 0;
      const atEnd = activeRef.current >= count - 1;

      if ((goingDown && atEnd) || (!goingDown && atStart)) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      if (coolingRef.current) return;

      coolingRef.current = true;
      setActive((i) => Math.min(count - 1, Math.max(0, i + (goingDown ? 1 : -1))));
      window.setTimeout(() => {
        coolingRef.current = false;
      }, cooldownMs);
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheel, { capture: true });
  }, [locked, count, cooldownMs]);

  const step = (dir: 1 | -1) => {
    if (coolingRef.current) return;
    coolingRef.current = true;
    setActive((i) => Math.min(count - 1, Math.max(0, i + dir)));
    window.setTimeout(() => {
      coolingRef.current = false;
    }, cooldownMs);
  };

  return {
    sectionRef,
    active,
    next: () => step(1),
    prev: () => step(-1),
    isFirst: active === 0,
    isLast: active === count - 1,
  };
}
