# REF-MODAL-LOOK — Visual Design DNA Reference

> **Status:** Live capture — DOM + screenshots, 2026-06-27
> **Source:** https://modal.com (homepage, /docs, /blog, /pricing)
> **Purpose:** Reference for "cinematic / Awwwards premium-tech" aesthetic target.
> **NOT a clone.** Extract the LOOK — leave their content, copy, and identity behind.

Screenshots in `assets/ref/modal/`.

---

## PALETTE

Modal's palette is strikingly disciplined: essentially monochromatic dark-green with one neon accent.

| Role | Hex | Observed RGB | Source |
|---|---|---|---|
| Page background | `#000000` | `rgb(0, 0, 0)` | `getComputedStyle(body).backgroundColor` |
| Dark surface (nav, cards) | `#212525` | `rgb(33, 37, 37)` | `getComputedStyle(nav)` + class `bg-dark-gray` |
| Card dark background | `#141614` | `rgb(20, 22, 20)` | `linear-gradient(rgb(20, 22, 20), rgb(20, 22, 20))` on feature cards |
| Primary foreground / headings | `#DDFFDC` | `rgb(221, 255, 220)` | `getComputedStyle(body).color` + h1/h2 computed color |
| Accent — brand green | `#7FEE64` | `rgb(127, 238, 100)` | CTA button bg, announcement bar text, logo |
| Body / secondary text | `#8CAB87` | `rgb(140, 171, 135)` | `getComputedStyle(p).color` |
| Tertiary / muted text | `#5B6D5C` | `rgb(91, 109, 92)` | Section class `text-[#5B6D5C]` |
| Light break section bg | `#DEF0DD` | `rgb(222, 240, 221)` | `marketing-light-bg-container-deprecated` section |
| Black-on-light text | `#000000` | `rgb(0, 0, 0)` | h4 on light section, button text on accent |
| Darkish body text (light sections) | `#222222` | `rgb(34, 34, 34)` | h4 computed on light background section |

**Overall darkness:** Near absolute. `#000000` base. The `#DDFFDC` near-white is warm — it has a detectable green cast, not pure white. This is intentional brand colour harmony.

**Dual-mode layout:** The page alternates between pure-black sections and a single pale sage section (`#DEF0DD`). That single break creates dramatic contrast and a visual "landing" moment mid-scroll. See `modal-scroll-2500.png`.

**Accent restraint:** `#7FEE64` appears in exactly 4 places: announcement bar, logo mark, CTA button fill, and 1 highlighted word per headline. Nowhere else. The rest is black / dark-gray / near-white. This restraint is what makes the accent pop.

---

## DEPTH & LAYERING

Modal creates premium depth through 4 layering techniques, not shadows.

### 1. Hero Video Mask — Double Fade-to-Black
A full-screen video/particle animation plays behind the hero content. Two gradient overlays sandwich it:

```css
/* Top mask (observed: .gradient-overlay-top) */
background-image: linear-gradient(
  rgb(0, 0, 0) 0%,
  rgb(0, 0, 0) 20%,
  rgba(0, 0, 0, 0.95) 30%,
  rgba(0, 0, 0, 0.9) 40%,
  rgba(0, 0, 0, 0.6) 70%,
  rgba(0, 0, 0, 0) 100%
);

/* Bottom mask (observed: .gradient-overlay-bottom) */
background-image: linear-gradient(
  rgba(0, 0, 0, 0) 0%,
  rgba(0, 0, 0, 0.6) 30%,
  rgba(0, 0, 0, 0.9) 60%,
  rgba(0, 0, 0, 0.95) 70%,
  rgb(0, 0, 0) 80%,
  rgb(0, 0, 0) 100%
);
```

Effect: The animation is visible only in the middle 20–60% of the hero vertically. Content floats cleanly above and below with full-black bleed.

### 2. Feature Cards — Radial Glow + Dark Base
Each feature card is a dark panel (`#141614`) with a corner-positioned radial gradient glow. The glow position varies per card for visual variety:

