import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-1": "var(--bg-1)",
        "bg-2": "var(--bg-2)",
        ink: "var(--ink)",
        "ink-dim": "var(--ink-dim)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter: "-0.04em",
      },
      maxWidth: {
        shell: "1480px",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
        snappy: "cubic-bezier(0.77, 0, 0.175, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
