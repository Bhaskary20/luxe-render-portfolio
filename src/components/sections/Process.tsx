import { AnimatePresence, motion } from "framer-motion";
import { processSteps } from "@/data/process";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/app/providers";
import { useScrollLockedSteps } from "@/hooks/useScrollLockedSteps";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const draw = { pathLength: 1, opacity: 1 };
const undrawn = { pathLength: 0, opacity: 0 };

function StepVisual({ index }: { index: number }) {
  const common = { fill: "none", stroke: "hsl(var(--color-fg))", strokeWidth: 1.5 } as const;

  if (index === 0) {
    return (
      <motion.svg viewBox="0 0 400 300" className="h-full w-full">
        <motion.rect x="60" y="40" width="280" height="220" {...common} initial={undrawn} animate={draw} transition={{ duration: 1, ease: EASE_OUT_EXPO }} />
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} fontFamily="var(--font-mono)" fontSize="10" fill="hsl(var(--color-fg-muted))">
          <text x="70" y="30">CLIENT BRIEF</text>
          <text x="70" y="280">SITE SURVEY — 60m² APPROX.</text>
          <circle cx="200" cy="150" r="3" fill="hsl(var(--color-brass))" />
        </motion.g>
      </motion.svg>
    );
  }

  if (index === 1) {
    return (
      <motion.svg viewBox="0 0 400 300" className="h-full w-full">
        <motion.rect x="60" y="40" width="280" height="220" {...common} initial={undrawn} animate={draw} transition={{ duration: 0.7, ease: EASE_OUT_EXPO }} />
        <motion.line x1="220" y1="40" x2="220" y2="160" {...common} initial={undrawn} animate={draw} transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT_EXPO }} />
        {[
          [80, 60, 60, 40],
          [240, 180, 80, 60],
          [90, 190, 50, 50],
        ].map(([x, y, w, h], i) => (
          <motion.rect
            key={i}
            x={x} y={y} width={w} height={h}
            fill="hsl(var(--color-brass) / 0.15)"
            stroke="hsl(var(--color-brass))"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.15, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}
          />
        ))}
      </motion.svg>
    );
  }

  if (index === 2) {
    const swatches = [
      { color: "#8B6C4F", label: "OAK" },
      { color: "#C8A265", label: "BRASS" },
      { color: "#DCD3C2", label: "LINEN" },
      { color: "#9C9488", label: "STONE" },
    ];
    return (
      <motion.svg viewBox="0 0 400 300" className="h-full w-full">
        <rect x="60" y="40" width="280" height="220" {...common} opacity="0.4" />
        {swatches.map((s, i) => (
          <motion.g key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.15, ease: EASE_OUT_EXPO }}>
            <rect x={90 + i * 60} y={120} width={44} height={44} rx="4" fill={s.color} />
            <text x={90 + i * 60} y={185} fontFamily="var(--font-mono)" fontSize="9" fill="hsl(var(--color-fg-muted))">{s.label}</text>
          </motion.g>
        ))}
      </motion.svg>
    );
  }

  if (index === 3) {
    return (
      <motion.svg viewBox="0 0 400 300" className="h-full w-full">
        <motion.g initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.9 }}>
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x={90 - i * 8} y={70 - i * 8} width={180} height={140}
              {...common}
              stroke="hsl(var(--color-blueprint))"
              initial={undrawn}
              animate={draw}
              transition={{ duration: 0.5, delay: i * 0.15, ease: EASE_OUT_EXPO }}
            />
          ))}
        </motion.g>
        <motion.rect
          x="90" y="70" width="220" height="170" rx="2"
          fill="hsl(var(--color-brass) / 0.18)"
          stroke="hsl(var(--color-brass))"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        />
        <motion.text x="200" y="160" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="hsl(var(--color-fg-muted))" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          V-RAY RENDER
        </motion.text>
      </motion.svg>
    );
  }

  return (
    <motion.svg viewBox="0 0 400 300" className="h-full w-full">
      <motion.rect x="30" y="20" width="340" height="260" {...common} initial={undrawn} animate={draw} transition={{ duration: 0.9, ease: EASE_OUT_EXPO }} />
      <motion.line x1="30" y1="220" x2="370" y2="220" {...common} initial={undrawn} animate={draw} transition={{ duration: 0.4, delay: 0.6 }} />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.4 }} fontFamily="var(--font-mono)" fontSize="10" fill="hsl(var(--color-fg-muted))">
        <text x="45" y="240">DRAWN — A.R.</text>
        <text x="45" y="255">SCALE — 1:50</text>
        <text x="250" y="240">SHEET 04 / 04</text>
      </motion.g>
      <motion.circle cx="330" cy="70" r="30" stroke="hsl(var(--color-clay))" fill="none" strokeWidth="1.5" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.9 }} transition={{ duration: 0.5, delay: 1.2, ease: EASE_OUT_EXPO }} />
      <motion.text x="330" y="74" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="hsl(var(--color-clay))" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        FINAL
      </motion.text>
    </motion.svg>
  );
}

function DesktopProcess() {
  const { sectionRef, active } = useScrollLockedSteps({ count: processSteps.length });
  const step = processSteps[active];

  return (
    <div ref={sectionRef} className="relative flex h-[100svh] items-center overflow-hidden">
      <p className="tag-mono absolute left-6 top-8 text-fg-muted sm:left-10 sm:top-10">04 — Process</p>
      <div className="container-atelier grid grid-cols-2 items-center gap-16">
        <div>
          <p className="tag-mono mb-8 text-accent-text">
            {step.index} / {String(processSteps.length).padStart(2, "0")}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              <h3 className="font-display text-4xl font-medium leading-tight text-fg sm:text-5xl">{step.title}</h3>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">{step.description}</p>
              <p className="tag-mono mt-8 text-fg-muted/60">{step.annotation}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-16 flex gap-2">
            {processSteps.map((s, i) => (
              <span key={s.index} className="h-[2px] flex-1 overflow-hidden bg-border">
                <motion.span
                  className="block h-full bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i <= active ? 1 : 0 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.4 }}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="aspect-[4/3] rounded-lg border border-border bg-surface-raised p-6">
          <AnimatePresence mode="wait">
            <motion.div key={active} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <StepVisual index={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2" aria-hidden="true">
        {processSteps.map((s, i) => (
          <span
            key={s.index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === active ? "w-6 bg-accent" : "w-1.5 bg-fg-muted/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function MobileProcess() {
  return (
    <div className="container-atelier flex flex-col gap-16">
      {processSteps.map((step) => (
        <motion.div
          key={step.index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <p className="tag-mono mb-4 text-accent-text">{step.index}</p>
          <h3 className="font-display text-3xl font-medium text-fg">{step.title}</h3>
          <p className="mt-4 max-w-md text-fg-muted">{step.description}</p>
          <p className="tag-mono mt-6 text-fg-muted/60">{step.annotation}</p>
          <div className="mt-6 aspect-[4/3] rounded-lg border border-border bg-surface-raised p-6">
            <StepVisual index={Number(step.index) - 1} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Process() {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  return (
    <section id="process" data-theme="bone" className="relative bg-bg py-24 sm:py-0">
      <h2 className="sr-only">Process</h2>
      <div className="container-atelier pt-0 sm:pt-32">
        <p className="tag-mono mb-4 text-fg-muted sm:hidden">04 — Process</p>
      </div>
      {isDesktop && !reduced ? <DesktopProcess /> : <MobileProcess />}
    </section>
  );
}
