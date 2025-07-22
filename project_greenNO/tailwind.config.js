/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7a8f7a',
          500: '#5d7a5d',
          600: '#4a6249',
          700: '#3d503c',
          800: '#334233',
          900: '#2b372b',
        },
        coral: {
          50: '#fef7f7',
          100: '#feecec',
          200: '#fedddd',
          300: '#fcc1c1',
          400: '#f89595',
          500: '#f06969',
          600: '#dd4545',
          700: '#ba3535',
          800: '#9a2f2f',
          900: '#802d2d',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
};