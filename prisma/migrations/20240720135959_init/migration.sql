-- CreateTable
CREATE TABLE "Player" (
    "userId" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_userName_key" ON "Player"("userName");
