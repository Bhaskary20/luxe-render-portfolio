import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useReducedMotion } from "@/app/providers";

interface CounterProps {
  value: string; // e.g. "20+", "9.8", "15+"
  className?: string;
  suffix?: string;
  duration?: number;
}

/** Extracts the leading numeric portion of `value` and counts it up on view; renders the original string verbatim under reduced motion. */
export function Counter({ value, className, suffix = "", duration = 1.4 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : "0");

  const match = value.match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : 0;
  const trailing = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(0, numeric, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduced, numeric, duration, decimals]);

  return (
    <motion.span ref={ref} className={className}>
      {reduced ? value : display}
      {trailing}
      {suffix}
    </motion.span>
  );
}
