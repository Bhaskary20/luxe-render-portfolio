import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/app/providers";

interface SplitTextProps {
  children: string;
  by?: "char" | "word";
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  viewportAmount?: number;
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Per-character or per-word mask reveal. Falls back to a plain opacity fade under reduced motion. */
export function SplitText({
  children,
  by = "word",
  as = "span",
  className,
  delay = 0,
  stagger = 0.03,
  once = true,
  viewportAmount = 0.6,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const motionTags = motion as unknown as Record<string, typeof motion.span>;
  const Tag = motionTags[as] ?? motion.span;
  const units = by === "char" ? Array.from(children) : children.split(/(\s+)/);

  if (reduced) {
    return (
      <Tag className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once, amount: viewportAmount }} transition={{ duration: 0.3 }}>
        {children}
      </Tag>
    );
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const item: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <Tag className={className} aria-label={children}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: viewportAmount }}
        variants={container}
        style={{ display: "inline" }}
        aria-hidden="true"
      >
        {units.map((unit, i) =>
          unit === " " || unit === "" ? (
            <span key={i}>{unit === "" ? "" : " "}</span>
          ) : (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
              <motion.span style={{ display: "inline-block" }} variants={item}>
                {unit}
              </motion.span>
            </span>
          ),
        )}
      </motion.span>
    </Tag>
  );
}
