# Aachal Rannaware — Interior Designer Portfolio

A cinematic, editorial portfolio built around one idea: every space starts as
AutoCAD linework and ends as a photoreal render, so the site performs that
same transformation as you scroll — **draft → render**.

Full design rationale and build plan: [`REDESIGN.md`](./REDESIGN.md).

## Stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with a custom design-token system (`src/styles/tokens.css`)
- [Framer Motion](https://www.framer.com/motion/) for all animation
- [Lenis](https://lenis.darkroom.engineering/) for smooth scroll
- [React Router](https://reactrouter.com/) for `/` and `/work/:slug` case-study routes
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for the contact form
- Self-hosted variable fonts: Fraunces (display), Satoshi (body), JetBrains Mono (technical/UI)

## Getting started

```sh
npm install
npm run dev       # http://localhost:8080
```

```sh
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run lint        # eslint
```

## Content

All copy, project data, and process/craft content lives in `src/data/*.ts` —
edit there, not inside components.

| File | Contents |
|---|---|
| `src/data/profile.ts` | Name, contact info, bio, stats, capabilities |
| `src/data/projects.ts` | The 3 featured projects + case-study copy |
| `src/data/process.ts` | The 5-step design process (Process section) |
| `src/data/craft.ts` | Tools, capability matrix, practice notes |
| `src/data/images.generated.ts` | **Auto-generated** — do not edit by hand |

## Images

Raw, full-resolution source renders live in `assets-src/` at the repo root —
**not** in `public/` or `src/`, so they're never bundled or deployed.
`public/images/` holds only the optimized AVIF/WebP/JPEG derivatives that
actually ship.

To add or replace a render:

1. Drop the new file into `assets-src/` (or `assets-src/residential-suite/`
   for gallery images).
2. Add/update its entry in the `SOURCES` map in `scripts/optimize-images.mjs`.
3. Run:
   ```sh
   npm run optimize-images
   ```
   This regenerates `public/images/*` (AVIF/WebP/JPEG at 5 responsive widths)
   and rewrites `src/data/images.generated.ts` with the new srcsets and blur
   placeholders.
4. Reference the image anywhere with `<Picture slug="your-slug" alt="..." />`
   (`src/components/ui/Picture.tsx`).

## Contact form

The form posts to [Web3Forms](https://web3forms.com) — free, no backend.

1. Get an access key at web3forms.com (instant, just needs an email).
2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_ACCESS_KEY`.

Without a key configured, the form still validates normally but falls back to
opening the visitor's email client (`mailto:`) instead of silently pretending
to succeed — it never fakes a success state.

## Deployment

Static build, deployable anywhere. A `public/_redirects` file is included for
Netlify so deep links like `/work/master-bedroom` don't 404 on refresh:

```
/*  /index.html  200
```

For Vercel or another host, add the equivalent SPA rewrite rule.

## Project structure

```
src/
  app/            Providers (Lenis, reduced-motion), route + transition setup
  components/
    layout/       Nav, Footer, Cursor, Grain, Preloader, SectionRail
    sections/     One file per home-page section (Hero, Works, Process, …)
    motion/       Reusable animation primitives (SplitText, RevealImage, …)
    ui/           Small presentational primitives (Picture, Button, Tag, Field)
  data/           All content — see Content section above
  hooks/          useLenis, useMagnetic, useMediaQuery
  pages/          Home, CaseStudy, NotFound
  styles/         Design tokens + typography
scripts/
  optimize-images.mjs   Image pipeline — see Images section above
assets-src/        Raw source renders (not deployed)
```

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: the preloader, pinned/horizontal scroll
  sections, custom cursor, and marquee all degrade to static/simple
  equivalents.
- Skip-to-content link, visible focus states, and a single `<h1>` per page.
- Images ship as responsive AVIF/WebP with JPEG fallback and inline blur
  placeholders — see `npm run optimize-images` above.
