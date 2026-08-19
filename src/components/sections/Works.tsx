import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Picture } from "@/components/ui/Picture";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/app/providers";
import { useCursorHover } from "@/components/layout/Cursor";
import { useScrollLockedSteps } from "@/hooks/useScrollLockedSteps";
import { getLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const PANEL_COUNT = projects.length + 1; // + closing CTA panel

function ProjectPanel({ project, isActive }: { project: (typeof projects)[number]; isActive: boolean }) {
  const navigate = useNavigate();
  const cursorProps = useCursorHover("View Case");

  return (
    <button
      type="button"
      onClick={() => navigate(`/work/${project.slug}`)}
      {...cursorProps}
      className="group relative h-full w-screen shrink-0 overflow-hidden text-left"
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ scale: isActive ? 1 : 1.08, opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      >
        <div className="h-full w-full transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105">
          <Picture slug={project.coverSlug} alt={project.title} fill sizes="100vw" imgClassName="object-cover" />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-bg/60" />

      <span
        aria-hidden="true"
        className="absolute -bottom-[6vw] left-4 select-none font-display text-[28vw] leading-none text-fg/[0.06] sm:left-8"
      >
        {project.index}
      </span>

      <div className="container-atelier relative flex h-full flex-col justify-end pb-16 sm:pb-24">
        <p className="tag-mono mb-4 text-accent-text">{project.category} — {project.year}</p>
        <h3 className="max-w-2xl font-display text-4xl font-medium leading-[1.02] text-fg sm:text-6xl">
          {project.title}
        </h3>
        <span className="tag-mono mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-fg/40 bg-bg/50 px-4 py-2 text-fg backdrop-blur-sm transition-colors duration-micro group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
          View case study <ArrowUpRight size={14} />
        </span>
      </div>
    </button>
  );
}

function ClosingPanel() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    const lenis = getLenis();
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex h-full w-screen shrink-0 items-center justify-center bg-surface">
      <div className="draft-grid opacity-50" />
      <button type="button" onClick={scrollToContact} className="group relative text-center">
        <p className="tag-mono mb-6 text-fg-muted">— Next —</p>
        <h3 className="font-display text-5xl font-medium leading-[1.05] text-fg sm:text-7xl">
          Let&apos;s build
          <br />
          yours <ArrowUpRight className="inline-block transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" size={48} />
        </h3>
      </button>
    </div>
  );
}

function DesktopWorks() {
  const { sectionRef, active } = useScrollLockedSteps({ count: PANEL_COUNT });

  return (
    <div ref={sectionRef} className="relative h-[100svh] overflow-hidden">
      <motion.div
        className="flex h-full"
        animate={{ x: `-${active * 100}vw` }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        {projects.map((project, i) => (
          <ProjectPanel key={project.slug} project={project} isActive={i === active} />
        ))}
        <ClosingPanel />
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2" aria-hidden="true">
        {Array.from({ length: PANEL_COUNT }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === active ? "w-6 bg-accent" : "w-1.5 bg-fg/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function MobileWorks() {
  return (
    <div className="flex flex-col">
      {projects.map((project) => (
        <div key={project.slug} className="h-[85vh]">
          <ProjectPanel project={project} isActive />
        </div>
      ))}
      <div className="h-[70vh]">
        <ClosingPanel />
      </div>
    </div>
  );
}

export function Works() {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  return (
    <section id="works" data-theme="ink" className="relative bg-bg">
      <div className="container-atelier pb-10 pt-24 sm:pt-32">
        <p className="tag-mono mb-4 text-fg-muted">03 — Selected Works</p>
        <h2 className="max-w-2xl font-display text-4xl font-medium leading-[1.05] text-fg sm:text-6xl">
          Space, resolved in three acts.
        </h2>
      </div>

      {isDesktop && !reduced ? <DesktopWorks /> : <MobileWorks />}
    </section>
  );
}
