//fetch the top 3 games by number of logs
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try{
  const topGames = await prisma.log.findMany({
    select: {
      gameId: true,
    },
    orderBy: {
      likes: "desc",
    },
    take: 3,
  })
    return NextResponse.json(topGames, { status: 200 });

}catch(error){
    console.error("Error fetching top games:", error);
    return NextResponse.json({ error: "Failed to fetch top games" }, { status: 500 });
}
}