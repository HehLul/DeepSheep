/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        geist: ["var(--font-geist-sans)"],
        "geist-mono": ["var(--font-geist-mono)"],
        "plus-jakarta": ["var(--font-plus-jakarta)"],
        quicksand: ["var(--font-quicksand)"],
        "dm-sans": ["var(--font-dm-sans)"],
        "dm-serif": ["var(--font-dm-serif)"],
      },
    },
  },
  plugins: [],
};