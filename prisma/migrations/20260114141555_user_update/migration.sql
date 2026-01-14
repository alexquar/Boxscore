-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Bio" TEXT,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "favoriteLeague" TEXT,
ADD COLUMN     "favoritePlayer" TEXT,
ADD COLUMN     "favoriteTeam" TEXT,
ALTER COLUMN "id" DROP DEFAULT;
