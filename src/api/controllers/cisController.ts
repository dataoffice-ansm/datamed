import type { NextApiRequest } from 'next';
import { mockSpecialitiesData } from '../mocks/specialities.mock';
import { mockSubstancesData } from '../mocks/substances.mock';
import type { NextApiResponse } from 'next';
import type { GetSingleCisControllerResponse } from '../interfaces/services';
import type { GetCisPathsControllerResponse } from '../interfaces/services';
import type { GetFindResultsControllerResponse } from '../interfaces/services';
import type { GetFindResultResponse } from '../interfaces/services';

/**
 *
 * @param _req
 * @param res
 */
export const getCisPathsController = (
  _req: NextApiRequest,
  res: NextApiResponse<GetCisPathsControllerResponse>
) => {
  const codes = mockSpecialitiesData.map((cis) => cis.id);
  res.json({ codes });
};

/**
 *
 * @param req
 * @param res
 */
export const getSingleCisController = (
  req: NextApiRequest,
  res: NextApiResponse<GetSingleCisControllerResponse>
) => {
  const cisId = req.query.cisId as string;
  const cis = mockSpecialitiesData.find((cis) => cis.id === cisId);
  if (cis) {
    res.json(cis);
  } else {
    res.status(400);
  }
};
