export const entityTypeLabel = (type: 'cis' | 'sub') => {
  if (type === 'cis') return 'Specialité';
  if (type === 'sub') return 'Substance';
  return null;
};
