/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981', // Green
        secondary: '#FBBF24', // Yellow
        background: '#1F2937', // Dark Gray
        text: '#FFFFFF', // White
        accent: '#3B82F6', // Blue
      },
    },
  },
  plugins: [],
}
