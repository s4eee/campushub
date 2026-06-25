/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4648d4",
        background: "#fbf9f4",
        surface: "#fbf9f4",
        "surface-container-low": "#f5f3ee",
        "on-surface": "#1b1c19",
        "on-surface-variant": "#464554",
        outline: "#767586",
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};