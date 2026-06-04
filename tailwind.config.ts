import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d0d0d",
        foreground: "#f5f0e8",
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E2C880",
          dark: "#9B7A2F",
        },
        surface: {
          DEFAULT: "#141414",
          elevated: "#1a1a1a",
          border: "#2a2a2a",
        },
      },
      fontFamily: {
        // Body, UI, cards — Onest has full Cyrillic + Latin + numerals
        sans: ["var(--font-onest)", "system-ui", "sans-serif"],
        onest: ["var(--font-onest)", "sans-serif"],
        // Display headings — Unbounded for bold impact
        display: ["var(--font-unbounded)", "sans-serif"],
        unbounded: ["var(--font-unbounded)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.8rem, 7.5vw, 7rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #E2C880 50%, #C9A84C 100%)",
        "gold-radial": "radial-gradient(ellipse at center, #C9A84C22 0%, transparent 70%)",
        "noise": "url('/noise.svg')",
      },
      animation: {
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
        "pulse-gold": "pulse-gold 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
