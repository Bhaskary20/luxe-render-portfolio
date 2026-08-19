# ATELIER — Portfolio Redesign Master Plan
### Aachal Rannaware · Interior Designer

**Goal:** a portfolio that wins the room in the first 3 seconds, survives a 20-minute interview walkthrough, and does not look like it came from a template.

---

## 0. Where we are today (audit)

| Layer | Current state |
|---|---|
| Stack | Vite 5 + React 18 + TS + Tailwind 3 + shadcn/ui + framer-motion 12 |
| Routes | Single `/` page + 404. Everything is one long scroll. |
| Sections | Hero → About → Projects → Skills → Contact |
| Theme | Dark navy `220 25% 8%` + cool blue accent `210 95% 70%` |
| Type | Playfair Display + Inter |
| Nav | **None.** No header, no menu, no scroll indicator. |
| Motion | ~23 floating dots, `whileHover: scale 1.05`, fade-up on 5 sections |
| Images | **~60 MB total.** `LV3.png` 10 MB, `view 2.png` 9 MB, `LV2.png` 9.5 MB, `masterbrdroom r-1.png` 8.3 MB |
| Contact form | Fake — `setTimeout(2000)` then a success toast. Nothing is sent. |
| UI kit | 48 shadcn components installed, ~4 actually used |

### The three things killing it

1. **It's a template.** Centered hero, 3-card grid, `%` skill bars, stat tiles with circle icons. An interviewer has seen this exact layout 200 times.
2. **It's slow.** 60 MB of PNGs on a portfolio whose entire job is "look expensive." On 4G the hero image alone stalls for seconds — the wow never lands.
3. **It shows pictures, not thinking.** A design portfolio that only shows finished renders reads as decoration. Interviews are won by *process* — brief → constraint → space plan → material logic → render → outcome.

---

## 1. The concept: DRAFT → RENDER

One idea drives the entire site.

> Every space Aachal builds starts as linework in AutoCAD and ends as a photoreal render. The website performs that same transformation as you scroll.

**How it reads:** the site opens as technical drawing — hairline grid, dimension ticks, mono annotations, plan-view wireframes drawn stroke-by-stroke. As you scroll, that linework *dissolves into the render*. Blueprint becomes photograph. Cold becomes warm. By the works section you are standing in a finished room.

**Why this wins:**

- It is unmistakably *interior architecture* — no other discipline's portfolio can use it.
- It literally demonstrates the skill set (AutoCAD → SketchUp → V-Ray/Enscape) instead of listing it as a progress bar.
- It gives every animation a *reason to exist*. Motion becomes narrative, not decoration — which is the difference between "cool" and "showing off."
- It is a 15-second story that can be narrated live in an interview.

**The visual world:** a warm, gallery-lit atelier. Bone paper, ink type, clay and brass accents, oversized editorial serif, asymmetric grid, generous negative space. Premium the way a Kelly Wearstler monograph is premium — restraint, scale, and material warmth. Not neon, not glassmorphism, not "SaaS dark mode."

**Rhythm:** the site breathes between **Ink** (near-black, cinematic — Hero, Works) and **Bone** (warm light, editorial — Process, About). That light/dark cadence is itself a wow device; each transition feels like turning a page in a printed monograph.

---

## 2. Design system

### 2.1 Palette

```
INK          #0E0D0C   near-black, cinematic sections
CHARCOAL     #1C1917   raised surfaces on ink
BONE         #F3EFE8   warm paper, editorial sections
ALABASTER    #FBF9F5   raised surfaces on bone
CLAY         #B4735A   primary accent — terracotta, warm, human
BRASS        #C8A265   secondary accent — highlights, rules, hairlines
SAGE         #6E7A6B   tertiary — tags, muted states
BLUEPRINT    #7C93A8   used ONLY for draft/wireframe state
```

Rule: **Clay is the only accent that appears in the light theme.** Blueprint exists only in "draft" state and is never used as a UI color — it disappears as the render resolves. That discipline is what keeps it premium.

Every token ships as `--color-*` HSL triples in `index.css` so both themes are one variable swap.

### 2.2 Typography

