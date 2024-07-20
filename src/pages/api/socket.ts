import { Server } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (!res.socket.server.io) {
      console.log('Setting up socket.io');
      const io = new Server(res.socket.server);

      io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('updateScore', async (data) => {
          const { userId, newScore } = data;
          // Implement your logic to update the score in your database

          // Emit updated leaderboard
          io.emit('leaderboardUpdate', { userId, newScore });
        });
      });

      res.socket.server.io = io;
    }
    res.end();
  } else {
    res.status(405).end();
  }
};

export default handler;
