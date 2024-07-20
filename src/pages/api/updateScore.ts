import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, newScore } = req.body;

    if (typeof userId !== 'number' || typeof newScore !== 'number') {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      // Update user score in the database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { score: newScore },
      });

      // Emit update to WebSocket clients
      const io = res.socket.server.io;
      io.emit('leaderboardUpdate', updatedUser);

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
