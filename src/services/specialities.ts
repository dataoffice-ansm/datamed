import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import type { GetSingleCisControllerResponse } from '../api/services/interfaces';
import type { GetCisPathsControllerResponse } from '../api/services/interfaces';

export const useFetchSpeciality = (cisId: string, shouldFetch = true) =>
  useSWR<GetSingleCisControllerResponse, string>(shouldFetch ? `cis/${cisId}` : null, fetcher);

export const getSingleSpeciality = async (cisId: string) =>
  fetcher<GetSingleCisControllerResponse>(`cis/${cisId}`);

export const getSpecialitiesPaths = async () =>
  fetcher<GetCisPathsControllerResponse>('cis/paths').then((data) => data);
