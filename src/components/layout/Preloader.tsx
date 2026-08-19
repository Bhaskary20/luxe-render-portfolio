import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/app/providers";

const SESSION_KEY = "atelier-preloader-seen";
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface PreloaderProps {
  onDone?: () => void;
}

export function Preloader({ onDone }: PreloaderProps) {
  const reduced = useReducedMotion();
  const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1";
  const [visible, setVisible] = useState(!alreadySeen && !reduced);
  const [exiting, setExiting] = useState(false);
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setExiting(true);
    window.setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 900);
  };

  useEffect(() => {
    if (!visible) {
      onDone?.();
      return;
    }

    const start = performance.now();
    const DURATION = 1800;
    let raf: number;

    const tick = (t: number) => {
      const elapsed = t - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setCount(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(finish, 300);
      }
    };
    raf = requestAnimationFrame(tick);

    const skip = () => finish();
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    window.addEventListener("keydown", skip);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[100]" data-theme="ink" role="status" aria-label="Loading">
          {!exiting && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-between bg-bg px-6 py-8 sm:px-10 sm:py-12"
              exit={{ opacity: 0 }}
              onClick={finish}
            >
              <div className="flex justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">Atelier</span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">Draft → Render</span>
              </div>

              <div className="relative flex items-center justify-center">
                <h1 className="font-display text-[14vw] font-medium leading-none text-fg sm:text-[10vw]">
                  <span className="relative inline-block">
                    <span
                      className="absolute inset-0"
                      style={{ color: "transparent", WebkitTextStroke: "1px hsl(var(--color-fg) / 0.4)" }}
                    >
                      AACHAL
                    </span>
                    <span
                      className="relative inline-block overflow-hidden text-fg"
                      style={{ clipPath: `inset(0 ${100 - count}% 0 0)` }}
                    >
                      AACHAL
                    </span>
                  </span>
                </h1>
              </div>

              <div className="flex items-end justify-between">
                <span className="font-mono text-5xl text-fg sm:text-6xl">{String(count).padStart(2, "0")}</span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
                  Click or scroll to skip
                </span>
              </div>
            </motion.div>
          )}

          {exiting && (
            <div className="absolute inset-0 flex">
              <motion.div
                className="h-full w-1/2 bg-bg"
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              />
              <motion.div
                className="h-full w-1/2 bg-bg"
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              />
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
