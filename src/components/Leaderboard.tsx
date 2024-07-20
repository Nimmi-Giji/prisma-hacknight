import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('leaderboardUpdate', (data) => {
      console.log('Received leaderboard update:', data);
      setLeaderboard(data);
    });

    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
      setError('Failed to connect to WebSocket server');
    });

    return () => {
      socket.off('leaderboardUpdate');
      socket.off('connect');
      socket.off('connect_error');
    };
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {leaderboard.length > 0 ? (
          leaderboard.map((user) => (
            <li key={user.id}>{user.name}: {user.score}</li>
          ))
        ) : (
          <p>No leaderboard data available</p>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
