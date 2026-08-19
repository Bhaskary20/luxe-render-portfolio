import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getLenis } from "@/hooks/useLenis";

const SECTIONS = [
  { id: "hero", index: "01", theme: "ink" },
  { id: "manifesto", index: "02", theme: "ink" },
  { id: "works", index: "03", theme: "ink" },
  { id: "process", index: "04", theme: "bone" },
  { id: "craft", index: "05", theme: "bone" },
  { id: "about", index: "06", theme: "bone" },
  { id: "contact", index: "07", theme: "ink" },
] as const;

/** Fixed right-edge index rail — active dot tracks whichever section fills the most viewport. Desktop only. */
export function SectionRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.5 },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    const lenis = getLenis();
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const isBone = SECTIONS[active]?.theme === "bone";
  const dimColor = isBone ? "rgba(33,29,25,0.28)" : "rgba(242,238,231,0.3)";
  const labelColor = isBone ? "rgba(33,29,25,0.65)" : "rgba(242,238,231,0.7)";

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => goTo(s.id)}
          className="pointer-events-auto group flex items-center gap-2"
          aria-label={`Go to section ${s.index}`}
        >
          <motion.span
            animate={{
              opacity: active === i ? 1 : 0,
              x: active === i ? 0 : 8,
              color: labelColor,
            }}
            className="font-mono text-[10px] uppercase tracking-[0.15em]"
          >
            {s.id}
          </motion.span>
          <motion.span
            animate={{
              width: active === i ? 20 : 8,
              backgroundColor: active === i ? "#B4735A" : dimColor,
            }}
            className="h-[2px] rounded-full"
          />
        </button>
      ))}
    </div>
  );
}
