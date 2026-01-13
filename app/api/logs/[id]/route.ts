//fetch a log by id     
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    console.log("Fetching log with ID:", params.id);
    try {
        const log = await prisma.log.findUnique({
            where: { id: params.id },
        });
        console.log("Fetched log:", log);

        if (!log) {
            return NextResponse.json({ error: "Log not found" }, { status: 404 });
        }

        return NextResponse.json(log, { status: 200 });
    } catch (error) {
        console.error("Error fetching log:", error);
        return NextResponse.json({ error: "Failed to fetch log" }, { status: 500 });
    }
}