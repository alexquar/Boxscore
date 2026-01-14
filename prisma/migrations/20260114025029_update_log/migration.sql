-- AlterTable
ALTER TABLE "logs" ADD COLUMN     "deservedWin" INTEGER,
ADD COLUMN     "finalScore" TEXT,
ADD COLUMN     "howDidYouWatch" TEXT,
ADD COLUMN     "standoutPlayers" TEXT[],
ADD COLUMN     "viewingTime" TEXT;
