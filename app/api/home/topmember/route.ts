// fetch the user with the most logs
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try{
  const topMember = await prisma.user.findFirst({
    orderBy: {
      logs: {
        _count: "desc",
      },
    },
    select: {
        id: true,
        displayName: true,
        avatarUrl: true,
        _count: {
            select: { logs: true },
        },
    },
  })
    return NextResponse.json(topMember, { status: 200 });

}catch(error){
    console.error("Error fetching top member:", error);
    return NextResponse.json({ error: "Failed to fetch top member" }, { status: 500 });
}
}