```css
/* Left-edge glow (card 1) */
background-image:
  radial-gradient(60% 80% at -8% 50%, rgba(127, 238, 100, 0.55), rgba(127, 238, 100, 0) 65%),
  linear-gradient(rgb(20, 22, 20), rgb(20, 22, 20));

/* Right-edge glow (card 2) */
background-image:
  radial-gradient(60% 80% at 108% 35%, rgba(127, 238, 100, 0.55), rgba(127, 238, 100, 0) 65%),
  linear-gradient(rgb(20, 22, 20), rgb(20, 22, 20));

/* Bottom-right yellow-green (card 3 - yellower) */
background-image:
  radial-gradient(55% 75% at 80% 115%, rgba(210, 225, 80, 0.55), rgba(210, 225, 80, 0) 60%),
  linear-gradient(rgb(20, 22, 20), rgb(20, 22, 20));
```

Cards have visible hairline borders (green-tinted, ~30% opacity) — class `border-landing-medium-green-border`.

### 3. Blog Post Cards — Bottom Scrim
Blog thumbnails use a bottom scrim so text overlays images cleanly:

```css
background-image: linear-gradient(to top, rgb(33, 37, 37), rgba(0, 0, 0, 0));
```

### 4. Floating Pill Nav
The nav is a dark-gray (`#212525`) rounded-full pill that floats above the page with a subtle drop shadow. It doesn't span full-width — it's a contained element that reads as a layer above the page content. Observed box-shadow: `rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px`.

### 5. Footer Grand Radial Bloom
At the very bottom of the page, a massive radial glow creates a horizon effect:

```css
background-image: radial-gradient(
  165% 110% at 50% 100%,
  rgba(128, 238, 100, 0.4) 0%,
  rgba(128, 238, 100, 0.22) 22%,
  rgba(128, 238, 100, 0.1) 42%,
  rgba(128, 238, 100, 0.03) 65%,
  rgba(128, 238, 100, 0) 92%
);
```

Width: `180vw`, centered, absolute positioned. Creates an "otherworldly light source" below the content.

---

## GLOW / LIGHTING

**Philosophy:** Glows are all monochromatic — green only. No purple, no cyan, no rainbow. The single hue discipline is what keeps it premium and not gamery.

**Active glows observed:**
- Feature card corner glows: `rgba(127, 238, 100, 0.55)` max opacity, always fade to 0 at 65% radius
- Workload interactive glows (two simultaneous sources per card):
  ```css
  radial-gradient(55% 45% at 45% -8%, rgba(195, 198, 64, 0.85) 0%, rgba(120, 130, 30, 0.55) 22%, rgba(0, 0, 0, 0) 65%),
  radial-gradient(35% 45% at 105% 32%, rgba(120, 220, 130, 0.75) 0%, rgba(40, 140, 70, 0.45) 25%, rgba(0, 0, 0, 0) 70%)
  ```
  Note the dual-source: one yellow-green from top, one pure green from side. Sophisticated, not cartoonish.

**Restraint rules observed:**
- Max glow opacity at source: ~0.85 (never 1.0)
- Glow radius: never fills more than 65% of its container
- Glow color is always a tint of the brand accent (`#7FEE64` / `#80EE64`), never white or arbitrary RGB
- Glows trigger on hover/state changes (`transition-opacity duration-500` class)
- Background pages (blog, docs): NO glows. Glows are homepage-only premium treatment.

---

## SPACING & RHYTHM

**Observed via getComputedStyle + class analysis:**

| Token | Value | Source |
|---|---|---|
| Container max-width | `1400px` | `.marketing-container` computed maxWidth |
| Container side padding | `48px` (3rem) | `.marketing-container` paddingLeft/Right |
| Section vertical rhythm | `128px` top / `120px` bottom | `-mt-32 mb-16` on hero section; `my-32`/`lg:my-40` (Tailwind 32=8rem=128px) |
| Large section gap | `160px` (10rem) | `lg:my-40` |
| Card grid gap | `32px` (2rem) | `gap-8` Tailwind |
| Light bg section padding | `96px top/bottom (py-24 sm)` | `.marketing-light-bg-container-deprecated.py-16.sm:py-24` |

**Grid feel:** Spacious. Wide gutters. Content never touches container walls. Sections breathe with `my-32` (128px) rhythm. This is the single most differentiating density choice — NOT cramming features, even below the fold.

**Logo strip:** Full-width `overflow-x-clip` marquee with no padding constraints. Logos appear at reduced opacity (muted white on black). Creates a seamless horizontal texture.

---

## TYPOGRAPHY

