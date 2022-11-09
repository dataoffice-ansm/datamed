import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import { fetcher, fetcherWithErrorHandling } from '../utils/fetcher';
import type { GetSingleCisControllerResponse } from '../api/interfaces/services';
import type { GetCisPathsControllerResponse } from '../api/interfaces/services';

export const useFetchSpeciality = <T = GetSingleCisControllerResponse, U = string>(
  cisId: string,
  options: SWRConfiguration<T, U>,
  shouldFetch = true
) => useSWR<T, U>(shouldFetch ? `cis/${cisId}` : null, fetcher, options);

export const getSingleSpeciality = async (cisId: string) =>
  fetcherWithErrorHandling<GetSingleCisControllerResponse>(`cis/${cisId}`);

export const getSpecialitiesPaths = async () =>
  fetcherWithErrorHandling<GetCisPathsControllerResponse>('cis/paths').then((data) => data);
