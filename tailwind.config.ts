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
        lapupu: {
          brown: "#4a443a",
          "brown-dark": "#3d3830",
          "brown-light": "#5d574d",
          cream: "#f7f3e8",
          green: "#a4b38d",
          // 後方互換用エイリアス（管理画面のadmin-inputなどで使用）
          navy: "#4a443a",
          "navy-dark": "#3d3830",
          "navy-light": "#5d574d",
          beige: "#f7f3e8",
          gold: "#a4b38d",
        },
      },
      fontFamily: {
        sans: ["var(--font-zen-maru)", "Zen Maru Gothic", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
