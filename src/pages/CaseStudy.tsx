import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { getProjectBySlug, projects } from "@/data/projects";
import { Picture } from "@/components/ui/Picture";
import { RevealImage } from "@/components/motion/RevealImage";
import { SplitText } from "@/components/motion/SplitText";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Tag } from "@/components/ui/Tag";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug ?? "");

  if (!project) return <Navigate to="/" replace />;

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Helmet>
        <title>{project.title} — Aachal Rannaware</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <Nav />

      <main id="main-content" data-theme="ink" className="bg-bg">
        {/* Hero */}
        <section className="relative flex min-h-[80vh] items-end overflow-hidden pb-16 pt-32">
          <RevealImage className="absolute inset-0" direction="up">
            <Picture slug={project.coverSlug} alt={project.title} fill priority sizes="100vw" imgClassName="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/70" />
          </RevealImage>

          <div className="container-atelier relative z-10">
            <Link to="/#works" className="tag-mono mb-8 inline-flex items-center gap-2 text-fg-muted hover:text-accent-text">
              <ArrowLeft size={14} /> Back to work
            </Link>
            <p className="tag-mono mb-4 text-accent-text">{project.category} — {project.year}</p>
            <h1 className="font-display font-medium leading-[0.98] text-fg" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
              <SplitText by="word" stagger={0.04}>{project.title}</SplitText>
            </h1>
          </div>
        </section>

        {/* Brief */}
        <section className="container-atelier py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="tag-mono text-fg-muted">The Brief</p>
            </div>
            <div className="lg:col-span-8">
              <p className="text-balance font-display text-2xl font-normal leading-snug text-fg sm:text-3xl">
                {project.brief}
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-12 border-t border-border pt-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="tag-mono text-fg-muted">Approach</p>
            </div>
            <div className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-fg-muted">
              <p>{project.approach}</p>
              <p>{project.outcome}</p>
            </div>
          </div>

          {project.metrics.length > 0 && (
            <div className="mt-16 grid gap-12 border-t border-border pt-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="tag-mono text-fg-muted">Outcome</p>
              </div>
              <div className="grid grid-cols-2 gap-8 lg:col-span-8 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-display text-4xl font-medium text-fg sm:text-5xl">{metric.value}</p>
                    <p className="tag-mono mt-2 text-fg-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 grid gap-12 border-t border-border pt-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="tag-mono text-fg-muted">Tools</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-8">
              {project.tools.map((tool) => (
                <Tag key={tool} variant="neutral">{tool}</Tag>
              ))}
            </div>
          </div>

          {project.pdfUrl && (
            <div className="mt-16 grid gap-12 border-t border-border pt-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="tag-mono text-fg-muted">Documentation</p>
              </div>
              <div className="lg:col-span-8">
                <div className="overflow-hidden rounded-lg border border-border">
                  <iframe src={project.pdfUrl} title={`${project.title} deliverable`} className="h-[480px] w-full bg-surface" />
                </div>
                <a href={project.pdfUrl} download className="tag-mono mt-4 inline-flex items-center gap-2 text-fg-muted hover:text-accent-text">
                  <Download size={14} /> Download full PDF
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Gallery */}
        {project.gallery.length > 1 && (
          <section className="container-atelier pb-20 sm:pb-28">
            <p className="tag-mono mb-8 text-fg-muted">Gallery</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image, i) => (
                <RevealImage key={image.slug} delay={i * 0.05} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
                  <div className="relative aspect-[16/10]">
                    <Picture slug={image.slug} alt={image.caption ?? project.title} fill sizes="(min-width: 640px) 50vw, 100vw" imgClassName="object-cover" />
                  </div>
                  {image.caption && <p className="tag-mono mt-2 text-fg-muted/60">{image.caption}</p>}
                </RevealImage>
              ))}
            </div>
          </section>
        )}

        {/* Next project */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="border-t border-border bg-surface"
        >
          <Link to={`/work/${next.slug}`} className="group block">
            <div className="container-atelier flex flex-col items-start justify-between gap-6 py-20 sm:flex-row sm:items-center sm:py-28">
              <div>
                <p className="tag-mono mb-4 text-fg-muted">Next project</p>
                <h3 className="font-display text-4xl font-medium text-fg sm:text-6xl">{next.title}</h3>
              </div>
              <ArrowUpRight size={40} className="text-fg-muted transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-accent-text" />
            </div>
          </Link>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
