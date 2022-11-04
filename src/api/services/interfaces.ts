import type { Speciality } from '../models';

export type GetSingleCisControllerResponse = Speciality | null;

export type GetCisPathsControllerResponse = {
  codes: string[];
};
