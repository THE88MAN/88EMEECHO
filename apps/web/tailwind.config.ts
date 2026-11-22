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
          DEFAULT: "#0c0b0a",
          soft: "#161412",
          mid: "#1c1a17",
        },
        anthracite: {
          DEFAULT: "#2a2a2a",
          light: "#3a3732",
        },
        gold: {
          DEFAULT: "#b8974a",
          soft: "#d4b87a",
          deep: "#8a7035",
          vif: "#d4a84b",
        },
        parchment: {
          DEFAULT: "#ebe4d6",
          muted: "#d9d0c3",
        },
        crimson: {
          DEFAULT: "#5c1a1a",
          soft: "#7a1f1f",
        },
        terre: {
          DEFAULT: "#2c241c",
        },
        ambre: {
          DEFAULT: "#c9a227",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        carton: ["var(--font-carton)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      maxWidth: {
        salle: "72rem",
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
