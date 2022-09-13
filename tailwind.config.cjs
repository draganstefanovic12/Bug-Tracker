/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadein: "fadein 250ms ease-in-out 1 forwards",
        fadeout: "fadeout 250ms ease-in-out 1 forwards",
      },
      keyframes: {
        fadein: {
          "0%": { width: "2rem" },
          "100%": { width: "11rem" },
        },
        fadeout: {
          "0%": { width: "11rem" },
          "100%": { width: "2rem" },
        },
      },
      content: {
        dashboard: "url('./assets/images/dashboard.svg')",
        projects: "url('./assets/images/projects.svg')",
        tickets: "url('./assets/images/tickets.svg')",
        users: "url('./assets/images/users.svg')",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
