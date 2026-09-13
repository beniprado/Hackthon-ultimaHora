/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#7C3AED", // Cor primária oficial OnFocus (Electric Violet)
          600: "#6D28D9",
          700: "#5B21B6",
          800: "#4C1D95",
          900: "#2E1065",
        },
        onfocus: {
          violet: "#7C3AED",
          purple: "#8B5CF6",
          amber: "#F59E0B",
          orange: "#F97316",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
