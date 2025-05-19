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
        box: {
          "50%": { opacity: "0" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.0" },
          "50%": { opacity: "0.4" },
        },
        textred: {
          "0%, 100%": { color: "#ef4444" }, // red-500
          "50%": { color: "#ffffff" }, // white
        },
        textamber: {
          "0%, 100%": { color: "#f59e0b" }, // amber-500
          "50%": { color: "#ffffff" }, // white
        },
      },
      animation: {
        flicker: "flicker 0.5s infinite alternate",
        blink: "blink 2s step-start infinite",
        breathe: "breathe 2s ease-in-out infinite",
        textred: "textred 2s step-start infinite",
        textamber: "textamber 2s step-start infinite",
        box: "box 2s step-start infinite",
      },
    },
  },
  plugins: [],
};
