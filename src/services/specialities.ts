import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import type { GetSingleCisControllerResponse } from '../api/interfaces/services';
import type { GetCisPathsControllerResponse } from '../api/interfaces/services';

export const useFetchSpeciality = (cisId: string, shouldFetch = true) =>
  useSWR<GetSingleCisControllerResponse, string>(shouldFetch ? `cis/${cisId}` : null, fetcher);

export const getSingleSpeciality = async (cisId: string) =>
  fetcher<GetSingleCisControllerResponse>(`cis/${cisId}`);

export const getSpecialitiesPaths = async () =>
  fetcher<GetCisPathsControllerResponse>('cis/paths').then((data) => data);
