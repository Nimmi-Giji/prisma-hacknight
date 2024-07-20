import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, newScore } = req.body;

    await prisma.score.create({
      data: {
        value: newScore,
        userId,
      },
    });

    const leaderboard = await prisma.user.findMany({
      include: {
        scores: true,
      },
    });

    res.status(200).json({ leaderboard });
  } else {
    res.status(405).end();
  }
};

export default handler;
