/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flicker: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.8" },
          "100%": { transform: "translateY(-5px) scale(1.1)", opacity: "1" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 0.5s infinite alternate",
        blink: "blink 2s step-start infinite",
      },
    },
  },
  plugins: [],
};
