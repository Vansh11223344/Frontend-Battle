/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "arctic": "#F1F6F4",
        "mystic": "#D9E8E2",
        "forsythia": "#FFC801",
        "saffron": "#FF9932",
        "nocturnal": "#114C5A",
        "oceanic": "#172B36",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
