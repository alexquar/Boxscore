/*
  Warnings:

  - You are about to drop the column `gameIds` on the `lists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "journals" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "lists" DROP COLUMN "gameIds",
ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "logs" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- CreateTable
CREATE TABLE "_ListLogs" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ListLogs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ListLogs_B_index" ON "_ListLogs"("B");

-- AddForeignKey
ALTER TABLE "_ListLogs" ADD CONSTRAINT "_ListLogs_A_fkey" FOREIGN KEY ("A") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListLogs" ADD CONSTRAINT "_ListLogs_B_fkey" FOREIGN KEY ("B") REFERENCES "logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
