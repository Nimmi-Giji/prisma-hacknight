import http from "http";
import prisma from "./lib/prisma"; 
import { Server } from "socket.io";

const httpServer = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is running ...");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const corsOrigins = [
  process.env.CLIENT_URL ?? "http://localhost:3000",
  "http://localhost:3000",
];
console.log(`cors origins: `, corsOrigins);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, async () => {
  console.log(`socket.io server is running on port ${PORT}`);
  await ensureLeaderboardTableExists();
  await streamPlayerUpdates(io);
});

async function ensureLeaderboardTableExists() {
  try {
    const tableExists = await prisma.informationSchema.findFirst({
      where: { tableName: "Leaderboard" },
    });

    if (!tableExists) {
      console.log("Creating Leaderboard table...");
      await prisma.$executeRawUnsafe(`
        CREATE TABLE "Leaderboard" (
          "id" SERIAL NOT NULL PRIMARY KEY,
          "name" TEXT NOT NULL,
          "score" INTEGER NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Leaderboard table created successfully.");
    } else {
      console.log("Leaderboard table already exists.");
    }
  } catch (error) {
    console.error("Error checking or creating Leaderboard table:", error);
  }
}

async function streamPlayerUpdates(io: Server) {
  try {
    const stream = await prisma.player.stream({
      select: { id: true, name: true, score: true },
    });

    for await (const event of stream) {
      console.log(`received event: `, event);

      if (event.action === "update") {
        await updateLeaderboard(event.data); 
        io.sockets.emit("player_points", event);
      }
    }
  } catch (error) {
    console.error("Error handling player updates:", error);
  }
}


async function updateLeaderboard(playerData: { id: number; score: number }) {
  try {
    await prisma.leaderboard.upsert({
      where: { id: playerData.id },
      create: {
        name: "(placeholder)", 
        score: playerData.score,
      },
      update: {
        score: playerData.score, 
      },
    });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
}
