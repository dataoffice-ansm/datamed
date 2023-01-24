export const lookUpSearch = (lookup: string, search: string) =>
  search.split(' ').every((word) => lookup.toLowerCase().includes(word.toLowerCase()));
