/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          dark: '#E05353',
          light: '#FFA8A8'
        },
        secondary: {
          DEFAULT: '#4D96FF',
          dark: '#3878D8',
          light: '#80B3FF'
        }
      }
    },
  },
  plugins: [],
}
