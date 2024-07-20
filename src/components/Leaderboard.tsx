import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    socket.on('leaderboardUpdate', (data) => {
      // Update leaderboard data
      setLeaderboard((prevLeaderboard) => {
        // Logic to update leaderboard
        return prevLeaderboard; // Replace with updated leaderboard data
      });
    });

    return () => {
      socket.off('leaderboardUpdate');
    };
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user) => (
          <li key={user.id}>{user.name}: {user.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
