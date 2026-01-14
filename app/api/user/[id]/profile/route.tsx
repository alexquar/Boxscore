// fetch needed data for the user profile (all data from the users table
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
// model User {
//   id        String   @id @db.Uuid
//   email     String?  @unique
//   displayName      String?
//   Bio       String?
//   avatarUrl String?
//   favoriteTeam String?
//   favoritePlayer String?
//   favoriteLeague String?
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt @default(now())
//   journals  Journal[]
//   logs     Log[]
//   @@index([id], name: "users_id_idx")
//   @@map("users")
//   lists List[]
// }
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    console.log("Fetching profile for user ID:", id);
    try{
  const userProfile = await prisma.user.findUnique({
    where: { id },
    select: {
        id: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        Bio: true,
        favoriteTeam: true,
        favoritePlayer: true,
        favoriteLeague: true,
        createdAt: true,
        _count: {
            select: {
                logs: true,
                journals: true,
                lists: true,
            }
        }
    }
  })
  if(!userProfile){
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
    return NextResponse.json(userProfile, { status: 200 });

}catch(error){
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 });
}
}