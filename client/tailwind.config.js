import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "shadow-pulse": {
          "0%, 100%": { "box-shadow": "0 0 0 0 rgba(34, 139, 34, 0.5)" },
          "50%": { "box-shadow": "0 0 20px 10px rgba(34, 139, 34, 0.5)" },
        },
        "shadow-loop": {
          "0%": { "box-shadow": "-20px 0 20px rgba(34, 139, 34, 0.4)" }, // left
          "25%": { "box-shadow": "0 -20px 20px rgba(34, 139, 34, 0.4)" }, // top
          "50%": { "box-shadow": "20px 0 20px rgba(34, 139, 34, 0.4)" }, // right
          "75%": { "box-shadow": "0 20px 20px rgba(34, 139, 34, 0.4)" }, // bottom
          "100%": { "box-shadow": "-20px 0 20px rgba(34, 139, 34, 0.4)" }, // back to left
        },
      },
      animation: {
        "spin-slow": "spin-slow 5s linear infinite",
        "shadow-pulse": "shadow-pulse 10s infinite",
        "shadow-loop": "shadow-loop 20s ease-in-out infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
