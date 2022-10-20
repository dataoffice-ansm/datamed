/** @type {import('tailwindcss').Config} */

const colors = require('./theme/colors');

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
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.darkViolet,
      secondary: colors.turquoise,
      white: colors.white,
      black: colors.black,
      'dark-violet': colors.darkViolet,
      'light-violet': colors.lightViolet,
      orange: colors.orange,
      red: colors.red,
      turquoise: colors.turquoise,
      green: colors.green,
      'dark-green': colors.darkGreen,
      grey: colors.grey,
      'dark-blue': colors.darkBlue,
      blue: colors.blue,
      'dark-yellow': colors.darkYellow,
      yellow: colors.yellow,
      'dark-red': colors.darkRed,
      pink: colors.pink,
      teal: colors.teal,
      mint: colors.mint,
      'skin-1': colors.skin1,
      'skin-2': colors.skin2,
      'skin-3': colors.skin3,
      'skin-4': colors.skin4,
      'skin-5': colors.skin5,
      'skin-6': colors.skin6,
    },
    extend: {},
  },
  plugins: [],
};
