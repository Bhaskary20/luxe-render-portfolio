import { useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/app/providers";

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  /** % of the track's own width crossed per second at rest (track is 2x content width, so a full loop takes 50/baseSpeed seconds). */
  baseSpeed?: number;
}

/** Infinite marquee that speeds up and skews with scroll velocity. Freezes under reduced motion. */
export function Marquee({ items, className, itemClassName, baseSpeed = 3 }: MarqueeProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const lastScrollY = useRef(0);
  const velocity = useMotionValue(0);
  const smoothVelocity = useSpring(velocity, { stiffness: 120, damping: 24 });
  const skew = useTransform(smoothVelocity, [-1200, 0, 1200], [-8, 0, 8], { clamp: true });
  // Scroll-velocity speedup, in the same %/sec units as baseSpeed — capped well below
  // a jarring speed even during a fast fling.
  const speedBoost = useTransform(smoothVelocity, (v) => Math.min(Math.abs(v) * 0.05, 10));

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      velocity.set(y - lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [velocity]);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const dir = -1;
    const px = ((baseSpeed + speedBoost.get()) * delta) / 1000;
    let next = x.get() + dir * px;
    if (next <= -50) next += 50;
    x.set(next);
  });

  const xPercent = useTransform(x, (v) => `${v}%`);
  const doubled = [...items, ...items];

  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        style={{
          display: "flex",
          width: "max-content",
          x: reduced ? "0%" : xPercent,
          skewX: reduced ? 0 : skew,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={itemClassName}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