| Role | Face | Why |
|---|---|---|
| Display | **Fraunces** (variable) | Optical-size plus `SOFT`/`WONK` axes. Feels couture at 12rem, stays readable at 2rem. Free, variable, one file. |
| Body / UI | **Satoshi** (Fontshare) | Geometric grotesk with warmth. Reads modern without the Inter fatigue. |
| Technical | **JetBrains Mono** | CAD-style annotations, dimensions, section numbers, tags. Sells the "draft" language. |

Scale is fluid via `clamp()`. Hero display maxes at `clamp(3.5rem, 13vw, 13rem)`. Tracking tightens as size grows (`-0.04em` at display, `0` at body).

**Playfair + Inter are retired.** They are the two most-used fonts on template portfolios; keeping them keeps the generic smell.

### 2.3 Grid and space

- 12-column, `max-width: 1560px`, gutters `clamp(1.25rem, 4vw, 5rem)`.
- **Asymmetric by default.** Content sits on columns 2–7 or 6–12, never centered — except one deliberate moment (the manifesto) where centering becomes an event.
- Vertical rhythm on an 8px base; section padding `clamp(6rem, 14vh, 14rem)`.
- A persistent 1px hairline column grid at 4% opacity over dark sections — the drafting-paper tell.

### 2.4 Texture

- **Film grain**: fixed SVG `feTurbulence` overlay, `opacity 0.035`, `mix-blend-mode: overlay`. Kills the flat-digital look instantly.
- **Vignette**: subtle radial darkening on cinematic sections.
- **Hairlines everywhere**: 1px `rgba` rules at section joins, around image frames, under nav.

---

## 3. Information architecture

Single-page is why it feels thin. We go **hybrid**: a cinematic home reel plus **real case-study routes**. Case studies are the interview weapon.

```
/                     Home — the reel
  00  Entry sequence          preloader → curtain
  01  Hero                    DRAFT → RENDER
  02  Manifesto               statement + marquee
  03  Selected Works          horizontal cinematic scroll
  04  Process                 pinned 5-step sequence
  05  Craft                   tools + capability matrix
  06  About                   editorial portrait + numbers
  07  Contact                 oversized type + real form
  08  Footer                  giant wordmark + local time

/work/master-bedroom          full case study
/work/modular-kitchen         full case study
/work/residential-suite       full case study + 9-image gallery
/about                        (optional) long-form bio + CV timeline
```

**Persistent shell:** glass nav pill (top), section rail with live index (right edge), custom cursor, grain, scroll progress hairline.

---

## 4. Section-by-section spec

### 00 · Entry sequence *(2.2s, once per session via `sessionStorage`)*

Ink screen. Mono counter `00 → 100` bottom-left. Centre: the word `AACHAL` drawn as **SVG outline stroke** that fills solid as the counter climbs. At 100 the screen splits horizontally into two panels that slide apart, revealing the hero already mid-animation. Skippable on click/scroll. Skipped entirely under `prefers-reduced-motion`.

### 01 · Hero — the money shot

- Full-bleed. Starts as **blueprint**: a `BLUEPRINT`-colored floor-plan of a room, strokes drawing themselves via `stroke-dashoffset`, dimension ticks and mono callouts (`3600mm`, `SEC A-A`) fading in around it.
- Over ~1.2s the wireframe **dissolves into the actual render** — a WebGL noise-threshold shader wipes from draft to photo. Warm light floods in.
- Display type, left-aligned on the asymmetric grid:
  > **AACHAL**
  > **RANNAWARE**

  Per-character mask reveal, staggered 24ms, `cubic-bezier(0.16, 1, 0.3, 1)`.
- Under it, mono: `INTERIOR DESIGNER — MAHARASHTRA, IN — EST. 2022`
- Right column, small caps: *"Creating sophisticated spaces that blend functionality with aesthetic excellence."*
- Bottom bar: live local time in IST, scroll cue, `[01 / 08]`.
- Continuous slow parallax on the render, mouse-reactive at ±8px.

### 02 · Manifesto

Full-bleed Ink. One centered statement at `clamp(2rem, 5vw, 4.5rem)` — the design philosophy, split into lines that reveal on scroll:

> *"Great interior design goes beyond aesthetics. It's about creating spaces that resonate with the people who inhabit them."*

