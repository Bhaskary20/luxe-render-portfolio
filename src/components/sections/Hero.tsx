import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Mail, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";
import { Picture } from "@/components/ui/Picture";
import { SplitText } from "@/components/motion/SplitText";
import { useReducedMotion } from "@/app/providers";
import { useIsFinePointer } from "@/hooks/useMediaQuery";
import { getLenis } from "@/hooks/useLenis";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function useClock(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false }).format(
        new Date(),
      );
    setTime(format());
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

/** Procedural floor-plan linework that self-draws, then hands off to the photographic render. */
function BlueprintLayer({ reduced }: { reduced: boolean }) {
  const draw = { pathLength: 1 };
  return (
    <motion.svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: reduced ? 0 : 2.1, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <g stroke="hsl(var(--color-blueprint))" strokeWidth="1.5" fill="none" opacity="0.85">
        <motion.rect
          x="220" y="140" width="1160" height="620"
          initial={reduced ? draw : { pathLength: 0 }}
          animate={draw}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 0.3 }}
        />
        <motion.line
          x1="720" y1="140" x2="720" y2="500"
          initial={reduced ? draw : { pathLength: 0 }}
          animate={draw}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 1.0 }}
        />
        <motion.line
          x1="720" y1="500" x2="1380" y2="500"
          initial={reduced ? draw : { pathLength: 0 }}
          animate={draw}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 1.3 }}
        />
        <motion.path
          d="M 340 760 A 120 120 0 0 1 220 640"
          initial={reduced ? draw : { pathLength: 0 }}
          animate={draw}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 1.5 }}
        />
        <motion.line
          x1="900" y1="140" x2="1080" y2="140"
          strokeWidth="4"
          initial={reduced ? draw : { pathLength: 0 }}
          animate={draw}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 1.6 }}
        />
      </g>

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 1.7 }}
        fontFamily="var(--font-mono)"
        fontSize="13"
        fill="hsl(var(--color-blueprint))"
      >
        <line x1="220" y1="110" x2="1380" y2="110" stroke="hsl(var(--color-blueprint))" strokeWidth="1" opacity="0.5" />
        <line x1="220" y1="102" x2="220" y2="118" stroke="hsl(var(--color-blueprint))" strokeWidth="1" opacity="0.5" />
        <line x1="1380" y1="102" x2="1380" y2="118" stroke="hsl(var(--color-blueprint))" strokeWidth="1" opacity="0.5" />
        <text x="760" y="98" textAnchor="middle" opacity="0.8">3600mm</text>
        <text x="1420" y="420" opacity="0.8">SEC A-A</text>
        <text x="240" y="800" opacity="0.8">SCALE 1:50</text>
      </motion.g>
    </motion.svg>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const isFinePointer = useIsFinePointer();
  const time = useClock(profile.timezone);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const renderX = useTransform(springX, [-1, 1], [-8, 8]);
  const renderY = useTransform(springY, [-1, 1], [-8, 8]);

  useEffect(() => {
    if (!isFinePointer || reduced) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isFinePointer, reduced, mx, my]);

  const scrollToNext = () => {
    const el = document.getElementById("manifesto");
    const lenis = getLenis();
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" data-theme="ink" className="relative min-h-[100svh] overflow-hidden bg-bg">
      <div className="draft-grid" />

      {/* render layer — revealed as the blueprint dissolves */}
      <motion.div
        className="absolute inset-0"
        style={{ x: renderX, y: renderY, scale: 1.06 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: reduced ? 0 : 1.9, ease: "easeInOut" }}
      >
        <Picture slug="hero" alt="A warmly lit interior render by Aachal Rannaware" priority fill sizes="100vw" imgClassName="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(30 8% 5% / 0.55) 0%, hsl(30 8% 5% / 0.25) 35%, hsl(30 8% 5% / 0.75) 100%)" }} />
      </motion.div>

      <BlueprintLayer reduced={reduced} />

      {/* content */}
      <div className="container-atelier relative z-10 flex min-h-[100svh] flex-col justify-between py-28 sm:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 2.3 }}
          className="tag-mono flex flex-wrap justify-between gap-2 text-fg-muted"
        >
          <span>{profile.locationShort} — {time} IST</span>
          <span>[ 01 / 07 ]</span>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display font-medium uppercase leading-[0.92] text-fg" style={{ fontSize: "clamp(3.2rem, 11vw, 9.5rem)" }}>
              <SplitText className="block" by="char" delay={reduced ? 0 : 2.5} stagger={0.02}>
                {profile.firstName}
              </SplitText>
              <SplitText className="block" by="char" delay={reduced ? 0 : 2.8} stagger={0.02}>
                {profile.lastName}
              </SplitText>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduced ? 0.2 : 3.3, ease: EASE_OUT_EXPO }}
              className="tag-mono mt-6 text-fg-muted"
            >
              {profile.role.toUpperCase()} — {profile.locationShort.toUpperCase()} — EST. {profile.established}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduced ? 0.3 : 3.5, ease: EASE_OUT_EXPO }}
            className="lg:col-span-4"
          >
            <p className="max-w-xs text-balance font-body text-lg leading-relaxed text-fg/80 lg:ml-auto lg:text-right">
              {profile.tagline}
            </p>
            <div className="mt-6 flex items-center gap-4 lg:justify-end">
              <a href={`mailto:${profile.email}`} aria-label="Email" className="text-fg-muted transition-colors hover:text-accent-text">
                <Mail size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-fg-muted transition-colors hover:text-accent-text">
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduced ? 0.4 : 3.8 }}
          className="tag-mono mx-auto flex flex-col items-center gap-2 text-fg-muted transition-colors hover:text-accent-text"
        >
          <span>Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={16} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
