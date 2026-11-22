import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          soft: "#141414",
          mid: "#1c1c1c",
        },
        anthracite: {
          DEFAULT: "#2a2a2a",
          light: "#3a3a3a",
        },
        gold: {
          DEFAULT: "#c4a35a",
          soft: "#d4b87a",
          deep: "#8a7035",
        },
        parchment: {
          DEFAULT: "#f2ebe0",
          muted: "#d9d0c3",
        },
        crimson: {
          DEFAULT: "#6b1e1e",
          soft: "#8a2e2e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
      },
      backgroundImage: {
        "hero-veil":
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,163,90,0.12), transparent 70%), linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.75) 55%, #0a0a0a 100%)",
        "section-grain":
          "linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "gold-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s ease-out both",
        "fade-up-delay": "fade-up 0.9s ease-out 0.2s both",
        "fade-up-late": "fade-up 0.9s ease-out 0.4s both",
        "fade-in": "fade-in 1.2s ease-out both",
        "gold-line": "gold-line 1s ease-out 0.5s both",
      },
    },
  },
  plugins: [],
};

export default config;
