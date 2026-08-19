import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Field, TextAreaField } from "@/components/ui/Field";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";

const schema = z.object({
  name: z.string().trim().min(2, "Tell me your name"),
  email: z.string().trim().email("Needs a valid email"),
  subject: z.string().trim().min(2, "What's this about?"),
  message: z.string().trim().min(10, "A few more words would help"),
  botcheck: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const contactLines = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  { icon: MapPin, label: "Location", value: profile.location, href: null },
  { icon: Linkedin, label: "LinkedIn", value: "Connect", href: profile.linkedin },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    if (data.botcheck) return; // honeypot tripped, silently drop
    setStatus("pending");

    if (!ACCESS_KEY) {
      // No Web3Forms key configured — degrade honestly instead of faking success.
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)}`;
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: data.name,
          email: data.email,
          subject: `Portfolio inquiry: ${data.subject}`,
          message: data.message,
          from_name: `${data.name} via aachal-portfolio`,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        throw new Error(result.message ?? "Submission failed");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" data-theme="ink" className="relative bg-bg py-24 sm:py-32">
      <div className="container-atelier">
        <p className="tag-mono mb-8 text-fg-muted">07 — Contact</p>

        <h2 className="font-display font-medium uppercase leading-[0.95] text-fg" style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}>
          <SplitText className="block" by="word" stagger={0.05}>
            Let&apos;s build
          </SplitText>
          <SplitText className="block" by="word" stagger={0.05} delay={0.15}>
            something lasting
          </SplitText>
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-3 font-display text-2xl text-fg sm:text-3xl">
              {profile.email}
              <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} />
            </a>

            <ul className="mt-12 space-y-6">
              {contactLines.map((line) => (
                <li key={line.label} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted">
                    <line.icon size={16} />
                  </span>
                  <div>
                    <p className="tag-mono text-fg-muted/60">{line.label}</p>
                    {line.href ? (
                      <a href={line.href} target={line.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-fg transition-colors hover:text-accent-text">
                        {line.value}
                      </a>
                    ) : (
                      <p className="text-fg">{line.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-lg border border-border text-center"
                >
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-accent text-accent-text"
                  >
                    <Check size={26} />
                  </motion.span>
                  <p className="mt-6 font-display text-2xl text-fg">Message sent.</p>
                  <p className="mt-2 max-w-xs text-fg-muted">Thank you — I&apos;ll get back to you soon.</p>
                  <button type="button" onClick={() => setStatus("idle")} className="tag-mono mt-8 text-fg-muted underline underline-offset-4 hover:text-accent-text">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8"
                  noValidate
                >
                  <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("botcheck")} />
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field label="Name" autoComplete="name" {...register("name")} error={errors.name?.message} />
                    <Field label="Email" type="email" autoComplete="email" {...register("email")} error={errors.email?.message} />
                  </div>
                  <Field label="Subject" {...register("subject")} error={errors.subject?.message} />
                  <TextAreaField label="Message" {...register("message")} error={errors.message?.message} />

                  {status === "error" && (
                    <p role="alert" className="tag-mono text-destructive">
                      Something went wrong — try again, or email {profile.email} directly.
                    </p>
                  )}

                  <Magnetic strength={0.2}>
                    <button
                      type="submit"
                      disabled={status === "pending"}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-body font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {status === "pending" ? "Sending…" : "Send message"}
                      {status !== "pending" && <ArrowUpRight size={16} />}
                    </button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
