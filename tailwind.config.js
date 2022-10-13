/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{,ts,tsx}'],
  theme: {
    fontFamily: {
      roboto: ['Roboto Slab', 'sans-serif'],
    },
    container: {
      center: true,
      padding: {
        xs: '.5rem',
        DEFAULT: '1rem',
        ssm: '1rem',
        sm: '1rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
    },
    extend: {},
  },
  plugins: [],
};
