//fetch a log by id     
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../lib/prisma";
import { fetchEvent } from "@/util/fetchEvent";
import type { SportsEvent } from "@/types/eventTypes";
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    console.log("Fetching log w params:", params);
    try {
        const { id } = await params;
    
        const log = await prisma.log.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                    },
                },
            }
        });
        console.log("Fetched log:", log);

        if (!log) {
            return NextResponse.json({ error: "Log not found" }, { status: 404 });
        }
        // fetch the game log from the sports db 
        const eventDetails: SportsEvent | null = await fetchEvent(log.gameId);
        if(!eventDetails) {
            return NextResponse.json({ error: "Event details not found" }, { status: 404 });
        }
        const dataWithEvent = {
            ...log,
            eventDetails,
        };
        return NextResponse.json(dataWithEvent, { status: 200 });
    } catch (error) {
        console.error("Error fetching log:", error);
        return NextResponse.json({ error: "Failed to fetch log" }, { status: 500 });
    }
}