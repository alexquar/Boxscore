/*
  Warnings:

  - A unique constraint covering the columns `[userId,gameId]` on the table `logs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "logs" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "logs_userId_gameId_key" ON "logs"("userId", "gameId");
