const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const leaderboard = await prisma.leaderboard.createMany({
      data: [
        { name: "Player1", score: 100 },
        { name: "Player2", score: 200 },
        { name: "Player3", score: 150 },
      ],
    });
    console.log(`Seeded the database with ${leaderboard.count} leaderboard entries.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
