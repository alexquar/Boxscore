import { NextRequest, NextResponse } from "next/server"

import { prisma } from "../../../lib/prisma"

type CreateListBody = {
  userId: string
  name: string
  description?: string | null
  logIds?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateListBody

    if (!body.userId || !body.name?.trim()) {
      return NextResponse.json(
        { error: "userId and name are required" },
        { status: 400 },
      )
    }

    const trimmedName = body.name.trim()
    const trimmedDescription = body.description?.trim()

    const newList = await prisma.list.create({
      data: {
        name: trimmedName,
        description: trimmedDescription || null,
        user: {
          connect: { id: body.userId },
        },
        ...(body.logIds && body.logIds.length > 0
          ? {
              logs: {
                connect: body.logIds.map((id) => ({ id })),
              },
            }
          : {}),
      },
      include: {
        logs: true,
      },
    })

    return NextResponse.json(newList, { status: 201 })
  } catch (error) {
    console.error("Error creating list:", error)
    return NextResponse.json(
      { error: "Failed to create list" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    const lists = await prisma.list.findMany({
      where: userId ? { userId } : undefined,
      include: {
        logs: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(lists, { status: 200 })
  } catch (error) {
    console.error("Error fetching lists:", error)
    return NextResponse.json(
      { error: "Failed to fetch lists" },
      { status: 500 },
    )
  }
}
