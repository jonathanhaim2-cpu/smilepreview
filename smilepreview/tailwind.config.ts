import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          mint: "#10B981",
          "light-blue": "#EFF6FF",
          "light-mint": "#ECFDF5",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1f2937",
            a: { color: "#2563EB", "&:hover": { color: "#1d4ed8" } },
            h2: { color: "#111827", fontWeight: "700" },
            h3: { color: "#111827", fontWeight: "600" },
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
