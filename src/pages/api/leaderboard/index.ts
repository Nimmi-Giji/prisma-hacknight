import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const leaderboard = await prisma.leaderboard.findMany({
      orderBy: { score: 'desc' },
    });
    res.status(200).json(leaderboard);
  } else if (req.method === 'POST') {
    const { name, score } = req.body;
    const newEntry = await prisma.leaderboard.create({
      data: { name, score },
    });
    res.status(201).json(newEntry);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