### Font Stack (observed via @font-face + getComputedStyle)

| Face | Role | Source | Weights |
|---|---|---|---|
| `Goga` | Display / headings | Custom/proprietary (not on Google Fonts) | 400, 500 |
| `Inter Variable` | Body / UI / nav | Variable font | 400, 500 |
| `Fira Mono` | Code blocks | Loaded from `/_app/immutable/assets/` | 400, 500, 700 |

**Goga** is the key differentiator — a custom display typeface with soft geometric characteristics. Not commercially available; this is a Modal brand exclusive.

### Type Scale (observed via getComputedStyle)

| Element | Size | Line Height | Weight | Letter Spacing | Color |
|---|---|---|---|---|---|
| h1 | 64px | 64px (1:1 ratio) | 500 | normal | `#DDFFDC` |
| h2 | 54px | 59.4px (1.1×) | 400 | normal | `#DDFFDC` |
| h3 | 30px | 36px (1.2×) | 400 | -0.36px | `#DDFFDC` |
| h4 (light sections) | 30px | 36px | 400 | normal | `#000000` |
| p (dark sections) | 20px | 30px (1.5×) | 400 | -0.36px | `#8CAB87` |
| nav links / a | 14px | 20px (1.43×) | 500 | -0.36px | varies |
| Category labels | ~11-12px | — | 500-600 | 0.08em+ | `#5B6D5C` |

**Key observations:**
- h1 line-height is 1:1 (tight, cinematic). Not the default 1.2-1.5 — headlines feel bold and packed.
- Body text is `#8CAB87` (muted green), never pure white — maintains green-family harmony.
- Category labels (e.g. "MODAL SDK", "WORKLOADS") appear in small-caps-adjacent style, wide tracking, muted color. Acts as visual eyebrow above headlines.
- Letter-spacing on body and h3: `-0.36px` — a slight optical tightening that reads as premium.

### Typographic Accent Trick
The most Awwwards-legible trick: **single word in accent green inside the headline**, rest in near-white. Observable on: "AI **infrastructure** that developers love" (hero), "Pricing as **magical** as our product" (pricing).

---

## MOTION

> Observed from class names and transitions. No live motion recording possible — behavioral description from DOM evidence.

**Transition primitives observed:**
- `transition-opacity duration-500` — used on workload glow overlays (`.workload-glow`). Glows fade in/out on hover.
- `group` / `group-hover` pattern — blog cards use Tailwind group hover to animate children.
- Hero: full-screen particle/network animation plays behind the double-fade mask.

**Motion philosophy inferred from structure:**
- **Performance-first**: transitions are opacity-only (GPU composited). No layout-triggering animations.
- **Content-first**: hero text appears immediately; the animation behind it is decoration, not the focus.
- **Hover micro-feedback**: Buttons and cards respond. The glow overlays reveal on hover.
- **Scrolling marquee**: Logo strip appears to scroll continuously (overflow-x-clip + marquee pattern).
- **No scroll-triggered reveals / GSAP fireworks**: Modal feels understated in motion. Premium ≠ dramatic. The restraint is the premium.

---

## PREMIUM HIERARCHY CUES

The specific tricks that read as Awwwards / high-end tech:

### 1. Floating Pill Nav (not a full-width header)
A dark rounded-full pill (`border-radius: ~33554432px`) that floats above content. Feels lightweight and confident. Avoids the "corporate banner" look of full-width headers. Announcement bar above it is a separate full-width strip.

### 2. Custom Typeface — Goga
`Goga` is not on Google Fonts. The instant a user subconsciously recognizes "this isn't Inter/DM Sans/Outfit," the page reads as invested-in. It's soft but geometric — feels futuristic without being sci-fi cliché.

### 3. Dual Section Palette Flip
The page flips from pure black → sage green (`#DEF0DD`) → pure black. The single light section creates a structural "chapter break" and makes the product categories section feel editorial, not like another dark panel.

### 4. Near-White-with-Tint (not pure white)
All "white" text is `#DDFFDC` — a very slight green cast. This is imperceptible consciously but creates subconscious palette harmony. Pure `#FFFFFF` would feel disconnected from the accent.

### 5. Accent-as-Keyword in Headlines
One word in `#7FEE64` per headline. Not a gradient, not rainbow — one precise word. This is a precision tool: "AI **infrastructure** that developers love." The eye catches the green, then reads the full sentence. Forces reading direction.

