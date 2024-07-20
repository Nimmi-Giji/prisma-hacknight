"use client";
import { Leaderboard } from "@prisma/client";

export default function UpvoteButton({ Leaderboard }: { Leaderboard: Leaderboard }) {
  return (
      <button
        className="m-6 bg-indigo600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:bg-indigo800 hover:scale-105"
        onClick={() => {
          console.log(`button pressed`, Leaderboard.id, Leaderboard.name);
        }}
      >
        ⬆ {' ' + Leaderboard.name}
      </button>
  );
}