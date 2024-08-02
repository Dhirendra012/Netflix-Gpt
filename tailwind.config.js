/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: 
    {
      backgroundColor: 
      {
        'custom-rgb-opacity': 'rgba(128, 128, 128, 0.4)'
      }
    },
  },
  plugins: [],
}