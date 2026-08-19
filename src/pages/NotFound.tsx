import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404: attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div data-theme="ink" className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <Helmet>
        <title>Page not found — Aachal Rannaware</title>
      </Helmet>
      <p className="tag-mono mb-6 text-fg-muted">SHEET NOT FOUND</p>
      <h1 className="font-display text-[18vw] font-medium leading-none text-fg sm:text-[10rem]">404</h1>
      <p className="mt-6 max-w-sm text-fg-muted">This drawing doesn&apos;t exist in the set. Let&apos;s get you back to the plan.</p>
      <Link
        to="/"
        className="tag-mono mt-10 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-fg transition-colors hover:border-accent hover:text-accent-text"
      >
        <ArrowLeft size={14} /> Back home
      </Link>
    </div>
  );
}
