/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FACC15",
          yellowHover: "#EAB308",
          dark: "#111827",
          grayBg: "#F9FAFB",
          cardBorder: "#E5E7EB"
        }
      }
    },
  },
  plugins: [],
}
