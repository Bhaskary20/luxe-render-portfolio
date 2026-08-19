import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { RevealImage } from "@/components/motion/RevealImage";
import { Picture } from "@/components/ui/Picture";
import { Counter } from "@/components/motion/Counter";
import { Magnetic } from "@/components/motion/Magnetic";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function About() {
  return (
    <section id="about" data-theme="bone" className="relative bg-bg py-24 sm:py-32">
      <div className="container-atelier">
        <p className="tag-mono mb-4 text-fg-muted">06 — About</p>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="relative mr-8 lg:col-span-5 lg:mr-16">
            <div className="absolute -bottom-6 -right-6 h-full w-full border border-accent/40" aria-hidden="true" />
            <RevealImage className="relative aspect-[4/5]" direction="left">
              <Picture
                slug="project-master-bedroom"
                alt="A signature interior render by Aachal Rannaware"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                imgClassName="object-cover"
              />
            </RevealImage>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              Design that resonates,
              <br />
              not just decorates.
            </h2>

            <div className="mt-10 max-w-xl space-y-6 text-lg leading-relaxed text-fg-muted [&>p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:mr-3 [&>p:first-of-type::first-letter]:font-display [&>p:first-of-type::first-letter]:text-6xl [&>p:first-of-type::first-letter]:leading-[0.8] [&>p:first-of-type::first-letter]:text-fg">
              {profile.philosophy.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {profile.keyExpertise.map((skill) => (
                <span key={skill} className="tag-mono rounded-full border border-border px-4 py-2 text-fg-muted">
                  {skill}
                </span>
              ))}
            </div>

            <Magnetic strength={0.25} className="mt-10 inline-block">
              <a
                href={profile.resumeUrl}
                download={profile.resumeFilename}
                className="inline-flex items-center gap-2 rounded-full border border-fg px-6 py-3 font-body font-medium text-fg transition-colors hover:bg-fg hover:text-bg"
              >
                <Download size={16} />
                Download CV
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-border pt-16 sm:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_OUT_EXPO }}
            >
              <p className="font-display text-5xl font-medium text-fg sm:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="tag-mono mt-3 text-fg-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid gap-16 border-t border-border pt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="tag-mono mb-8 text-accent-text">Experience</h3>
            <div className="space-y-10">
              {profile.experience.map((role) => (
                <motion.div
                  key={role.role + role.org}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-display text-xl text-fg">
                      {role.role} <span className="text-fg-muted">— {role.org}</span>
                    </h4>
                    <span className="tag-mono text-fg-muted/60">{role.period}</span>
                  </div>
                  <p className="tag-mono mt-1 text-fg-muted/60">{role.location}</p>
                  <ul className="mt-4 space-y-2">
                    {role.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-fg-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="tag-mono mb-8 text-accent-text">Education</h3>
            <h4 className="font-display text-xl text-fg">{profile.education.degree}</h4>
            <p className="mt-2 text-fg-muted">{profile.education.institution}</p>
            <p className="tag-mono mt-1 text-fg-muted/60">
              {profile.education.location} — {profile.education.period}
            </p>

            <h3 className="tag-mono mb-6 mt-12 text-accent-text">Certifications</h3>
            <ul className="space-y-3">
              {profile.certifications.map((cert) => (
                <li key={cert.name} className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <span className="text-fg">{cert.name}</span>
                  <span className="tag-mono shrink-0 text-fg-muted/60">{cert.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
