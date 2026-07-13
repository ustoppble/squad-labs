// Single content source so every section stays consistent.
import type { LucideIcon } from "lucide-react";
import {
  Wand2,
  Camera,
  Palette,
  Sparkles,
  Layers,
  Gauge,
} from "lucide-react";

export const BRAND = "Lumina";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Metrics", href: "#metrics" },
  { label: "Pricing", href: "#pricing" },
];

export const HERO = {
  eyebrow: "Lumina — AI Motion Studio",
  // Each string is one masked line of the headline reveal.
  headlineLines: ["Render the", "unfilmable."],
  sub: "Lumina turns a single sentence into a fully-graded cinematic shot — camera, lighting and color science, generated in seconds.",
  ctaPrimary: "Start directing",
  ctaSecondary: "Watch the reel",
};

export const MARQUEE_ITEMS = [
  "TEXT-TO-SHOT",
  "COLOR SCIENCE",
  "4K · 60FPS",
  "CAMERA AI",
  "REALTIME PREVIEW",
  "MULTI-SHOT CONTINUITY",
  "NATIVE GRADING",
  "ZERO RENDER FARMS",
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
};

export const FEATURES: Feature[] = [
  {
    icon: Wand2,
    title: "Text-to-Shot",
    body: "Describe a scene in plain language. Lumina composes blocking, lens and motion into a finished take.",
    tag: "01",
  },
  {
    icon: Camera,
    title: "Directable Camera",
    body: "Dolly, crane, orbit and rack-focus with a verb. Real camera grammar, not random drift.",
    tag: "02",
  },
  {
    icon: Palette,
    title: "Color Science",
    body: "Film-accurate grading baked into every frame — ARRI, Kodak and custom LUTs on demand.",
    tag: "03",
  },
  {
    icon: Layers,
    title: "Multi-Shot Continuity",
    body: "Lock a character, a wardrobe, a world. Lumina holds it across every cut in the sequence.",
    tag: "04",
  },
  {
    icon: Sparkles,
    title: "4K Upscale",
    body: "Native 4K at 60fps with detail synthesis — broadcast-ready straight out of the studio.",
    tag: "05",
  },
  {
    icon: Gauge,
    title: "Realtime Preview",
    body: "Sub-second first frame. Iterate on direction live instead of waiting on a render farm.",
    tag: "06",
  },
];

export type Showcase = {
  index: string;
  title: string;
  meta: string;
  gradient: string;
};

// Pure-CSS "film stills" for the pinned horizontal diorama — no asset downloads.
export const SHOWCASE: Showcase[] = [
  {
    index: "SHOT 01",
    title: "Neon Rainfall",
    meta: "Anamorphic · 2.39:1 · Teal/Ember",
    gradient:
      "linear-gradient(135deg, #06222b 0%, #0a3a4a 40%, #1fb6c9 75%, #ff5a36 130%)",
  },
  {
    index: "SHOT 02",
    title: "Orbital Dawn",
    meta: "65mm · Crane Up · Golden Hour",
    gradient:
      "linear-gradient(135deg, #0a0c11 0%, #2b1d3f 45%, #356bff 90%, #54e9d2 140%)",
  },
  {
    index: "SHOT 03",
    title: "Desert Mirage",
    meta: "Spherical · Dolly In · Bleach Bypass",
    gradient:
      "linear-gradient(135deg, #1a0f08 0%, #5a2e12 40%, #ff7a3c 80%, #ffd06a 130%)",
  },
  {
    index: "SHOT 04",
    title: "Deep Current",
    meta: "Macro · Slow Push · Cyan Grade",
    gradient:
      "linear-gradient(135deg, #03141a 0%, #07343f 45%, #1fb6c9 85%, #356bff 135%)",
  },
  {
    index: "SHOT 05",
    title: "Last Light",
    meta: "Anamorphic · Static · Ember Key",
    gradient:
      "linear-gradient(135deg, #160606 0%, #3a0f0a 42%, #ff5a36 82%, #54e9d2 140%)",
  },
];

export type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

export const STATS: Stat[] = [
  { value: 12, suffix: "M+", label: "Frames rendered daily" },
  { value: 0.8, suffix: "s", decimals: 1, label: "Average first frame" },
  { value: 98, suffix: "%", label: "Shots usable first try" },
  { value: 40, suffix: "K", label: "Directors on Lumina" },
];

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    name: "Indie",
    price: "$0",
    cadence: "/forever",
    blurb: "For first cuts and experiments.",
    features: [
      "720p exports",
      "20 shots / month",
      "Core camera moves",
      "Community presets",
    ],
    cta: "Start free",
  },
  {
    name: "Studio",
    price: "$79",
    cadence: "/month",
    blurb: "For working directors shipping daily.",
    features: [
      "4K · 60fps exports",
      "Unlimited shots",
      "Full color science suite",
      "Multi-shot continuity",
      "Priority render lane",
    ],
    cta: "Go Studio",
    featured: true,
  },
  {
    name: "Atelier",
    price: "Custom",
    cadence: "",
    blurb: "For studios and broadcast pipelines.",
    features: [
      "Dedicated GPU cluster",
      "Custom LUT training",
      "On-prem deployment",
      "SLA + solutions team",
    ],
    cta: "Talk to us",
  },
];

export const CTA = {
  line: "The camera you were promised",
  emphasis: "is finally here.",
  sub: "Join forty thousand directors making the unfilmable, today.",
  button: "Open the studio",
};

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Showcase", "Pricing", "Changelog", "Status"],
  },
  {
    title: "Studio",
    links: ["About", "Manifesto", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "API", "Presets", "Community", "Tutorials"],
  },
];
