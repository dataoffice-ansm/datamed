import type { NextApiRequest, NextApiResponse } from 'next';
import { getSingleCisController } from '../../../api/controllers/cis';

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      getSingleCisController(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method Not Allowed`);
  }
};

export default userHandler;
