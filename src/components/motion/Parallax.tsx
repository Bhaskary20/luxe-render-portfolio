import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/app/providers";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** px of travel across the scroll range; positive moves down while scrolling past. */
  strength?: number;
}

/** Inner-frame parallax — wraps media inside an overflow-hidden parent and drifts it as the page scrolls. */
export function Parallax({ children, className, strength = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
