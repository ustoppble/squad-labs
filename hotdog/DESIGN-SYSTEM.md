# Singular Contabilidade — Design System

**System name:** Ledger Observatory
**Mood:** Dark sci-fi mission-control — premium, cinematic, Awwwards-grade — but a **working tool first**: readable, fast, low cognitive load for repetitive daily accounting work.
**Contract:** Token names in this document and in `design-tokens.css` are **stable**. Downstream media + front-end builders consume them verbatim. Do not rename; add, don't break.

---

## FUSION DELTA — what changed from baseline (apply only these)

This system fuses three inputs: the **Ledger Observatory** dark base (structure, components, a11y, dense-table usability) + **modal.com** technique (discipline, restraint, glow, wide container) + the **real Singular brand** (authoritative identity). Token **names are unchanged** — only values and a few additive tokens. Front-end rebuild applies just these deltas:

| Axis | Baseline | Fused (now) | Why |
|---|---|---|---|
| **Accent** | ice-blue `#5AD2FF` | **Singular green `#02DF5F`** (bright `#3DEE83`, pressed `#01953F`) | Brand wins identity. Real Singular CTA color becomes THE single accent. |
| **Accent text/glow/stroke** | cyan rgba | green rgba (`--text-accent #5BEE96`, `--stroke-accent`, all `--glow-*` recolored) | One hue everywhere interactive — modal-grade restraint. |
| **`--text-on-accent`** | `#04161C` | `#03130A` (dark on green) | A11y: white-on-`#02DF5F` fails AA. Dark text on bright green passes AA+. Deviates from brand's white-on-green on purpose. |
| **Fonts** | Space Grotesk + IBM Plex Sans | **Poppins** (brand) for display **and** UI; **IBM Plex Mono** kept for tabular money figures | Poppins is Singular's real font. Mono stays for column alignment. |
| **Display leading** | `1.1` | `1.05` | Confident, modal-tight hero/large numbers. |
| **Card technique** | flat elevated panels | **mono-hue green corner radial glow** (`--card-glow-tl/tr/br`) on hero/dashboard tiles only | Modal's signature card depth; capped low-alpha, never on data tables. |
| **Ambient wash** | cyan bloom | green bloom (`--bg-glow-wash`) | Single-hue horizon glow, hero/dashboard only. |
| **Two greens** | green = money only | electric `#02DF5F` = interactive; **soft mint `#5EE0A0`** = financial-positive (sign-paired) | Keeps a credit visually distinct from a control. |
| **Logo** | none placed | **real `SINGULAR` wordmark** (`assets/brand/logo-singular.svg`) in sidebar top + login | Unmistakably Singular. |
| **Headline** | plain | **accent-keyword trick**: one word in green per display headline | Modal's precision-reading cue. |
| **Container** | `--content-max 90rem` (1440px) | unchanged — already modal-wide; use `--space-7` (48px) gutters on wide screens | Generous breathing room. |

Backgrounds, strokes, body/secondary text, semantic states, financial hues, radius, spacing, motion, z-index: **unchanged** (preserve documented contrast + layered structure).

---

## 0. The thesis (read this first)

This is a control room for people who watch numbers all day. Three decisions drive everything:

1. **Deep blue-black, layered.** Backgrounds carry a cool undertone so panels read as glass lit from behind, not flat grey. Depth comes from layering surfaces + hairline edges + mono-hue corner glow, not from shadows alone.
2. **One restrained accent — Singular green (`--accent #02DF5F`).** The real brand CTA color is THE accent. It means *interactive / focused / selected*. Nothing decorative glows; ≤ a handful of green elements per screen (modal discipline). Premium via restraint, never gamer-RGB.
3. **Green and red are reserved for money.** Financial green is a **softer mint (`--value-positive #5EE0A0`)**, deliberately distinct from the electric brand accent, so a *credit* never reads as a *control*. The system ships **financial-sign tokens** (`--value-positive`, `--value-negative`, `--value-pending`) so a credit is always the same green and a debit always the same red, everywhere — always paired with a `+`/`−` sign. This is the signature: the visual language encodes accounting's debit/credit truth.