### 6. Feature Card Varied Glow Positions
Each feature card has a radial glow emanating from a different corner/edge. Card 1: left edge. Card 2: right edge. Card 3: bottom-right at 115%. This variation prevents the "same component stamped 4 times" feeling and creates visual tension.

### 7. Monospace Code as Product Proof
Real code (`@app.function(image=..., gpu="B200")`) rendered in Fira Mono inside dark feature cards. Not mockups — actual Python syntax. For developer audiences, this functions as credibility signal and visual texture simultaneously.

### 8. 1400px Container — Unusually Wide
Most tech sites cap at 1280px or 1200px. Modal's `1400px` with `48px` gutters means content breathes wider than competitors at the same viewport. At 1440px viewport, nearly edge-to-edge.

### 9. Footer Radial Bloom — The Grand Exit
The `180vw` wide radial-gradient bloom at the page bottom is a cinematic move. It feels like a light source from below the horizon — otherworldly, sci-fi without being explicit about it. No other section has this; the singularity is the point.

### 10. Muted Partner Logos on Black
Logo marquee in low-opacity near-white on pure black. No logo gets brand color treatment. This communicates confidence: we don't need to shout about partners. The restraint reads as premium.

---

## QUICK-REFERENCE TOKEN EXTRACTION

```
/* For direct use in our dark sci-fi system */

/* Backgrounds */
--bg-base:          #000000;
--bg-surface:       #212525;
--bg-card:          #141614;
--bg-light-break:   #DEF0DD;

/* Foreground */
--fg-primary:       #DDFFDC;   /* near-white, green-tinted */
--fg-secondary:     #8CAB87;   /* muted green body text */
--fg-tertiary:      #5B6D5C;   /* dimmer labels */
--fg-on-light:      #000000;

/* Accent */
--accent:           #7FEE64;   /* brand green — use sparingly */

/* Glow source color */
--glow-color:       rgba(127, 238, 100, 0.55);  /* max opacity for card corner glows */
--glow-wide:        rgba(128, 238, 100, 0.40);  /* max opacity for page-level blooms */

/* Container */
--container-max:    1400px;
--container-px:     48px;

/* Section rhythm */
--section-y:        128px;   /* 8rem / my-32 */
--section-y-lg:     160px;   /* 10rem / my-40 */

/* Typography */
--font-display:     'Goga', ui-sans-serif;         /* custom — substitute with closest available */
--font-body:        'Inter Variable', ui-sans-serif;
--font-mono:        'Fira Mono', ui-monospace;

/* Type scale */
--text-hero:        64px;   /* 64/64 tight */
--text-h2:          54px;   /* 54/59.4 */
--text-h3:          30px;   /* 30/36 */
--text-body:        20px;   /* 20/30 */
--text-ui:          14px;   /* 14/20 */
```

---

## SCREENSHOTS INDEX

| File | Content |
|---|---|
| `assets/ref/modal/modal-hero.png` | Homepage hero — nav, h1, CTAs, partner strip |
| `assets/ref/modal/modal-scroll-600.png` | Feature section — code card + benchmark card |
| `assets/ref/modal/modal-scroll-1400.png` | Feature grid — GPU selector card + observability card |
| `assets/ref/modal/modal-scroll-2500.png` | Workload section — LIGHT BREAK (`#DEF0DD`) with 3-col grid |
| `assets/ref/modal/modal-full.png` | Full homepage (scrolled full) |
| `assets/ref/modal/modal-pricing.png` | Pricing page — shows "magical" accent-word trick + pricing table |
| `assets/ref/modal/modal-docs.png` | Docs page — shows 4-col card grid with green icons |
| `assets/ref/modal/modal-blog.png` | Blog page — shows pill filter tabs, hero post layout |
| `assets/ref/modal/modal-mobile.png` | Mobile viewport (390px) |

---

## WHAT NOT TO COPY (avoid direct cloning)

- The `Goga` typeface (proprietary — not licensable)
- The floating particle/network hero animation (Modal's signature)
- Any copy, pricing, product names, or brand claims
- The exact logo treatment or the M-diamond mark

**Translate the VIBE:** Black + single green accent + custom display typeface + restrained glows + wide container + dramatic section palette flip. That is the transferable DNA.
