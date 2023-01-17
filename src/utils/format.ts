import { format } from 'date-fns';

/**
 *
 * @param value
 * @param unit
 */
export const formatDecimalToUnit = (value: number, unit: string) =>
  `${numberWithThousand(value)} ${unit}`;

export const numberWithThousand = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const toNormalForm = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const formatDate = (dateString: string) => format(new Date(dateString), 'dd/MM/yyyy');
