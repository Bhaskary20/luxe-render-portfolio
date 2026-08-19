import { isValidElement, type ReactElement } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useIsFinePointer } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/app/providers";

interface MagneticProps {
  children: ReactElement;
  strength?: number;
  className?: string;
}

/** Wraps a single element (typically a button/link) with a pointer-distance spring pull. */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const isFinePointer = useIsFinePointer();
  const reduced = useReducedMotion();
  const disabled = !isFinePointer || reduced;
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic({ strength, disabled });

  if (!isValidElement(children)) return children;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
