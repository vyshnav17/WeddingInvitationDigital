/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FDFBF7',
          DEFAULT: '#F2EFE9',
          dark: '#E8E4DB'
        },
        gold: {
          light: '#E6C97A',
          DEFAULT: '#D4AF37',
          dark: '#B08D28'
        },
        blush: {
          light: '#FDF2F8',
          DEFAULT: '#FCE7F3',
          dark: '#FBCFE8'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