Below: an infinite marquee of capabilities in mono — `SPACE PLANNING · COLOR THEORY · MATERIAL SELECTION · LIGHTING DESIGN · 3D VISUALIZATION · ERGONOMICS · SUSTAINABLE PRACTICE ·` — scroll-velocity-reactive (speeds up and skews when you scroll fast). Cheap to build, disproportionately impressive.

### 03 · Selected Works — horizontal cinematic scroll

The centrepiece. The section pins; vertical scroll translates the track horizontally.

Each project is a full-height panel:

- Large render, `clip-path` reveal on enter, inner parallax.
- Oversized index numeral `01` bleeding off the frame edge.
- Title in Fraunces, category and year in mono.
- Hover: WebGL displacement ripple across the image, cursor swaps to a `VIEW CASE` label.
- Click routes to the case study — the image scales into the detail hero as a shared element.

Panels: `01 Master Bedroom` · `02 Modular Kitchen Plan` · `03 Comprehensive Residential Suite` · `04 Let's build yours →` (CTA panel).

Mobile: converts to a snap-scroll vertical stack with sticky captions. Touch users also get native horizontal drag.

### 04 · Process — pinned 5-step sequence

**This is the section that gets you hired.** Pins for 5 viewport-heights. Left column: step number, title, copy. Right column: an SVG that *redraws itself* at each step, walking the same room from plan to render.

| # | Step | Right-panel visual |
|---|---|---|
| 01 | Brief and Discovery | Empty shell outline, client notes as mono annotations |
| 02 | Space Planning | Walls and furniture blocks snap into place, dimensions tick on |
| 03 | Material and Colour | Blueprint fills with swatch chips — oak, brass, linen, stone |
| 04 | 3D Visualisation | Wireframe → SketchUp massing → V-Ray render crossfade |
| 05 | Documentation and Handover | Sheet border, title block, `SCALE 1:50`, stamp |

Mobile: unpins into 5 stacked cards, each animating on enter.

### 05 · Craft

**Kill the percentage bars.** "AutoCAD 95%" is unverifiable and reads junior. Replace with:

- **Tool wall**: 8 tools as a hoverable grid — AutoCAD, SketchUp, V-Ray, Enscape, Lumion, Photoshop, CorelDRAW, Canva. Real monochrome SVG logos, not emoji. Hover lifts the tile and reveals the discipline and where it sits in the workflow.
- **Capability matrix**: three columns — *Design Software · Design Expertise · Professional Practice* — each a clean typographic list with a mono `→` marker. Named skills, no fake numbers.
- **Proficiency, honestly stated**: `PRIMARY` / `FLUENT` / `WORKING` tiers as mono tags. Credible, and a hiring manager can actually use it.

### 06 · About

Bone section — the site opens up and breathes.

- Editorial two-column: portrait (or a signature render) with a `clip-path` reveal, held in an oversized asymmetric frame with a hairline offset border.
- Bio uses the existing three paragraphs, set at a comfortable measure with a large Fraunces drop-cap.
- **Numbers** set as editorial statistics, not cards — huge Fraunces numerals with mono labels beneath, counting up on enter: `3+ YEARS` · `20+ CLIENTS` · `15+ PROJECTS DELIVERED` · `9.8/10 SATISFACTION`
- Inline `Download CV` — magnetic button, downloads `/resume.pdf`.

### 07 · Contact

Ink. Deliberately huge.

- `LET'S BUILD` / `SOMETHING` / `LASTING` — three lines at `clamp(3rem, 11vw, 11rem)`, line-by-line mask reveal.
- Email as an oversized link with an underline that draws on hover.
- **Real, working form** (see §6.3) — floating-label fields with hairline underlines, no boxes. Submit is a magnetic button with a draw-in arrow; success plays a checkmark stroke animation, not a toast.
- Contact block in mono: email · phone · Maharashtra IN · LinkedIn.

### 08 · Footer

Giant `AACHAL RANNAWARE` wordmark clipped at the baseline, filling the width. Live IST clock. `© 2026`. Back-to-top with a magnetic pull.

### Case study route `/work/:slug`

