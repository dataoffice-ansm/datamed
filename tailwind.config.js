// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('./tailwind.palette.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{,ts,tsx}'],
  important: true,
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
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
      //palette
      transparent: 'transparent',
      current: 'currentColor',
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
      overlay: colors.overlay,

      // primary
      primary: colors.darkViolet,
      'primary-variant': colors.lightViolet,
      'primary-chart': colors.darkViolet[900],
      'primary-chart-1': colors.darkViolet[900],
      'primary-chart-2': colors.darkViolet[800],
      'primary-chart-3': colors.darkViolet[600],
      'primary-chart-4': colors.darkViolet[400],
      'primary-chart-5': colors.darkViolet[200],
      'primary-chart-6': colors.darkViolet[100],
      'primary-chart-7': colors.darkViolet[50],

      // Secondary
      secondary: colors.turquoise,
      'secondary-variant': colors.mint,
      'secondary-background': colors.teal[20],
      'secondary-chart': colors.turquoise[900],
      'secondary-chart-1': colors.turquoise[900],
      'secondary-chart-2': colors.turquoise[800],
      'secondary-chart-3': colors.turquoise[600],
      'secondary-chart-4': colors.turquoise[400],
      'secondary-chart-5': colors.turquoise[200],
      'secondary-chart-6': colors.turquoise[100],
      'secondary-chart-7': colors.turquoise[50],

      // Additional
      text: colors.grey.DEFAULT,
      background: colors.blue[20],
      surface: colors.white,
      border: colors.grey[50],
      'menu-active': colors.black,
      'menu-inactive': colors.grey[400],
      error: colors.darkRed,
      success: colors.darkGreen,
      warning: colors.orange,
      info: colors.blue,
      tags: colors.darkGreen[200],
    },
    extend: {
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
      },
    },
  },
  plugins: [],
};
