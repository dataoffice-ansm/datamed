import axios from 'axios';
import { serverApiRoute } from '../config/serverRoot';

export const fetcher = async <T>(url: string) => {
  const route = `${serverApiRoute}/api/${url}`;
  const { data } = await axios.get<T>(route);
  return data;
};