For each project: hero render → the brief → constraints → space-plan drawing → material palette (actual swatch chips) → render gallery (the 9 residential images live here) → tools used → outcome → next-project link. PDF deliverables (`master-bedroom-project.pdf`, `modular-kitchen-plan.pdf`) embed as a viewer, not a bare download link.

---

## 5. Animation system

Every animation obeys one rule: **it must serve the draft→render story or the reading order.** Anything that moves just because it can gets cut.

### 5.1 Foundations

- **Lenis** smooth scroll (`lerp: 0.09`) synced to framer-motion's scroll driver. This single change makes the whole site feel expensive.
- Shared easing: `EASE_OUT_EXPO = [0.16, 1, 0.3, 1]`, `EASE_IN_OUT = [0.83, 0, 0.17, 1]`.
- Durations: micro 200ms · standard 600ms · cinematic 1200ms. No exceptions.

### 5.2 The catalogue

| Effect | Where | Tech |
|---|---|---|
| Counter + curtain entry | Preloader | framer-motion + SVG stroke |
| Per-character mask reveal | All display headings | Custom `<SplitText>` + `overflow: hidden` spans |
| Line mask reveal | Body copy, manifesto | Same, at line granularity |
| Draft→render dissolve | Hero, Process step 04 | WebGL noise-threshold shader |
| SVG self-drawing linework | Hero, Process | `stroke-dasharray` + `useScroll` |
| `clip-path` image reveal | Works, About | framer-motion `clipPath` |
| Inner-frame parallax | Every image | `useScroll` + `useTransform` on child |
| Horizontal pinned scroll | Selected Works | `useScroll` → `x` transform |
| Sticky step sequence | Process | Scroll progress → step index |
| Velocity-skew marquee | Manifesto | `useVelocity` → `skewX` + speed |
| Magnetic cursor + labels | Global | `mousemove` + spring, `mix-blend-mode: difference` |
| Hover displacement ripple | Project images | WebGL via `ogl` |
| Number count-up | About | `useMotionValue` + `animate` |
| Shared-element route transition | Home → case study | framer-motion `layoutId` + `AnimatePresence` |
| Section curtain wipe | Ink↔Bone joins | Scroll-linked `scaleY` panel |
| Magnetic buttons | All CTAs | Spring on pointer distance |
| Film grain | Global overlay | Fixed SVG turbulence |

### 5.3 Reduced motion — non-negotiable

A single `useReducedMotion()` gate at the provider level. Under `prefers-reduced-motion: reduce`:

- the preloader is skipped and the WebGL layer never mounts (a static render is served instead),
- pinning and horizontal scroll become normal vertical stacks,
- all reveals collapse to a 200ms opacity fade,
- the marquee freezes and the cursor reverts to native.

The site must be fully usable and still *look good* with zero motion. If it is not, the motion is load-bearing and that is a bug.

---

## 6. Technical plan

### 6.1 Dependencies

**Add**

```
lenis                       ~3 KB   smooth scroll
ogl                        ~18 KB   WebGL shaders (hero dissolve + hover displacement)
```

**Optional, only if we go full 3D**

```
three + @react-three/fiber + @react-three/drei    ~160 KB gz
```

> **Recommendation: start with `ogl`.** It delivers roughly 90% of the visual payoff at about 12% of the bundle. R3F is only worth it if we later want an actual explorable 3D room. The WebGL layer is `React.lazy` + dynamic-import gated behind `IntersectionObserver`, device-memory, and reduced-motion checks — it never blocks first paint.

**Remove** — ~40 unused shadcn components, plus `recharts`, `embla-carousel-react`, `react-day-picker`, `input-otp`, `vaul`, `cmdk`, `react-resizable-panels`, `date-fns`, `next-themes`, `@tanstack/react-query`. Cuts the dependency tree by roughly half and speeds every build.

**Fonts** self-hosted as `woff2` in `/public/fonts` with `font-display: swap` and preload. No render-blocking Google Fonts request.

### 6.2 Image pipeline — mandatory, do this first

60 MB is a non-starter. One-time `scripts/optimize-images.mjs` using `sharp`:

