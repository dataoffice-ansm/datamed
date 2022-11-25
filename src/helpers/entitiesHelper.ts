export const entityTypeLabel = (type: 'cis' | 'sub') => {
  if (type === 'cis') return 'Specialité';
  if (type === 'sub') return 'Substance';
  return null;
};

export const entityTypeRoute = (type: 'cis' | 'sub') => {
  if (type === 'cis') return 'speciality';
  if (type === 'sub') return 'substance';
  return null;
};
