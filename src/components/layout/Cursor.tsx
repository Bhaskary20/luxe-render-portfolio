import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsFinePointer } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/app/providers";

interface CursorContextValue {
  setLabel: (label: string | null) => void;
}

const CursorContext = createContext<CursorContextValue>({ setLabel: () => {} });

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const isFinePointer = useIsFinePointer();
  const reduced = useReducedMotion();
  const active = isFinePointer && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [active, x, y, visible]);

  return (
    <CursorContext.Provider value={{ setLabel }}>
      {children}
      {active && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full mix-blend-difference"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: label ? 96 : 10,
            height: label ? 96 : 10,
            opacity: visible ? 1 : 0,
            backgroundColor: "#F2EEE7",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#0E0D0C]">{label}</span>
          )}
        </motion.div>
      )}
    </CursorContext.Provider>
  );
}

/** Attach to any hoverable element to swap the cursor into a labeled state. */
export function useCursorHover(label: string) {
  const { setLabel } = useCursor();
  const onMouseEnter = () => setLabel(label);
  const onMouseLeave = () => setLabel(null);
  return { onMouseEnter, onMouseLeave };
}
