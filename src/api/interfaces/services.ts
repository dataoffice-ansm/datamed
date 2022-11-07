import type { Speciality } from './models';

export type GetSingleCisControllerResponse = Speciality | null;

export type GetCisPathsControllerResponse = {
  codes: string[];
};

export type GetFindResultResponse = {
  type: 'cis' | 'sub';
  id: string;
  name: string;
};

export type GetFindResultsControllerResponse = {
  results: GetFindResultResponse[];
  meta: {
    count: number;
  };
};
