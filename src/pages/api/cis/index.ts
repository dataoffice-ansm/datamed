import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      res.end('root');
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method Not Allowed`);
  }
};

export default handler;
