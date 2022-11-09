import type { NextApiRequest, NextApiResponse } from 'next';
import { getSubstancesEntitiesController } from '../../../api/controllers/substancesController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    // Preflight Check:
    case 'OPTIONS': {
      res.setHeader('Allow', 'GET');
      res.status(202).end();
      break;
    }

    case 'GET': {
      getSubstancesEntitiesController(req, res);
      break;
    }

    default:
      res.setHeader('Allow', ['GET', 'OPTIONS']);
      res.status(405).end(`Method Not Allowed`);
  }
};

export default handler;