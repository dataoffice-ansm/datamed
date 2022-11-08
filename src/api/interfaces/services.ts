import type { Speciality, Substance } from './models';

export type GetSingleCisControllerResponse = Partial<Speciality> | null;

export type GetCisPathsControllerResponse = {
  codes: string[];
};

export type SingleCisResultResponse = {
  type: 'cis';
  id: string;
  name: string;
};

export type GetCisEntitiesControllerResponse = {
  results: SingleCisResultResponse[];
  meta: {
    count: number;
  };
};

// SUBSTANCES //

export type GetSingleSubstanceControllerResponse = Partial<Substance> | null;

export type GetSubstancesPathsControllerResponse = {
  codes: string[];
};

export type SingleSubstanceResultResponse = {
  type: 'sub';
  id: string;
  name: string;
};

export type GetSubstancesEntitiesControllerResponse = {
  results: SingleSubstanceResultResponse[];
  meta: {
    count: number;
  };
};
