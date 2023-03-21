/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-base": "#F0F2F5",
      },
    },
  },
  daisyui: {
    themes: [
      {
        heroRider: {
          primary: "#2274A5",
          secondary: "#016FB9",
          accent: "#B1EDE8",
          neutral: "#2B3445",
          "base-100": "#FFFFFF",
          info: "#03A9F4",
          success: "#4CAF50",
          warning: "#FF9800",
          error: "#EF5350",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
