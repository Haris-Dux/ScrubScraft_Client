/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#945EB3',
        lightSurface: '#F9FAFB',
        primary: '#2962E4',
        secondary: '#68217A',
        button: '#68217A',
        buttonHover: '#68217A',
        light: '#fff',
        dark: '#252525',
      },
    },
  },
  plugins: [],
}

