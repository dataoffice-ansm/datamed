/**
 *
 * @param value
 * @param unit
 */
export const formatDecimalToUnit = (value: number, unit: string) => `${value} ${unit}`;

export const numberWithThousand = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
