//fetch all logs ascociated with a user id
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../../lib/prisma";
import { fetchEvent } from "@/util/fetchEvent";
import type { SportsEvent } from "@/types/eventTypes";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    console.log("Fetching logs w params:", params);
    try {
        const { id } = await params;
    
        const logs = await prisma.log.findMany({
            where: { userId: id },
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        console.log("Fetched logs:", logs);

        // fetch event details for each log
        const logsWithEvents = await Promise.all(logs.map(async (log) => {
            const eventDetails: SportsEvent | null = await fetchEvent(log.gameId);
            return {
                ...log,
                eventDetails,
            };
        }));

        return NextResponse.json(logsWithEvents, { status: 200 });
    } catch (error) {
        console.error("Error fetching logs:", error);
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}