- Emit **AVIF + WebP + JPEG fallback** at widths `[480, 960, 1440, 1920, 2560]`.
- Generate a 20px **LQIP blur placeholder** per image, inlined as base64 in `src/data/images.ts`.
- Serve via a `<Picture>` component with correct `sizes`, `loading="lazy"` (hero is `eager` + `fetchpriority="high"`), and explicit `width`/`height` to kill CLS.
- Target: **≤ 2.5 MB** for the full initial viewport. Expect ~95% reduction with no visible quality loss.
- Rename the WhatsApp files to semantic slugs (`residential-living-04.jpg` and so on).

### 6.3 The contact form

Currently fake. Wire it to **Web3Forms** (free, no backend, only a public access key in the client) or **Formspree**. Add:

- `zod` + `react-hook-form` validation (both already installed),
- a honeypot field for spam,
- real pending / success / error states,
- a `mailto:` fallback if the request fails.

Shipping a form that silently discards messages is a genuine liability if a recruiter uses it.

### 6.4 New file structure

```
src/
  app/
    providers.tsx           Lenis + reduced-motion + cursor context
    routes.tsx
  components/
    layout/                 Nav, SectionRail, Footer, Grain, Cursor, Preloader
    sections/               Hero, Manifesto, Works, Process, Craft, About, Contact
    motion/                 SplitText, RevealImage, Magnetic, Marquee, Counter, Parallax
    webgl/                  DissolveCanvas, DisplacementImage, shaders/
    ui/                     Button, Tag, Picture, Field   (trimmed shadcn only)
  data/
    profile.ts              name, role, contact, socials, stats
    projects.ts             the 3 projects + full case-study bodies
    process.ts              5 steps
    craft.ts                tools + capability matrix
    images.ts               generated srcsets + LQIP
  hooks/
    useScrollProgress.ts  useLenis.ts  useMagnetic.ts  useMediaQuery.ts
  styles/
    tokens.css  typography.css  index.css
  pages/
    Home.tsx  CaseStudy.tsx  NotFound.tsx
```

**All copy moves into `src/data/*`.** Content stops living inside JSX — editing text never risks breaking a component again.

### 6.5 SEO and polish

- Per-route `<title>`/meta/OG via `react-helmet-async`; a real OG image (1200×630) instead of the missing one.
- `Person` + `CreativeWork` JSON-LD — helps her name rank.
- `sitemap.xml`, and fix the canonical (it currently points at the dead `aachal-portfolio.lovable.dev`).
- Custom favicon + `site.webmanifest`.
- Netlify `_redirects` with `/* /index.html 200` so `/work/:slug` deep links do not 404.
- README rewritten — right now it is Lovable boilerplate, and an interviewer *will* open the repo.

---

## 7. Budgets — the plan fails if these fail

| Metric | Target |
|---|---|
| LCP (4G, mid Android) | < 2.0 s |
| CLS | < 0.05 |
| INP | < 200 ms |
| Initial JS | < 180 KB gz (excl. lazy WebGL) |
| Initial images | < 2.5 MB |
| Lighthouse Perf / A11y | ≥ 90 / ≥ 95 |
| Sustained scroll FPS | 60 on a 2020 laptop |

**Accessibility:** full keyboard path (pinned sections must be escapable by keyboard), visible focus rings, `prefers-reduced-motion` honoured everywhere, AA contrast on both themes, alt text on every render, `aria-live` on form status, skip-to-content link.

---

## 8. Build phases

Each phase is independently shippable — the site is never broken between phases.

### Phase 1 — Foundation *(no visual change yet)*

- [ ] Prune unused deps and shadcn components
- [ ] Build `scripts/optimize-images.mjs`; generate AVIF/WebP/LQIP; wire `<Picture>`
- [ ] Self-host Fraunces + Satoshi + JetBrains Mono
- [ ] Replace `index.css` with the new token system; rewrite `tailwind.config.ts`
- [ ] Extract all content into `src/data/*`
- [ ] Set up the new folder structure and `providers.tsx`

### Phase 2 — Motion core

- [ ] Lenis + reduced-motion provider
- [ ] `SplitText`, `RevealImage`, `Parallax`, `Magnetic`, `Marquee`, `Counter`
- [ ] Custom cursor, film grain, scroll-progress hairline
- [ ] Shared easing/duration constants

