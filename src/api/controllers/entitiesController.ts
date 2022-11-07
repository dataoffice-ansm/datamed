import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  GetFindResultResponse,
  GetFindResultsControllerResponse,
} from '../interfaces/services';
import { mockSpecialitiesData } from '../mocks/specialities.mock';
import { mockSubstancesData } from '../mocks/substances.mock';

/**
 *
 * @param _req
 * @param res
 */
export const getListEntitiesController = (
  _req: NextApiRequest,
  res: NextApiResponse<GetFindResultsControllerResponse>
) => {
  const cis: GetFindResultResponse[] = mockSpecialitiesData.map(({ id, name }) => ({
    id,
    name,
    type: 'cis',
  }));

  const subs: GetFindResultResponse[] = mockSubstancesData.map(({ id, name }) => ({
    id,
    name,
    type: 'sub',
  }));

  const results = [...cis, ...subs];

  res.json({
    results,
    meta: {
      count: results.length,
    },
  });
};
