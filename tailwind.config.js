/** @type {import('tailwindcss').Config} */
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  sreens: {
   sm: "320px",
   md: "768px",
   lg: "1024px",
   xl: "1280px",
   '2xl': "1536px",
  },
  extend: {
   colors: {
    primaryColor: "#5A5DFA",
    secondaryColor: "#DDE4FE",
   },
   fontFamily: {
    Poppins: ["Poppins", "sans-serif"],
   },
  },
 },
 plugins: [],
};
