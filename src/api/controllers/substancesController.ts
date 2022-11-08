import type { NextApiRequest } from 'next';
import substancesJson from '../mocks/substances.json';
import type { NextApiResponse } from 'next';
import type {
  GetSingleSubstanceControllerResponse,
  GetSubstancesEntitiesControllerResponse,
  GetSubstancesPathsControllerResponse,
  SingleSubstanceResultResponse,
} from '../interfaces/services';

/**
 *
 * @param _req
 * @param res
 */
export const getSubstancesPathsController = (
  _req: NextApiRequest,
  res: NextApiResponse<GetSubstancesPathsControllerResponse>
) => {
  const codes = substancesJson.map((sub) => sub.code);
  res.json({ codes });
};

/**
 *
 * @param _req
 * @param res
 */
export const getSubstancesEntitiesController = (
  _req: NextApiRequest,
  res: NextApiResponse<GetSubstancesEntitiesControllerResponse>
) => {
  const entities: SingleSubstanceResultResponse[] = substancesJson.map(({ code, nom }) => ({
    id: code,
    name: nom,
    type: 'sub',
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
export const getSingleSubstanceController = (
  req: NextApiRequest,
  res: NextApiResponse<GetSingleSubstanceControllerResponse>
) => {
  const cisId = req.query.cisId as string;
  const match = substancesJson.find((cis) => cis.code === cisId);
  if (match) {
    res.json({ id: match.code, name: match.nom });
  } else {
    res.status(400);
  }
};
