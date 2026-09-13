/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tokens Oficiais OnFocus (Alinhamento com Pitch Slides)
        navy: {
          bg: "#0a0f1e", // Dark Mode Page Background
          card: "#132234", // Dark Mode Card/Surface
          border: "#1e293b", // Dark Mode Border
          hover: "#182c44",
        },
        ice: {
          bg: "#f1f5f9", // Light Mode Page Background
          card: "#e0f7fb", // Light Mode Card/Surface
          border: "#cbd5e1", // Light Mode Border
          hover: "#d0f1f7",
        },
        brand: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee", // Ciano Vibrante Oficial (Dark Mode Accent)
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7c93", // Deep Teal/Cyan Oficial (Light Mode Accent)
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
