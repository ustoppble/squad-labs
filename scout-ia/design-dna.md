# Design DNA — Apple.com (Live Capture 2026-06-26)

> Source: Playwright live capture of https://www.apple.com/ at 1440×900 (desktop) and 390×844 (mobile).
> All `observed` values come from `getComputedStyle()` or CSS `:root` vars extracted from the live DOM.
> Applied context: premium SaaS landing page for AI-powered daily sales email (infoprodutores).

---

## 1. Visual Theme & Atmosphere

Feels like standing in a very clean room where the product is the only thing you are allowed to look at. Everything else — the background, the layout structure, the typography — exists to disappear. White space is the dominant visual element, not a gap between elements. Sections are full-bleed tiles with enormous breathing room. Typography is so large it becomes the image. Product photography occupies 60–80% of each section canvas. Motion is barely perceptible: things arrive, they don't perform.

**Key Characteristics:**
- White (#FFFFFF) or near-white (#F5F5F7) backgrounds dominate; dark sections (#1D1D1F) appear for contrast beats
- Zero decorative elements — no icons used as filler, no gradient overlays for "energy"
- Each page section is a self-contained composition: headline + subhead + CTA + product visual, nothing else
- Vertical rhythm is generous: main content begins at 114px from top (nav 44px + clearance)
- Typography does the design work — at 40–80px with tight letter-spacing, it is the hero
- CTAs are capsule pills, never loud; they invite rather than demand
- The nav is a 44px frosted-glass bar that disappears into the page

---

## 2. Color

### Core Palette

| Role | Hex | CSS Var | Confidence |
|---|---|---|---|
| Base background | `#FFFFFF` | `--sk-body-background-color` | observed |
| Surface secondary | `#FAFAFC` | `--sk-fill-secondary` | observed |
| Surface tertiary | `#F5F5F7` | `--sk-fill-tertiary` | observed |
| Dark surface | `#1D1D1F` | `--sk-fill-gray` | observed |
| Dark surface mid | `#333336` | (computed on nav flyout links) | observed |
| Primary text | `#1D1D1F` | `--sk-body-text-color` | observed |
| Secondary text | `#6E6E73` | `--sk-glyph-gray-secondary` | observed |
| Tertiary text | `#86868B` | `--sk-glyph-gray-tertiary` | observed |
| Accent / CTA fill | `#0071E3` | `--sk-fill-blue` | observed |
| Link / ghost CTA | `#0066CC` | `--sk-body-link-color` | observed |
| Focus ring | `#0071E3` | `--sk-focus-color` | observed |
| Nav glass bg | `rgba(255,255,255,0.80)` | computed on `.globalnav` | observed |
| Product Red | `#AF1E2D` | `--sk-productred` | observed |
| Env Green | `#00D959` | `--sk-enviro-green` | observed |

### Semantic Pairings

- **Light section:** bg `#FFFFFF`, text `#1D1D1F`
- **Warm light section:** bg `#F5F5F7`, text `#1D1D1F`
- **Dark section:** bg `#1D1D1F`, text `#FFFFFF`, subhead `rgba(255,255,255,0.56)`
- **Dark-on-dark section:** bg `#333336`, text `#FFFFFF`

### Gradient System

Apple uses gradients sparingly and only for content-legibility overlays, never for decoration:

```css
/* Media gallery readability vignette — bottom-left corner fade */
radial-gradient(100% 33% at 0% 100%, rgba(0,0,0,0.50) 0%, rgba(255,255,255,0) 100%)

/* Full-bleed gallery top/bottom edge fade (dark → transparent → dark) */
linear-gradient(
  rgba(29,29,31,0.40) 0%,
  rgba(29,29,31,0) 70px,
  rgba(29,29,31,0) calc(100% - 70px),
  rgba(29,29,31,0.40) 100%
)
```

**No decorative hero gradients.** No purple-to-blue. No trust-gradient. Flat colored sections only.

---

## 3. Typography

### Font Families

Apple uses its proprietary **SF Pro** typeface system. For web replication use:

```css
/* Display — large headings, hero text */
--font-display: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;

/* Text — body, nav, small UI */
--font-text: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
```

Fallback stack for non-Apple systems: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` — the `-apple-system` alias resolves to SF Pro on macOS/iOS natively.

### Type Scale (observed + inferred for SaaS context)

All sizes below use `clamp()` for fluid scaling between 390px and 1440px viewports.

| Role | CSS Var | Min | Ideal | Max | Weight | Line-height | Letter-spacing | Confidence |
|---|---|---|---|---|---|---|---|---|
| **Display / Hero** | `--text-display` | 48px | 5.5vw | 80px | 600 | 1.05 | -0.025em | inferred (from Apple product pages pattern) |
| **H1 / Section headline** | `--text-h1` | 36px | 4vw | 64px | 600 | 1.08 | -0.022em | inferred |
| **H2 / Product feature** | `--text-h2` | 28px | 3vw | 48px | 600 | 1.10 | -0.015em | inferred |
| **H3** | `--text-h3` | `40px` | `40px` | `40px` | 600 | `44px` (1.10) | `normal` | **observed** (h3 on live DOM) |
| **Large body / Eyebrow** | `--text-lg` | `28px` | `28px` | `28px` | 400 | `32px` (1.14) | `0.007em` | **observed** (p on live DOM) |
| **Body** | `--text-body` | `17px` | `17px` | `17px` | 400 | `25px` (1.47) | `0` | **observed** (body computed) |
| **Small / Nav** | `--text-sm` | `14px` | `14px` | `14px` | 400 | `21px` | `-0.016em` | observed |
| **Caption / Label** | `--text-xs` | `12px` | `12px` | `12px` | 400 | `16px` | `-0.01em` | **observed** (footer h2 labels) |
| **Footnote** | `--text-footnote` | `11px` | `11px` | `11px` | 400 | `1.4` | `0` | observed (--sk-footnote-font-size: 0.6em) |

### Heading Color Rules (observed)
- On light bg: headings use `#1D1D1F`
- On dark bg: headings use `#FFFFFF`
- Eyebrow / category labels: `#6E6E73` (observed on footer category h2s)
- Nav flyout headings 24px/600: `#333336` (observed)

### Critical observations:
- SF Pro Display for anything ≥28px, SF Pro Text for anything <28px
- Letter-spacing goes **negative** at large sizes (tighter as size grows — Apple-specific feel)
- Line-height is **tight at large sizes** (1.05–1.10) and **looser at body** (1.47)
- No italic usage observed anywhere on homepage
- No text-transform: uppercase observed

---

## 4. Spacing & Grid

### Base Unit
Apple's spatial rhythm is built on an 8px base with 4px micro-increments.

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;  /* section inner gap (observed: section margin-bottom 12px) */
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;  /* observed: gallery bottom content padding */
--space-16: 64px;
--space-20: 80px;
--space-28: 114px; /* observed: main padding-top (nav offset) */
```

### Section Vertical Padding

Apple sections are full-bleed with **no horizontal container padding at section level** — the inner content component controls its own inset.

```
Observed spacing:
  main padding-top:    114px  (44px nav + 70px clearance)
  section margin-bottom: 12px (gap between tiles)
  section padding-top:   0px  (full-bleed, tile manages internally)
  section padding-bottom: 0px

Inferred typical tile inner padding (from Apple product pages):
  Small  (mobile):  40px 24px
  Medium (tablet):  60px 48px
  Large  (desktop): 80px 80px → 120px 80px for hero sections
```

### Grid & Layout
- **Nav**: 1440px wide, `height: 44px`, full-bleed
- **Nav flyout**: max-width 1440px, appears at `margin-top: 44px` (observed)
- **Content max-width**: ~980px to 1024px for text columns, full-bleed for image tiles (inferred from Apple's responsive breakpoints)
- **Breakpoints** (observed from CSS vars):
  - Small: 320px–833px
  - Medium: 834px–1023px
  - Large: ≥1024px (large viewport breakpoint)
- **Product grid**: typically 2-col or 3-col tile grid with 12px–13px gutters (observed: `--media-gallery-tile-gap: 13px`)

---

## 5. Layout & Composition

### Page Structure Pattern

```
[NAV 44px glassmorphism]
[HERO SECTION full-bleed — product image occupies 60-80% canvas, text top-center]
[PRODUCT TILE GRID — 2-col or gallery carousel]
[DARK SECTION — contrast beat with white text]
[LIGHT SECTION — feature highlight]
[CTA SECTION — minimal, centered, generous whitespace]
[FOOTER — multi-column directory, #F5F5F7 bg]
```

### Compositional Rules
- **Text block**: centered horizontally, max-width ~640px, headline + 1 subhead line + 2 CTAs
- **Product image**: fills the rest — often edge-to-edge, no drop shadows
- **Text position**: center top (headline over image), or bottom-left on full-bleed canvases
- **Two CTAs per section**: primary pill (filled blue) + secondary pill (ghost blue), side-by-side with 16px gap
- **Section alternation**: white → white → dark → white → gray — never two consecutive dark sections
- **No sidebar layouts**: everything is centered single-column or equal-column grid. No asymmetric master-detail layouts.

---

## 6. Components

### Navigation Bar
```
height:     44px                    (observed: --globalnav-height)
background: rgba(255,255,255,0.80)  (observed: computed on .globalnav)
backdrop-filter: blur(20px)         (inferred: standard Apple glass nav)
border-bottom: none                 (observed: no border in default state)
position: fixed                     (inferred: standard Apple behavior)
z-index: high
logo: centered or left depending on scroll state
links: 12px / 400 / #1D1D1F@80%
```

### Primary CTA Button
```css
/* Observed from live .button element */
background:    #0071E3;
color:         #FFFFFF;
border-radius: 980px;        /* fully round pill */
padding:       11px 21px;
font-size:     17px;
font-weight:   400;
border:        none;
/* hover state: inferred */
background-hover: #0077ED;  /* ~6% lighter */
transition: background 0.2s ease;
```

### Secondary / Ghost CTA Button
```css
/* Observed from live .button-secondary element */
background:    transparent;
color:         #0066CC;
border-radius: 980px;
padding:       11px 21px;
font-size:     17px;
font-weight:   400;
border:        1px solid #0066CC;
/* hover state: inferred */
color-hover: #004499;
border-color-hover: #004499;
```

### Dark Confirm Button (modal/form context)
```css
/* Observed: .ac-ls-button */
background:    #1D1D1F;
color:         #FFFFFF;
border-radius: 8px;
padding:       8px 15px;
font-size:     14px;
font-weight:   400;
```

### "Learn more" Text CTA Link
```css
/* Observed: tile-ctas */
color:           #1D1D1F;   /* on light bg */
font-size:       17px;
font-weight:     400;
text-decoration: none;
/* Arrow chevron appended via CSS content or SVG icon */
display:         inline-flex;
align-items:     center;
gap:             4px;
```
On dark sections the same pattern uses `#FFFFFF` color.

### Section Tile Card
```
background: rgba(0,0,0,0) — transparent, inherits section bg
padding:    0 (section-level); inner component controls
border:     none
border-radius: 0 (tiles are flush) or 18–24px for smaller cards (inferred)
overflow:   hidden
```

### Dropdown / Select
```css
/* Observed: .ac-ls-dropdown-select */
background:    #FAFAFC;
border-radius: 11px;
border:        3px solid rgba(0,0,0,0.04);
padding:       0 14px;
font-size:     17px;
color:         rgba(0,0,0,0.80);
```

---

## 7. Motion & Interaction

### Philosophy
Motion is **functional, not decorative**. It communicates state change or guides attention. Apple never animates for "wow" — every motion has a reason. Transitions are short (200–300ms for UI interactions) to medium (600–800ms for content reveals).

### Observed Timing Values
```css
/* From CSS vars on live DOM */
--motion-slide:   800ms;   /* --media-gallery-slide-duration */
--motion-copy:    600ms;   /* --media-gallery-bottom-copy-duration */
--motion-fast:    200ms;   /* inferred: button hover transitions */
--motion-medium:  400ms;   /* inferred: fade-in on scroll */
```

### Scroll-Reveal Pattern (Apple-style, inferred from DOM classes)
Apple uses a `.progressive-image` + `.enhanced` class pattern for scroll-triggered content reveal. The standard pattern:

```css
/* Pre-reveal state */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}
/* Post-reveal (JS adds .is-visible when element enters viewport) */
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- Entry: **fade up** (opacity 0→1, translateY 24px→0), ease-out, 600ms
- Images: **fade in** only (no translate), 400ms
- Stagger: sibling elements stagger by 80–120ms
- No bounce, no spring physics, no scale transforms on content

### Nav Glassmorphism Transition
```css
/* Nav background shifts from transparent to frosted on scroll */
background: rgba(255,255,255,0);      /* at top */
background: rgba(255,255,255,0.80);   /* after scroll threshold */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
transition: background 300ms ease;
```

### Button / Interactive States
```
hover:  background lightens ~6%, no scale transform
active: background darkens ~6%, no scale
focus:  outline 2px #0071E3 (--sk-focus-color), offset 1px (--sk-focus-offset)
```

### Media Gallery Slide Transition
```css
transition: 800ms ease;   /* slide duration, ease not ease-in-out */
/* Content copy fades independently at 600ms */
```

---

## 8. Voice & Brand

### Copy Style (observed from live page CTAs)
- **Two-word to four-word headlines** — "iPhone. Forged in titanium." style
- **CTA text**: "Learn more" / "Buy" — never "Get started now!" or exclamation points
- **Subhead**: one sentence max, neutral tone, factual benefit statement
- **No superlatives in text** — the product photo does the bragging
- **Period after single-sentence headlines** — stylistic Apple signature
- **Tone**: quiet confidence. Assumes the reader already wants it.

### Applied to SaaS Context
For the AI sales email SaaS:
- Headline pattern: "Your sales email. Written by AI. Sent every day." (period-stop rhythm)
- Subhead: "One brief. One email. One sale closer." — no fluff
- CTA primary: "Start free" — not "Sign up now and get started for free!"
- CTA secondary: "See how it works"

---

## 9. Anti-Patterns

**Exact things to NOT do when building Apple-grade:**

1. **No default Tailwind indigo** (`#6366f1`, `#4f46e5`, `#4338ca`, `#3730a3`) as accent. The observed accent is `#0071E3` — a distinct, cooler blue.
2. **No hero gradient** (purple→blue, indigo→pink, blue→cyan). Apple uses flat section backgrounds only. Gradients exist only as legibility overlays on photography.
3. **No drop shadows on product images**. Images sit on background color directly.
4. **No rounded corner cards at section level**. Full-bleed tiles have 0 border-radius. Smaller content cards use 18–24px, never 8px.
5. **No gradient buttons**. Buttons are flat fills or transparent ghosts. Never `background: linear-gradient(...)` on a button.
6. **No uppercase text**. Apple never transforms text to uppercase. Letter-spacing creates rhythm, not caps.
7. **No body text below 17px** for main content. Apple's minimum readable size is 17px.
8. **No thin hairline borders as section dividers**. Sections separate via background color change, not lines.
9. **No icon-heavy design**. Apple uses photography, not icon grids. If icons appear, they are monoline and minimal (20–24px).
10. **No multi-color palettes**. Maximum 2 accent colors per page (blue for CTA, near-white/dark for sections). Section-specific accent colors (product imagery) are photographic, not UI colors.
11. **No centered body copy at normal reading size**. Long-form body text is left-aligned. Only short headlines and CTAs are centered.
12. **No animation on page load**. Content is visible immediately; scroll triggers reveal, not load.
13. **No sticky footer CTAs on mobile** (unless checkout/cart flow). Apple relies on in-section CTAs.

---

## Quick Reference Card

```
PALETTE
  bg-base:       #FFFFFF
  bg-secondary:  #F5F5F7
  bg-surface:    #FAFAFC
  bg-dark:       #1D1D1F
  text-primary:  #1D1D1F
  text-secondary:#6E6E73
  text-tertiary: #86868B
  accent:        #0071E3
  accent-link:   #0066CC

FONTS
  display:  SF Pro Display → system-ui, -apple-system, sans-serif
  text:     SF Pro Text → system-ui, -apple-system, sans-serif
  mono:     SF Mono → ui-monospace, monospace

TYPE SCALE (clamp / observed)
  display:  clamp(48px, 5.5vw, 80px) / weight 600 / lh 1.05 / ls -0.025em
  h1:       clamp(36px, 4vw, 64px)   / weight 600 / lh 1.08 / ls -0.022em
  h2:       clamp(28px, 3vw, 48px)   / weight 600 / lh 1.10 / ls -0.015em
  h3:       40px                     / weight 600 / lh 44px  / ls normal   ← OBSERVED
  body-lg:  28px                     / weight 400 / lh 32px  / ls 0.007em  ← OBSERVED
  body:     17px                     / weight 400 / lh 25px  / ls 0        ← OBSERVED
  sm:       14px                     / weight 400 / lh 21px
  xs:       12px                     / weight 400 / lh 16px                 ← OBSERVED

BUTTONS
  primary:   bg #0071E3 / white text / radius 980px / pad 11px 21px / 17px
  secondary: transparent / #0066CC border 1px / radius 980px / same pad
  dark:      bg #1D1D1F / white text / radius 8px / pad 8px 15px / 14px

SPACING RHYTHM
  base unit: 8px
  section inner pad (desktop): 80–120px vertical / 80px horizontal
  section gap: 12px (observed)
  nav height: 44px (observed)
  main offset: 114px from top (observed)

MOTION
  fast:   200ms ease    (button hover)
  medium: 400ms ease    (image fade)
  slow:   600ms ease    (copy reveal)
  slide:  800ms ease    (gallery transition)
  scroll-reveal: opacity 0→1 + translateY 24px→0, 600ms ease, stagger 100ms

BREAKPOINTS
  sm:  320px
  md:  834px
  lg:  1024px
  xl:  1440px
```

---

*Captured: 2026-06-26 via Playwright headless Chromium 1440×900 + 390×844. Screenshots: hero.png, full.png, mobile.png, nav.png, button.png, section-25pct.png, section-50pct.png, section-75pct.png stored at /tmp/pw-capture/.*
