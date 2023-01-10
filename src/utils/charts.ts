import { darkGreen, darkViolet, turquoise } from '../../tailwind.palette.config';

export type ChartPalette =
  | 'primary'
  | 'primary-full'
  | 'secondary'
  | 'secondary-full'
  | 'green'
  | 'green-full';

export const chartThemeGradient = (theme: ChartPalette) => {
  switch (theme) {
    case 'secondary':
      return [turquoise[200], turquoise[500], turquoise[900]].reverse();

    case 'secondary-full':
      return [
        turquoise[50],
        turquoise[100],
        turquoise[200],
        turquoise[300],
        turquoise[400],
        turquoise[500],
        turquoise[600],
        turquoise[700],
        turquoise[800],
        turquoise[900],
      ].reverse();

    case 'green':
      return [darkGreen[200], darkGreen[500], darkGreen[900]].reverse();

    case 'green-full':
      return [
        darkGreen[50],
        darkGreen[100],
        darkGreen[200],
        darkGreen[300],
        darkGreen[400],
        darkGreen[500],
        darkGreen[600],
        darkGreen[700],
        darkGreen[800],
        darkGreen[900],
      ].reverse();

    case 'primary-full':
      return [
        darkViolet[50],
        darkViolet[100],
        darkViolet[200],
        darkViolet[400],
        darkViolet[600],
        darkViolet[800],
        darkViolet[900],
      ].reverse();

    case 'primary':
    default:
      return [darkViolet[200], darkViolet[500], darkViolet[900]].reverse();
  }
};
