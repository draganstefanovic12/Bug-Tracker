/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        mainbg: "#1b1d1e",
      }),
    },
  },
  plugins: [],
};
