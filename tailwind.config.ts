import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      maxWidth: {
        atelier: "1560px",
      },
      colors: {
        bg: "hsl(var(--color-bg) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        "surface-raised": "hsl(var(--color-surface-raised) / <alpha-value>)",
        fg: "hsl(var(--color-fg) / <alpha-value>)",
        "fg-muted": "hsl(var(--color-fg-muted) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",

        clay: "hsl(var(--color-clay) / <alpha-value>)",
        brass: "hsl(var(--color-brass) / <alpha-value>)",
        sage: "hsl(var(--color-sage) / <alpha-value>)",
        blueprint: "hsl(var(--color-blueprint) / <alpha-value>)",

        accent: "hsl(var(--color-accent) / <alpha-value>)",
        "accent-text": "hsl(var(--color-accent-text) / <alpha-value>)",
        "brass-text": "hsl(var(--color-brass-text) / <alpha-value>)",
        "sage-text": "hsl(var(--color-sage-text) / <alpha-value>)",
        "blueprint-text": "hsl(var(--color-blueprint-text) / <alpha-value>)",
        destructive: "hsl(var(--color-destructive) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-atelier": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      transitionDuration: {
        micro: "200ms",
        standard: "600ms",
        cinematic: "1200ms",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
