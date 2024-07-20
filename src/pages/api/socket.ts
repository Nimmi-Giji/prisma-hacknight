import { Server } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Check if WebSocket server is already initialized
    if (!res.socket.server.io) {
      console.log('Setting up WebSocket server');
      const io = new Server(res.socket.server);

      io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('updateScore', (data) => {
          console.log('Received updateScore:', data);
          io.emit('leaderboardUpdate', { userId: data.userId, newScore: data.newScore });
        });
      });

      // Attach the WebSocket server instance to the Next.js server
      res.socket.server.io = io;
    }
    res.status(200).json({ message: 'WebSocket server initialized' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
