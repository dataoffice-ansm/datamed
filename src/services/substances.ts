import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import { fetcher, fetcherWithErrorHandling } from '../utils/fetcher';
import type { GetSingleSubstanceControllerResponse } from '../api/interfaces/services';

export const useFetchSubstance = <T = GetSingleSubstanceControllerResponse, U = string>(
  subId: string,
  options?: SWRConfiguration<T, U>,
  shouldFetch = true
) => useSWR<T, U>(shouldFetch ? `sub/${subId}` : null, fetcher, options);

export const getSingleSubstance = async (subId: string) =>
  fetcherWithErrorHandling<GetSingleSubstanceControllerResponse>(`sub/${subId}`);

export const getSubstancesPaths = async () =>
  fetcherWithErrorHandling<GetSingleSubstanceControllerResponse>('sub/paths').then((data) => data);
