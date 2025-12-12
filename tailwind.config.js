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
          light: '#3b82f6', // blue-500
          dark: '#60a5fa', // blue-400
        },
        background: {
          light: '#ffffff',
          dark: '#0f172a', // slate-900
        },
        surface: {
          light: '#f3f4f6', // gray-100
          dark: '#1e293b', // slate-800
        },
        text: {
          light: '#1f2937', // gray-800
          dark: '#f3f4f6', // gray-100
        }
      }
    },
  },
  plugins: [],
}
