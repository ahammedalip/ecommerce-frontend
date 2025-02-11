// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkGray: '#393646',
        pureDarkGray:'#111015',
        lightDarkGrey:'#45394D',
        purpleGray: '#4F4557',
        mutedPurple: '#6D5D6E',
        lightCream: '#F4EEE0',
        seriousDark:'#2D2B38'
      },
    },
  },
  plugins: [],
}
