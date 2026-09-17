import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          DEFAULT: "#05060a",
          deep: "#0a0c14",
          panel: "#10131c",
          border: "#22273a",
          starlight: "#e8ecf7",
          muted: "#9aa3bd",
          accent: "#c9a86a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 20px 60px -20px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
