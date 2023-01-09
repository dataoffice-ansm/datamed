import { type OptionsValue } from '../components/GraphBoxSelect';

export const entityTypeLabel = (type: 'cis' | 'sub') => {
  if (type === 'cis') return 'Specialité';
  if (type === 'sub') return 'Substance';
  return null;
};

export type RepartitionUsageCommon = {
  range: string;
  value: number;
  valuePercent: number;
};

export const buildSortedData = <T>(data: any, selectedOption?: OptionsValue) => {
  const rows =
    (data as RepartitionUsageCommon[])?.filter(
      (row) => row?.value !== null && row?.valuePercent !== null
    ) ?? [];

  if (selectedOption === 'number') {
    return rows
      .sort((a, b) => (a.value !== null && b.value !== null ? a.value - b.value : 1))
      .reverse() as T[];
  }

  if (selectedOption === 'percent') {
    return rows
      .sort((a, b) =>
        a.valuePercent !== null && b.valuePercent !== null ? a.valuePercent - b.valuePercent : 1
      )
      .reverse() as T[];
  }

  return rows as T[];
};
