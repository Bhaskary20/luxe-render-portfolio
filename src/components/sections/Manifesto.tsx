import { profile } from "@/data/profile";
import { SplitText } from "@/components/motion/SplitText";
import { Marquee } from "@/components/motion/Marquee";

export function Manifesto() {
  return (
    <section id="manifesto" data-theme="ink" className="relative bg-bg py-28 sm:py-40">
      <div className="container-atelier">
        <h2 className="text-center">
          <SplitText
            as="span"
            className="mx-auto block max-w-4xl text-balance font-display font-normal leading-[1.15] text-fg text-[clamp(2rem,5vw,4.5rem)]"
            stagger={0.012}
          >
            {profile.manifesto}
          </SplitText>
        </h2>
      </div>

      <div className="mt-20 border-y border-border py-6 sm:mt-28">
        <Marquee
          items={profile.capabilities}
          itemClassName="tag-mono px-6 text-fg-muted"
          baseSpeed={3}
        />
      </div>
    </section>
  );
}
