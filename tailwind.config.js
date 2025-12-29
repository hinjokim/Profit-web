/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF', // Trustworthy Blue
        secondary: '#1A1A1A',
      }
    },
  },
  plugins: [],
}
