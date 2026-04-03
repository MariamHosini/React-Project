/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
 content: [
  "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      colors: {
       light:{
         primary: {
          50: '#e9e3f7', 100: '#d2c7f0', 200: '#bcaae8',
          300: '#a58ee1', 400: '#8f72d9', 500: '#775fb4',
          600: '#5f4c90', 700: '#47386b', 800: '#2f2547', 900: '#161222',
        },
        secondary: {
          50: '#fcf3fa', 100: '#fae7f5', 200: '#f7dcef',
          300: '#f5d0ea', 400: '#f2c4e5', 500: '#c9a3be',
          600: '#a08298', 700: '#786171', 800: '#4f404b', 900: '#392c35',
        },
        neutral: {
          50: '#ffffff', 100: '#e5e5e5', 200: '#cbcbcb',
          300: '#b1b1b1', 400: '#979797', 500: '#7d7d7d',
          600: '#636363', 700: '#494949', 800: '#2f2f2f', 900: '#151515',
        }
       },
        dark:{
          neutral: {
          50: '#FFFFFF',
          400: '#4F404B',
          600: '#1B1B1B',
          700: '#141414',
          800: '#0D0D0D',
        },
        primary: {
          500: '#9F86DE',
          800: '#180E30',
        },
        secondary: {
          300: '#D8C1D5',
          500: '#A08298',
          700: '#8A216B',
          800: '#50123E',
        }
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
      },
      
      fontSize: {
        '64': '64px',
        '48': '48px',
        '40': '40px',
        '32': '32px',
        '28': '28px',
        '24': '24px',
        '20': '20px',
        '16': '16px',
        '14': '14px',
        '12': '12px',
        '11': '11px',
        '10': '10px',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [
    require("daisyui"),
  ]
}
