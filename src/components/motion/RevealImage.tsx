import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/app/providers";

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const clipFrom: Record<NonNullable<RevealImageProps["direction"]>, string> = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/** Clip-path reveal for images/media blocks — the frame opens rather than the image fading in. */
export function RevealImage({ children, className, delay = 0, direction = "up" }: RevealImageProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <motion.div className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: clipFrom[direction], scale: 1.08 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
