import type { NextApiRequest, NextApiResponse } from 'next';
import { getCisPathsController } from '../../../api/controllers/cis';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      getCisPathsController(req, res);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method Not Allowed`);
  }
};

export default handler;
