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
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 5s linear infinite",
        "shadow-pulse": "shadow-pulse 10s infinite",
        "shadow-loop": "shadow-loop 20s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-in",
        float: "float 3s ease-in-out infinite",
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
