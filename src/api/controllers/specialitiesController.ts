import type { NextApiRequest } from 'next';
import specialitiesJson from '../mocks/specialites.json';
import type { NextApiResponse } from 'next';
import type { GetSingleCisControllerResponse } from '../interfaces/services';
import type { GetCisPathsControllerResponse } from '../interfaces/services';
import type { GetCisEntitiesControllerResponse } from '../interfaces/services';
import type { SingleCisResultResponse } from '../interfaces/services';

/**
 *
 * @param _req
 * @param res
 */
export const getCisPathsController = (
  _req: NextApiRequest,
  res: NextApiResponse<GetCisPathsControllerResponse>
) => {
  const codes = specialitiesJson.map((cis) => cis.cis);
  res.json({ codes });
};

/**
 *
 * @param _req
 * @param res
 */
export const getCisEntitiesController = (
  _req: NextApiRequest,
  res: NextApiResponse<GetCisEntitiesControllerResponse>
) => {
  const entities: SingleCisResultResponse[] = specialitiesJson.map(({ cis, nom }) => ({
    id: cis,
    name: nom,
    type: 'cis',
  }));

  res.json({
    results: entities,
    meta: {
      count: entities.length,
    },
  });
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
  const match = specialitiesJson.find((cis) => cis.cis === cisId);
  if (match) {
    res.json({ id: match.cis, name: match.nom });
  } else {
    res.status(400);
  }
};
