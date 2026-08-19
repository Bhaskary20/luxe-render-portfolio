import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { useReducedMotion } from "@/app/providers";
import { getLenis } from "@/hooks/useLenis";

// Code-split: most visitors land on Home and never open a case study.
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** On every route change: jump to the top for a plain path, or scroll to the
 * hash target for a "#section" link — otherwise a new page would inherit
 * whatever scroll offset the previous page was left at. Runs the top-reset
 * immediately (it lands while the old page is still fading out under
 * mode="wait"); the hash lookup waits for the new page to actually mount. */
function useScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!location.hash) return;
    const id = window.setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (!el) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
      else el.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.hash]);
}

export function AnimatedRoutes() {
  const location = useLocation();
  const reduced = useReducedMotion();
  useScrollRestoration();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* opacity-only: a `y`/transform animation here leaves a lingering
          inline `transform` on this ancestor even after it settles at 0,
          which breaks `position: sticky` for every pinned section inside
          (Works, Process) — the sticky element's containing block becomes
          this wrapper instead of the real viewport, so it never pins. */}
      <motion.div
        key={location.pathname}
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT_EXPO }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route
            path="/work/:slug"
            element={
              <Suspense fallback={<div data-theme="ink" className="min-h-screen bg-bg" />}>
                <CaseStudy />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
