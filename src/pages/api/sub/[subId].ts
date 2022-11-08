import type { NextApiRequest, NextApiResponse } from 'next';
import { getSingleSubstanceController } from '../../../api/controllers/substancesController';

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    // Preflight Check:
    case 'OPTIONS': {
      res.setHeader('Allow', 'GET');
      res.status(202).end();
      break;
    }

    case 'GET':
      getSingleSubstanceController(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'OPTIONS']);
      res.status(405).end(`Method Not Allowed`);
  }
};

export default userHandler;
