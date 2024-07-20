import React from 'react';
import Head from 'next/head';
import Leaderboard from '../components/Leaderboard';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Leaderboard</title>
      </Head>
      <main>
        <Leaderboard />
      </main>
    </div>
  );
};

export default Home;
