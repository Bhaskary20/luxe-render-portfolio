import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { getLenis } from "@/hooks/useLenis";
import { Magnetic } from "@/components/motion/Magnetic";

function useClock(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

export function Footer() {
  const time = useClock(profile.timezone);
  const year = new Date().getFullYear();

  const scrollTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer data-theme="ink" className="relative overflow-hidden bg-bg pt-24">
      <div className="container-atelier">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-border pb-10">
          <div className="space-y-2">
            <p className="tag-mono text-fg-muted">Based in {profile.locationShort}</p>
            <p className="tag-mono text-fg-muted">Local time — {time} IST</p>
          </div>

          <div className="space-y-2 text-right">
            <a href={`mailto:${profile.email}`} className="tag-mono block text-fg-muted transition-colors hover:text-accent-text">
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="tag-mono block text-fg-muted transition-colors hover:text-accent-text">
              LinkedIn
            </a>
          </div>

          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Back to top"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:text-accent-text"
            >
              <ArrowUp size={18} />
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="select-none px-4 pb-4 pt-8 sm:pb-6">
        <h2 className="font-display leading-[0.8] text-fg" style={{ fontSize: "clamp(3rem, 15vw, 13rem)" }}>
          {profile.firstName}
          <br />
          {profile.lastName}
        </h2>
      </div>

      <div className="container-atelier flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
        <p className="tag-mono text-fg-muted">© {year} {profile.name}. All rights reserved.</p>
        <p className="tag-mono text-fg-muted">Interior Designer — {profile.locationShort}</p>
      </div>
    </footer>
  );
}
