import { notFound } from "next/navigation"

import { SplitPage } from "@/components/split-page"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type LogFromApi = {
  id: string
  comments?: string | null
  rating?: number | string | null
  createdAt?: string
  userId?: string
  gameId?: string
}

interface LogPageProps {
  params: {
    id: string
  }
}

async function getLog(id: string): Promise<LogFromApi> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const url = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}/logs/${id}`
    : `/api/logs/${id}`

  const res = await fetch(url, {
    // Always show the freshest version of a log
    cache: "no-store",
  })

  if (res.status === 404) {
    notFound()
  }

  if (!res.ok) {
    throw new Error("Failed to load log")
  }

  return res.json()
}

export default async function LogDetailPage({ params }: LogPageProps) {
  const log = await getLog(params.id)

  const createdAt = log.createdAt ? new Date(log.createdAt) : null

  return (
    <SplitPage
      title={
        <>
          Game log
          <span className="block text-primary">relive how it felt.</span>
        </>
      }
      description={
        <>
          Review your rating and notes for this game. We&apos;ll also surface rich
          game details alongside your log once the external data hookup is in
          place.
        </>
      }
      pills={["Your rating", "Personal notes", "Game context"]}
    >
      <div className="space-y-6">
        {/* Game details card — data to come from the external game API. */}
        <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
          <CardHeader>
            <CardTitle className="text-lg">Game details</CardTitle>
            <CardDescription>
              Boxscore-style view of the matchup, score, and key stats will
              appear here once wired up to the game data source.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              {/* Placeholder scoreboard / matchup block */}
              <div className="space-y-3 rounded-lg border border-dashed border-border/60 bg-background/40 p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Matchup</span>
                  {log.gameId && (
                    <span className="text-xs">Game ID: {log.gameId}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xl font-semibold">
                  <span className="opacity-60">Home team</span>
                  <span className="opacity-60">Away team</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use <code>gameId</code> to fetch league, teams, final score,
                  and advanced stats from your external provider. This card is
                  intentionally structured to hold that information.
                </p>
              </div>

              {/* Meta sidebar for date / venue / league, to be filled from game API */}
              <div className="space-y-3 rounded-lg border border-dashed border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">Game meta</span>
                  <span>League • Season • Game type</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">When &amp; where</span>
                  <span>Date &amp; local time</span>
                  <span>Venue / arena</span>
                </div>
                <p className="text-xs">
                  Replace this placeholder copy with real values once the
                  backend response includes enriched game details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Log details driven by our own database */}
        <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Your log</CardTitle>
                <CardDescription>
                  How you experienced this game, captured in your own words.
                </CardDescription>
              </div>
              {log.rating != null && (
                <Badge variant="secondary" className="text-xs">
                  Rating: {String(log.rating)}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {createdAt && (
              <p className="text-xs text-muted-foreground">
                Logged on {createdAt.toLocaleDateString()} at {""}
                {createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            )}

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Notes
              </p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {log.comments ? log.comments : "No notes were added for this game."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SplitPage>
  )
}