### Phase 3 — Shell

- [ ] Glass nav pill with scroll-aware state
- [ ] Right-edge section rail with live index
- [ ] Footer with wordmark and IST clock
- [ ] Route scaffolding + `AnimatePresence` page transitions

### Phase 4 — The Hero *(the wow)*

- [ ] SVG blueprint linework with self-drawing strokes
- [ ] `ogl` dissolve shader, lazy and gated
- [ ] Display type reveal, mouse parallax, static fallback
- [ ] Preloader entry sequence

### Phase 5 — Works

- [ ] Horizontal pinned scroll track + mobile fallback
- [ ] Project panels with reveal and inner parallax
- [ ] Hover displacement + contextual cursor
- [ ] `/work/:slug` case-study template + shared-element transition

### Phase 6 — Narrative sections

- [ ] Manifesto + velocity-reactive marquee
- [ ] Process pinned 5-step sequence with redrawing SVG
- [ ] Craft: tool wall + capability matrix (bars deleted)
- [ ] About: editorial layout + counters

### Phase 7 — Contact and close

- [ ] Oversized contact type + real Web3Forms/Formspree wiring
- [ ] Validation, honeypot, success animation, mailto fallback
- [ ] Footer polish

### Phase 8 — Hardening

- [ ] Full keyboard and screen-reader pass
- [ ] Reduced-motion pass on every section
- [ ] Mobile pass at 360 / 390 / 768 / 1024 / 1440 / 2560
- [ ] Safari + Firefox check (`clip-path`, `mix-blend-mode`, WebGL)
- [ ] Lighthouse until budgets are green

### Phase 9 — Ship

- [ ] SEO, JSON-LD, OG image, sitemap, manifest, `_redirects`
- [ ] README rewrite
- [ ] Netlify deploy + custom domain

---

## 9. What I need from you

Blanks that would make this materially stronger. **None of these block Phase 1** — I can start immediately and slot them in as they arrive.

**High impact**

1. **Professional portrait** — the About section is built around one. A good photo is the single biggest credibility lever on the page.
2. **CV specifics from `resume.pdf`** — education (institute and years), employment history with dates, certifications. I could not extract the PDF text locally (no `poppler` on this machine). A timeline section reads far more hireable than "3+ years."
3. **Per-project details** — for each of the 3 projects: client type, area (sq ft), timeline, budget band, and the *actual constraint that was solved*. Case studies are what interviewers ask about; renders alone cannot answer them.
4. **Original-resolution renders** — the current PNGs are huge, but I want to confirm they are genuinely high-res before compressing. If the raw V-Ray/Enscape exports exist, those are better sources.

**Nice to have**

5. Testimonials or a referee quote (even one).
6. Process artefacts — mood boards, hand sketches, AutoCAD screenshots, material flat-lays. These make the Process section real instead of illustrative.
7. Confirm where the `9.8/10` satisfaction figure comes from. If it is an estimate we should soften or drop it — a sharp interviewer will ask.
8. Where should the contact form deliver — `aachalr579@gmail.com`, or somewhere else?

---

## 10. Decisions to confirm before Phase 1

| # | Decision | My recommendation |
|---|---|---|
| 1 | Warm **Atelier** palette (bone/ink/clay) vs. keeping the current cool dark blue | **Atelier.** Warm neutrals make interior renders glow; the blue fights them. |
| 2 | Light-primary with dark cinematic sections vs. all-dark | **Alternating.** The Ink↔Bone rhythm is a differentiator on its own. |
| 3 | `ogl` (18 KB) vs. full React Three Fiber (160 KB) | **`ogl`.** Same payoff, a fraction of the weight. |
| 4 | Multi-route case studies vs. staying single-page | **Multi-route.** Depth is what converts an interview. |
| 5 | Retire Playfair + Inter | **Yes.** They are the template signature we are escaping. |
| 6 | Delete the `%` skill bars | **Yes.** Unverifiable numbers read junior. |
| 7 | Day/night toggle | **Skip it.** One opinionated art direction is stronger; revisit post-launch. |

---

**Next step:** confirm §10 (or just say "go with your recommendations") and I will start Phase 1 — image pipeline and design tokens, since everything else sits on top of those.
