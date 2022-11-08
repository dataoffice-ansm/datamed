import type { NextApiRequest, NextApiResponse } from 'next';
import { getSingleCisController } from '../../../api/controllers/specialitiesController';

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
      getSingleCisController(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'OPTIONS']);
      res.status(405).end(`Method Not Allowed`);
  }
};

export default userHandler;