**Typography:** Poppins (Singular's brand font — display **and** UI, display used sparingly) · IBM Plex Mono (every number, money value, CNPJ, ID — tabular alignment is a real usability win in dense tables).

Fonts (Google Fonts):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 1. Color tokens

### Layered dark backgrounds
Stack from recessed to raised. Each step lighter = closer to the viewer.

| Token | Hex | Use |
|---|---|---|
| `--bg-inset` | `#05080C` | Recessed wells: input fields, scroll areas behind rows |
| `--bg-base` | `#080B11` | App canvas / deepest backdrop |
| `--bg-surface` | `#0E131B` | Sidebar, panels, primary containers |
| `--bg-elevated` | `#161D27` | Cards, stat tiles, table header, popovers |
| `--bg-overlay` | `#1E2733` | Hover surfaces, menus, raised affordances |
| `--bg-scrim` | `rgba(5,8,12,.72)` | Modal backdrop |
| `--bg-glow-wash` | radial bloom | Optional ambient wash behind hero/dashboard only |

### Strokes / sci-fi hairlines
Cool blue-tinted, never pure white — backlit-glass edge.

| Token | Use |
|---|---|
| `--stroke-subtle` | Zebra dividers, faint splits |
| `--stroke-default` | Card & input borders (default) |
| `--stroke-strong` | Hovered / emphasized borders |
| `--stroke-accent` | Active / selected edge |
| `--hairline-top` | `inset` top highlight for glass feel (use inside `box-shadow`) |

### Brand accent (Singular green — restraint)
`--accent` `#02DF5F` (Singular brand green) · `--accent-bright` `#3DEE83` (hover peak) · `--accent-strong` `#01953F` (Singular dark green, pressed) · `--accent-muted` (selected fills) · `--accent-faint` (row hover wash).

**Restraint rule (modal discipline):** accent fills and glow appear on *interactive* elements only — focus, hover, active, selection, the single primary action per view. Never as background decoration. ≤ a handful of green elements per screen; max one glowing element in the user's eye-line at rest. On accent fills, use `--text-on-accent` (dark) — never white (white on `#02DF5F` fails AA).

### Text (AA+ on dark)
| Token | Hex | Min contrast | Use |
|---|---|---|---|
| `--text-primary` | `#EAF0F7` | ~16:1 | Headings, key data |
| `--text-secondary` | `#A7B4C6` | ~9:1 | Body, secondary cells |
| `--text-tertiary` | `#7C8A9E` | ~5:1 | Captions, muted labels |
| `--text-disabled` | `#49515F` | — | Disabled only (not for reading) |
| `--text-on-accent` | `#04161C` | high | Text on accent fills |
| `--text-accent` | `#5BEE96` | AA | Accent-colored (green) text on dark |

### Semantic (UI state — tuned for dark)
Each ships `*`, `*-text` (AA on dark), `*-bg` (soft fill), `*-border`.

`--success #46D38A` · `--warning #E8B14C` · `--danger #F2585B` · `--info #7BA0FF` (periwinkle, kept distinct from the green accent so "informational" ≠ "interactive"). Note: `--success` and the brand accent are both green by domain necessity — keep `--success` for transient *state confirmation* (a saved toast), the accent for *standing interactivity*; never glow both at once.

### Financial-sign tokens (the signature — use only for money/numbers)
| Token | Hex | Meaning |
|---|---|---|
| `--value-positive` | `#5EE0A0` | Credits, gains, paid — soft mint, distinct from the electric brand accent |
| `--value-negative` | `#FF7A7C` | Debits, losses, overdue |
| `--value-neutral` | `#A7B4C6` | Zero / N/A |
| `--value-pending` | `#F2C76E` | Awaiting reconciliation |

> Keep semantic-state and financial-sign families separate. A *failed save* uses `--danger`; a *negative balance* uses `--value-negative`. Different jobs, intentionally close but not identical hues.
>
> **Three greens, on purpose:** electric `--accent #02DF5F` = *interactive*; medium `--success #46D38A` = *transient state confirmation*; soft mint `--value-positive #5EE0A0` = *credit/positive money*. They are tuned to read as distinct registers. Financial green is always sign-paired (`+`) and right-aligned, so it can never be mistaken for a control even at a glance.

---

## 2. Elevation, radius, spacing, stroke

**Shadows** — dark UI leans on the hairline edge as much as the drop shadow:
`--shadow-sm/md/lg/xl`. Composed: `--elevation-card` (`shadow-md` + glass top edge), `--elevation-pop` (`shadow-lg` + edge).

**Glow — capped, mono-hue green:**
- `--glow-accent` — focus/active default (1px ring + 18px soft, low alpha).
- `--glow-accent-strong` — **primary CTA hover ONLY**.
- `--glow-success` / `--glow-danger` — momentary status confirmation, never persistent.

**Corner radial glow (modal technique):** `--card-glow-tl` / `--card-glow-tr` / `--card-glow-br` — a single-hue green radial bloom emanating from one corner of a **hero/dashboard card or stat tile**. Apply as a background layer over `--bg-elevated`; **vary the corner per tile** so cards don't read as the same stamp. Capped low alpha (~0.16) — premium via discipline, not brightness.

```css
.tile--glow { background: var(--card-glow-tl), var(--bg-elevated); }
.tile--glow:nth-child(2n) { background: var(--card-glow-tr), var(--bg-elevated); }
.tile--glow:nth-child(3n) { background: var(--card-glow-br), var(--bg-elevated); }
```

Glow lives on the dashboard/hero only — **never on dense data tables**. Never animate a perpetual glow on data views — it reads laggy and distracting under heavy daily use.

**Radius:** `--radius-xs 3` · `sm 5` (inputs) · `md 8` (buttons, fields, table shell) · `lg 12` (cards) · `xl 16` (modals) · `full` (pills). Moderate corners — sharp enough to feel technical, soft enough to feel finished.

**Spacing:** 4px base. `--space-1`…`--space-9` = 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Default gutter inside cards: `--space-5`. Default page padding: `--space-6`.

---

## 3. Typography

| Role | Family token | Where |
|---|---|---|
| Display | `--font-display` (Poppins, 600–700) | Page/section titles, dashboard hero numbers, eyebrows — used **sparingly**, tight leading (`--leading-tight 1.05`) |
| UI | `--font-ui` (Poppins, 400–600) | All interface text, labels, buttons, body |
| Data | `--font-mono` (IBM Plex Mono) | Every number: money, %, CNPJ, dates, IDs, table figures |

**Accent-keyword headline trick (modal):** in a display headline, render **one** word in `--text-accent` (green), the rest in `--text-primary`. One word, not a gradient, not rainbow — the eye catches the green, then reads the line. E.g. *"O **futuro** ao seu alcance."* Use once per view at most.

**Scale** (compact, 14px UI base): `--text-2xs 11` · `xs 12` · `sm 13` · `base 14` · `md 16` · `lg 18` · `xl 22` · `2xl 28` · `3xl 36` · `4xl 48` · `5xl 64`.

**Weights:** 400 / 500 / 600 / 700. Display headings 600–700; UI body 400–500; labels/buttons 500–600.

**Line-heights:** `--leading-tight 1.1` (big numbers) · `snug 1.3` (table rows, headings) · `normal 1.5` (body) · `relaxed 1.65` (help text).

**Tracking:** display `-0.01em`; uppercase eyebrows/labels `+0.08em` (`--tracking-label`); mono `+0.01em`.

Helpers shipped in CSS: `.tnum` (mono + tabular-nums for any numeric column), `.eyebrow` (uppercase tracked micro-label).

**Dense-table rule:** numeric columns use `.tnum` and right-align. Tabular figures keep digits in vertical registers so the eye scans a column without jitter — the core readability win for daily reconciliation work.

---

## 4. Motion language

Principles: **subtle, fast, purposeful.** Motion confirms an action or guides the eye — it never performs.

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 80ms | Press feedback |
| `--dur-fast` | 140ms | Hover, focus, micro-interactions |
| `--dur-base` | 200ms | Default transitions |
| `--dur-slow` | 320ms | Section/panel transitions — **cap for daily views** |
| `--dur-slower` | 480ms | Modal/overlay entrance only |

Easings: `--ease-out` (default reveals) · `--ease-in-out` · `--ease-standard`.

**Hard caps for a tool used all day:**
- Hover/focus ≤ 140ms. Anything slower feels sluggish on the 200th click.
- Animate only `opacity` and `transform` (GPU-cheap). Never animate `box-shadow`/`filter` on scroll or in long lists.
- No ambient/looping animation on tables or the dashboard at rest.
- Stagger reveals to ≤ 3 items; never cascade an entire table.
- `prefers-reduced-motion: reduce` is honored globally in `design-tokens.css` — all transitions collapse to ~0ms.

---

## 5. Core component patterns

Each gives token usage + the load-bearing CSS. Match the existing class style when building.

### 5.1 App shell — sidebar + topbar
Fixed sidebar (`--sidebar-width`), sticky topbar (`--topbar-height`), scrollable content. Sidebar is `--bg-surface`, topbar `--bg-surface` with a hairline bottom, canvas `--bg-base`.

**Logo placement (brand identity):** the real `SINGULAR` wordmark (`assets/brand/logo-singular.svg`) sits at the **top of the sidebar**, white fill (`#FFFFFF` / `--text-primary`) on the dark `--bg-surface`, ~`--space-4` padding, height ~20–24px, with the thin rule beneath it preserved. Collapsed sidebar (`--sidebar-collapsed`) shows just the `S` glyph. On the **login screen**, center the same wordmark above the form at ~2× size against `--bg-base`. The wordmark is the only place the brand name is set in custom letterforms — everywhere else is Poppins.

```css
.brand-logo { display: block; height: 22px; width: auto;
  margin: var(--space-2) var(--space-3) var(--space-5);
  color: var(--text-primary); /* SVG uses fill="currentColor" → white on dark */ }
```

```css
.app { display: grid; grid-template-columns: var(--sidebar-width) 1fr;
       min-height: 100vh; background: var(--bg-base); }
.sidebar { background: var(--bg-surface);
           border-right: 1px solid var(--stroke-default);
           padding: var(--space-5) var(--space-3); }
.topbar { position: sticky; top: 0; z-index: var(--z-topbar);
          height: var(--topbar-height); display: flex; align-items: center;
          gap: var(--space-4); padding: 0 var(--space-6);
          background: color-mix(in srgb, var(--bg-surface) 88%, transparent);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--stroke-default); }

.nav-item { display: flex; align-items: center; gap: var(--space-3);
            min-height: var(--hit-min); padding: var(--space-2) var(--space-3);
            border-radius: var(--radius-md); color: var(--text-secondary);
            font-weight: var(--weight-medium);
            transition: background var(--dur-fast) var(--ease-out),
                        color var(--dur-fast) var(--ease-out); }
.nav-item:hover { background: var(--accent-faint); color: var(--text-primary); }
.nav-item[aria-current="page"] {
  background: var(--accent-muted); color: var(--text-primary);
  box-shadow: inset 2px 0 0 var(--accent); /* lit left rail = "you are here" */
}
```
Icons: Lucide React, 20px, stroke-width 1.5.

### 5.2 Data table — the client list (the core screen)
Readable rows over decoration. **No zebra by default** — hairline row dividers + a clear hover are calmer for long scanning; offer zebra as an opt-in density mode. Sticky header. Money/numbers use `.tnum`, right-aligned. Row height `--row-height` (44px) for comfortable repeated clicking.

```css
.table-shell { background: var(--bg-elevated);
               border: 1px solid var(--stroke-default);
               border-radius: var(--radius-md); overflow: hidden;
               box-shadow: var(--elevation-card); }
.table { width: 100%; border-collapse: collapse;
         font-size: var(--text-sm); }

.table thead th { position: sticky; top: 0; z-index: 1;
  background: var(--bg-elevated); text-align: left;
  padding: var(--space-3) var(--space-4);
  font: var(--weight-semibold) var(--text-2xs)/1 var(--font-ui);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--text-tertiary);
  border-bottom: 1px solid var(--stroke-strong); }

.table tbody td { height: var(--row-height);
  padding: var(--space-2) var(--space-4); color: var(--text-secondary);
  border-bottom: 1px solid var(--stroke-subtle); vertical-align: middle; }
.table tbody tr { transition: background var(--dur-fast) var(--ease-out); }
.table tbody tr:hover { background: var(--accent-faint); }
.table tbody tr[aria-selected="true"] {
  background: var(--accent-muted);
  box-shadow: inset 2px 0 0 var(--accent); }

/* money columns */
.table td.num { text-align: right; font-family: var(--font-mono);
  font-variant-numeric: tabular-nums; color: var(--text-primary); }
.table td.num.pos { color: var(--value-positive); }
.table td.num.neg { color: var(--value-negative); }

/* optional density mode */
.table--zebra tbody tr:nth-child(even) { background: rgba(148,176,214,.03); }
```

### 5.3 Stat tiles / dashboard cards
Eyebrow label (uppercase, tertiary) → dominant mono number → delta chip. The hero number is the most characteristic thing on the dashboard; give it `--text-4xl`/`5xl` in `--font-display` or mono.

```css
.card { background: var(--bg-elevated);
        border: 1px solid var(--stroke-default);
        border-radius: var(--radius-lg); padding: var(--space-5);
        box-shadow: var(--elevation-card); }
.stat__label { /* use .eyebrow */ margin-bottom: var(--space-2); }
.stat__value { font: var(--weight-600,600) var(--text-4xl)/var(--leading-tight) var(--font-display);
  font-variant-numeric: tabular-nums; color: var(--text-primary);
  letter-spacing: var(--tracking-display); }
.stat__delta { display: inline-flex; align-items: center; gap: var(--space-1);
  margin-top: var(--space-2); font: var(--weight-medium) var(--text-xs) var(--font-mono); }
.stat__delta.up   { color: var(--value-positive); }
.stat__delta.down { color: var(--value-negative); }
```

### 5.4 Forms / inputs
`--bg-inset` field (recessed), `--stroke-default` border, accent focus ring + restrained glow. Label above, helper/error below. Min height `--hit-min`.

```css
.field-label { display: block; margin-bottom: var(--space-2);
  font: var(--weight-medium) var(--text-sm) var(--font-ui); color: var(--text-secondary); }
.input { width: 100%; min-height: var(--hit-min);
  padding: var(--space-2) var(--space-3); font: var(--text-md) var(--font-ui);
  color: var(--text-primary); background: var(--bg-inset);
  border: 1px solid var(--stroke-default); border-radius: var(--radius-sm);
  transition: border-color var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out); }
.input::placeholder { color: var(--text-tertiary); }
.input:hover { border-color: var(--stroke-strong); }
.input:focus-visible { outline: none; border-color: var(--stroke-accent);
  box-shadow: var(--glow-accent); }
.input[aria-invalid="true"] { border-color: var(--danger-border); }
.input[aria-invalid="true"]:focus-visible { box-shadow: 0 0 0 1px var(--danger), var(--glow-danger); }
.field-error { margin-top: var(--space-2); color: var(--danger-text); font-size: var(--text-xs); }
/* numeric inputs */
.input--num { font-family: var(--font-mono); text-align: right; font-variant-numeric: tabular-nums; }
```

### 5.5 Buttons — primary / secondary / ghost
One primary action per view. Primary = accent fill with dark text; glow appears on **hover only**.

```css
.btn { display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-2); min-height: var(--hit-min); padding: 0 var(--space-4);
  font: var(--weight-semibold) var(--text-sm) var(--font-ui);
  border-radius: var(--radius-md); border: 1px solid transparent; cursor: pointer;
  transition: transform var(--dur-instant) var(--ease-out),
              background var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out); }
.btn:active { transform: translateY(1px); }

.btn--primary { background: var(--accent); color: var(--text-on-accent); }
.btn--primary:hover { background: var(--accent-bright); box-shadow: var(--glow-accent-strong); }

.btn--secondary { background: var(--bg-overlay); color: var(--text-primary);
  border-color: var(--stroke-default); }
.btn--secondary:hover { border-color: var(--stroke-accent); background: var(--bg-elevated); }

.btn--ghost { background: transparent; color: var(--text-secondary); }
.btn--ghost:hover { background: var(--accent-faint); color: var(--text-primary); }

.btn--danger { background: var(--danger); color: #1A0506; }
.btn--danger:hover { box-shadow: var(--glow-danger); }
.btn:disabled { opacity: .45; pointer-events: none; }
```

### 5.6 Badges / status chips
Soft semantic fill + matching text + thin border. Pill radius. For client status (Ativo / Pendente / Atrasado) and financial state.

```css
.chip { display: inline-flex; align-items: center; gap: var(--space-1);
  height: 1.5rem; padding: 0 var(--space-2); border-radius: var(--radius-full);
  font: var(--weight-medium) var(--text-2xs) var(--font-ui);
  letter-spacing: .02em; border: 1px solid transparent; }
.chip--success { color: var(--success-text); background: var(--success-bg); border-color: var(--success-border); }
.chip--warning { color: var(--warning-text); background: var(--warning-bg); border-color: var(--warning-border); }
.chip--danger  { color: var(--danger-text);  background: var(--danger-bg);  border-color: var(--danger-border); }
.chip--info    { color: var(--info-text);    background: var(--info-bg);    border-color: var(--info-border); }
/* live status: a small dot, never a pulsing glow on data views */
.chip__dot { width: 6px; height: 6px; border-radius: var(--radius-full); background: currentColor; }
```

### 5.7 Modal
Scrim + centered panel, `--radius-xl`, `--elevation-pop`. Entrance ≤ `--dur-slower`, fade + 8px rise. Trap focus, close on Esc, restore focus on close.

```css
.modal-scrim { position: fixed; inset: 0; z-index: var(--z-modal);
  background: var(--bg-scrim); backdrop-filter: blur(4px);
  display: grid; place-items: center; padding: var(--space-6);
  animation: scrim-in var(--dur-base) var(--ease-out); }
.modal { width: min(34rem, 100%); background: var(--bg-elevated);
  border: 1px solid var(--stroke-strong); border-radius: var(--radius-xl);
  box-shadow: var(--elevation-pop); padding: var(--space-6);
  animation: modal-in var(--dur-slower) var(--ease-out); }
.modal__title { font: var(--weight-semibold) var(--text-xl) var(--font-display); color: var(--text-primary); }
@keyframes scrim-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes modal-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
```

### 5.8 Empty state
An invitation to act, not mood. Quiet icon, one-line plain-language explanation, one primary action.

```css
.empty { display: grid; justify-items: center; gap: var(--space-4);
  padding: var(--space-8) var(--space-5); text-align: center; }
.empty__icon { width: 40px; height: 40px; color: var(--text-tertiary); opacity: .8; }
.empty__title { font: var(--weight-semibold) var(--text-lg) var(--font-ui); color: var(--text-primary); }
.empty__body { max-width: 32ch; color: var(--text-tertiary); font-size: var(--text-sm); }
```
Copy example — client list with no results:
> **Nenhum cliente por aqui ainda** · Cadastre o primeiro cliente para começar a acompanhar obrigações e balancetes. · `[ Cadastrar cliente ]`

Error empty state (interface voice, no apology, says what to do):
> **Não foi possível carregar os clientes** · Verifique a conexão e tente novamente. · `[ Tentar de novo ]`

---

## 6. Accessibility

- **Contrast:** body text ≥ AA (4.5:1); large/display ≥ 3:1. Primary/secondary text exceed AA on every background token (see §1 table). Never put `--text-tertiary` on `--bg-overlay` for small body text — bump to `--text-secondary`.
- **Focus-visible:** global `:focus-visible` ring (`--ring-focus`) = 2px gap + accent ring, shipped in `design-tokens.css`. Every interactive element shows it. Never remove outline without replacing it.
- **Hit areas:** interactive targets ≥ 40px (`--hit-min`); table rows 44px (`--row-height`). Icon-only buttons get a 40px box even with a 20px glyph.
- **Color is never the only signal:** financial sign pairs color with a `+`/`−` and right-alignment; status chips pair color with a label/dot; errors pair `--danger` with text + `aria-invalid`.
- **Motion:** `prefers-reduced-motion` honored globally. No essential information is conveyed by animation alone.
- **Semantics:** real `<table>` for the client list, `aria-current="page"` for nav, `aria-selected` for rows, `aria-invalid` + linked `aria-describedby` for field errors, focus trap + restore for modals.

---

## 7. Token quick-reference (stable names)

```
Backgrounds   --bg-inset --bg-base --bg-surface --bg-elevated --bg-overlay --bg-scrim --bg-glow-wash
Strokes       --stroke-subtle --stroke-default --stroke-strong --stroke-accent --hairline-top
Accent        --accent --accent-bright --accent-strong --accent-muted --accent-faint
Text          --text-primary --text-secondary --text-tertiary --text-disabled --text-on-accent --text-accent --text-inverse
Semantic      --success(-text/-bg/-border) --warning(...) --danger(...) --info(...)
Financial     --value-positive --value-negative --value-neutral --value-pending
Shadow/Glow   --shadow-sm/md/lg/xl --elevation-card --elevation-pop --glow-accent --glow-accent-strong --glow-success --glow-danger --card-glow-tl/tr/br
Radius        --radius-xs/sm/md/lg/xl/full
Spacing       --space-0…--space-9
Fonts         --font-display --font-ui --font-mono
Type sizes    --text-2xs…--text-5xl
Weights       --weight-regular/medium/semibold/bold
Leading       --leading-tight/snug/normal/relaxed
Tracking      --tracking-display/normal/label/mono
Motion        --dur-instant/fast/base/slow/slower · --ease-out/in-out/standard
A11y/Layout   --ring-focus --hit-min --row-height --sidebar-width --topbar-height --content-max --z-*
```

**Files:** `DESIGN-SYSTEM.md` (this doc) · `design-tokens.css` (`:root` variables — drop into global stylesheet, import once).
