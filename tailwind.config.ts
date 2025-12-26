import { type Config } from "tailwindcss";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "oklch(70.5% 0.213 47.604)", // orange-500
          dark: "oklch(70.5% 0.213 47.604)", // orange-500
        },
        background: {
          light: "oklch(97% 0.001 106.424)",
          dark: "oklch(21.6% 0.006 56.043)", // stone-900
        },
        text: {
          light: "#1f2937", // gray-800
          dark: "#f3f4f6", // gray-100
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
