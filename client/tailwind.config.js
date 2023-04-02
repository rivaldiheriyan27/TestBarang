/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        smalt: "#003399",
        darkSmalt: "#002672",
        powderBlue: "#FBFAFF",
        tangerine: "#ffcc00",
        darkTangerine: "#d8ad00",
        cola: "#272000",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      padding: {
        30: "7.5rem",
      },
      borderWidth: {
        16: "16px",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
],
};
