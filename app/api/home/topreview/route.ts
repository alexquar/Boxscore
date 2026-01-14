// find the review with the most like 

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const topReview = await prisma.log.findFirst({
            orderBy: {
                likes: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true,
                    },
                },
            },
        });
        
        if (!topReview) {
            return NextResponse.json({ error: "No reviews found" }, { status: 404 });
        }
        return NextResponse.json(topReview, { status: 200 });
    } catch (error) {
        console.error("Error fetching top review:", error);
        return NextResponse.json({ error: "Failed to fetch top review" }, { status: 500 });
    }
}