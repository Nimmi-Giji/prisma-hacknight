import type { NextPage } from 'next';
import Head from 'next/head';
import Leaderboard from '../components/Leaderboard';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Leaderboard App</title>
        <meta name="description" content="A real-time leaderboard app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Leaderboard App</h1>
        <Leaderboard />
      </main>

      <footer>
        <p>Powered by Next.js</p>
      </footer>
    </div>
  );
};

export default Home;
