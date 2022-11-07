import type { AxiosError } from 'axios';
import axios from 'axios';
import { serverApiRoute } from '../config/serverRoot';

type ErrorBase<T> = {
  error: Error | AxiosError<T>;
  type: 'axios-error' | 'stock-error';
};

type AxiosCustomError<T> = {
  error: AxiosError<T>;
  type: 'axios-error';
} & ErrorBase<T>;

type StockError<T> = {
  error: Error;
  type: 'stock-error';
} & ErrorBase<T>;

export function axiosErrorHandler<T = string>(
  callback: (err: AxiosCustomError<T> | StockError<T>) => void
) {
  return (error: Error | AxiosError<T>) => {
    if (axios.isAxiosError(error)) {
      callback({
        error,
        type: 'axios-error',
      });
    } else {
      callback({
        error,
        type: 'stock-error',
      });
    }
  };
}

export const fetcher = async <T>(url: string) => {
  const route = `${serverApiRoute}/api/${url}`;
  const { data } = await axios.get<T>(route);
  return data;
};

export const fetcherWithErrorHandling = async <T>(url: string) =>
  fetcher<T>(url)
    .then((data) => data)
    .catch(
      axiosErrorHandler((res) => {
        if (res.type === 'axios-error') {
          //type is available here
          const { error } = res;
          console.log(error);
        } else {
          //stock error
          console.log('stock error');
        }
      })
    );
