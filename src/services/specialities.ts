import useSWR from 'swr';
import { fetcher, fetcherWithErrorHandling } from '../utils/fetcher';
import type { GetSingleCisControllerResponse } from '../api/interfaces/services';
import type { GetCisPathsControllerResponse } from '../api/interfaces/services';

export const useFetchSpeciality = (cisId: string, shouldFetch = true) =>
  useSWR<GetSingleCisControllerResponse, string>(shouldFetch ? `cis/${cisId}` : null, fetcher);

export const getSingleSpeciality = async (cisId: string) =>
  fetcherWithErrorHandling<GetSingleCisControllerResponse>(`cis/${cisId}`);

export const getSpecialitiesPaths = async () =>
  fetcherWithErrorHandling<GetCisPathsControllerResponse>('cis/paths').then((data) => data);
