//route for creating a log 
// model Log{
//   id        String   @id @db.Uuid
//   comments  String?
//   rating    Decimal? @db.Decimal(2,1)
//   createdAt DateTime @default(now())
//   user     User     @relation(fields: [userId], references: [id])
//   userId   String   @db.Uuid
//   gameId    String
//   @@index([userId], name: "logs_user_id_idx")
//   @@map("logs")
//   lists List[] @relation("ListLogs")
// }
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma";
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newLog = await prisma.log.create({
            data: {
                comments: body.comments,
                rating: body.rating,
                userId: body.userId,
                gameId: body.gameId,
            },
        });
        return NextResponse.json(newLog, { status: 201 });
    } catch (error) {
        console.error("Error creating log:", error);
        return NextResponse.json({ error: "Failed to create log" }, { status: 500 });
    }
}