/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: '#4f46e5',
        secondary: '#ec4899',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#f43f5e',
        info: '#0ea5e9'
      }
    }
  },
  plugins: [],
}
