import { motion } from "framer-motion";
import { tools, capabilityGroups, practiceNotes, type Tier } from "@/data/craft";
import { Tag } from "@/components/ui/Tag";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const tierVariant: Record<Tier, "accent" | "brass" | "neutral"> = {
  PRIMARY: "accent",
  FLUENT: "brass",
  WORKING: "neutral",
};

export function Craft() {
  return (
    <section id="craft" data-theme="bone" className="relative bg-bg py-24 sm:py-32">
      <div className="container-atelier">
        <p className="tag-mono mb-4 text-fg-muted">05 — Craft</p>
        <h2 className="max-w-2xl font-display text-4xl font-medium leading-[1.05] text-fg sm:text-6xl">
          Tools of the trade.
        </h2>

        {/* Tool wall */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT_EXPO }}
              whileHover={{ y: -4 }}
              className="group relative bg-surface-raised p-6"
            >
              <p className="tag-mono text-fg-muted/60">{tool.stage}</p>
              <p className="mt-4 font-display text-xl text-fg">{tool.name}</p>
              <p className="mt-2 text-sm text-fg-muted opacity-0 transition-opacity duration-standard group-hover:opacity-100">
                {tool.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Capability matrix */}
        <div className="mt-24 grid gap-12 sm:grid-cols-3">
          {capabilityGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: EASE_OUT_EXPO }}
            >
              <h3 className="font-display text-xl text-fg">{group.title}</h3>
              <div className="mt-6 hairline" />
              <ul className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-fg">
                      <span className="font-mono text-fg-muted/50">→</span>
                      {item.name}
                    </span>
                    <Tag variant={tierVariant[item.tier]}>{item.tier}</Tag>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Practice notes */}
        <div className="mt-24 grid gap-12 rounded-lg border border-border bg-surface-raised p-8 sm:grid-cols-2 sm:p-12">
          {practiceNotes.map((note) => (
            <div key={note.title}>
              <h4 className="tag-mono mb-4 text-accent-text">{note.title}</h4>
              <ul className="space-y-3">
                {note.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-fg">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
