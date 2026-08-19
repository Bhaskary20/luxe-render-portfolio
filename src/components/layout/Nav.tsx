import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { getLenis } from "@/hooks/useLenis";

const NAV_ITEMS = [
  { label: "Work", href: "#works" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const goToSection = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/${hash}`);
      return;
    }
    const el = document.querySelector(hash);
    const lenis = getLenis();
    if (el) {
      if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4 sm:pt-6">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-full max-w-atelier items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-colors duration-standard"
        style={{
          borderColor: scrolled ? "hsl(38 20% 90% / 0.12)" : "transparent",
          backgroundColor: scrolled ? "hsl(30 8% 5% / 0.55)" : "transparent",
        }}
      >
        <Link to="/" className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2EEE7]">
          {profile.firstName}&nbsp;{profile.lastName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={goToSection(item.href)}
              className="tag-mono text-[#F2EEE7]/70 transition-colors hover:text-[#F2EEE7]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={goToSection("#contact")}
          className="tag-mono hidden rounded-full border border-[#F2EEE7]/30 px-4 py-2 text-[#F2EEE7] transition-colors hover:border-[#F2EEE7] md:inline-flex"
        >
          Let&apos;s Talk
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="text-[#F2EEE7] md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[76px] z-[80] rounded-2xl border border-[#F2EEE7]/12 bg-[#0E0D0C]/95 p-6 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={goToSection(item.href)}
                  className="font-display text-2xl text-[#F2EEE7]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
