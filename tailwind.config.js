/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        red: {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc1c1',
          300: '#ff9b9b',
          400: '#ff6b6b',
          500: '#e80f00', // Our primary red
          600: '#cc0d00',
          700: '#b30b00',
          800: '#990a00',
          900: '#800800',
          950: '#660600',
        },
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};