import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#111118",
        card: "#16161f",
        border: "#22222e",
        accent: {
          DEFAULT: "#00d4aa",
          dim: "#00d4aa22",
        },
        text: "#e8e8f0",
        muted: "#6b6b80",
        danger: "#ff5c5c",
        warning: "#ffaa00",
        stellar: {
          blue: "#7B5EA7",
          glow: "#a47fd4",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        pulse: "pulse 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
