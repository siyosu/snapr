/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./views/**/*.ejs"],
  theme: {
    container: {
      center: true,
      padding: "24px",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
