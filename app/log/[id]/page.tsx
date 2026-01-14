import { notFound } from "next/navigation"

import { SplitPage } from "@/components/split-page"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SurfaceCard } from "@/components/shared/surface-card"
import { RatingStars } from "@/components/shared/rating-stars"
import type { LogWithEventDetails } from "@/types/eventTypes"
import Link from "next/link"
// In modern Next.js App Router, `params` is provided as a Promise
// so it must be unwrapped with `await` before use.
type LogPageProps = {
  params: Promise<{
    id: string
  }>
}

async function getLog(id: string): Promise<LogWithEventDetails> {
  // Guard against bad or missing IDs so we never call fetch with "undefined".
  console.log("Fetching log with ID:", id)
  if (!id || id === "undefined") {
    notFound()
  }

  const externalApiBase = process.env.NEXT_PUBLIC_API_BASE_URL

  // When calling from a server component, `fetch` requires an absolute URL.
  // If an external API base is configured, use that; otherwise, call our
  // internal App Router API with the current deployment's origin.
  const url = externalApiBase
    ? `${externalApiBase.replace(/\/$/, "")}/logs/${id}`
    : `${
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3001"
      }/api/logs/${id}`

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

  const data: LogWithEventDetails = await res.json()
  console.log("Fetched log data:", data)
  return data
}

function normalizeRatingToFive(raw: LogWithEventDetails["rating"]): number {
  if (raw == null) return 0
  const numeric = typeof raw === "string" ? parseFloat(raw) : raw
  if (!Number.isFinite(numeric)) return 0

  // Support both 0–5 and 0–10 inputs by normalizing to a 5-star scale.
  const maybeTenScale = numeric > 5 ? numeric / 2 : numeric
  return Math.min(5, Math.max(0, maybeTenScale))
}

export default async function LogDetailPage({ params }: LogPageProps) {
  // `params` is a Promise – unwrap it before accessing `id`.
  const { id } = await params

  const log = await getLog(id)

  const createdAt = log.createdAt ? new Date(log.createdAt) : null
  const ratingForStars = normalizeRatingToFive(log.rating)

  return (
    <SplitPage
      title={
        <>
          {
            log.user.displayName
          }'s log of 
          <span className="block  text-primary">{
            log.eventDetails.strFilename
          }</span>
        </>
      }
      description={
        <>
            Take a look at the details of this logged game, want to make a review yourself? 
            <Link href={`/log/create/${log.gameId}`} className="text-primary ms-2 underline">Create your own log</Link>
        </>
      }
      pills={["Rating", "Notes", "Deserve-to-winometer"]}
    >
      <div className="space-y-6">
        {/* Game details card — data to come from the external game API. */}
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-lg">Game details</CardTitle>
            <CardDescription>
              Boxscore-style view of the matchup, score, and key stats will
              appear here once wired up to the game data source.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              {/* Placeholder scoreboard / matchup block */}
              <div className="space-y-3 rounded-lg border border-dashed border-border/60 bg-background/40 p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Matchup</span>
                  {log.gameId && (
                    <span className="text-xs">Game ID: {log.gameId}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xl font-semibold">
                  <span className="opacity-60 ">{log.eventDetails.strHomeTeam}</span>
                  <span className="opacity-60 ">{log.eventDetails.strAwayTeam}</span>
                </div>
                <div className="flex items-center justify-between text-xl font-semibold">
                  {/* centered scores */}
                  <span className="opacity-60 mx-auto">{log.eventDetails.intHomeScore}</span>
                  <span className="opacity-60 mx-auto">{log.eventDetails.intAwayScore}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                    {log.eventDetails.strDescriptionEN || "Game description not available."}
                  
                </p>
              </div>

              {/* Meta sidebar for date / venue / league, to be filled from game API */}
              <div className="space-y-3 rounded-lg border border-dashed border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">Game meta</span>
                    <div className="flex flex-row lg:flex-col gap-1">
                        <span>League:</span>
                        <span>{log.eventDetails.strLeague || "N/A"}</span>
                    </div>
                    <div className="flex flex-row lg:flex-col gap-1">
                        <span>Attendance:</span>
                        <span>{log.eventDetails.intSpectators || "N/A"}</span>
                    </div>

                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">When &amp; where</span>
                  <div className="flex flex-row lg:flex-col gap-1">
                        <span>Date:</span>
                        {/* date time w hour to normal length */}
                        <span>{log.eventDetails.dateEvent || "N/A"} {log.eventDetails.strTime.slice(0,5) || ""}</span>
                    </div>
                    <div className="flex flex-row lg:flex-col gap-1">
                        <span>Venue:</span>
                        <span>{log.eventDetails.strVenue || "N/A"}</span>
                    </div>
                </div>
              </div>
            </div>
            </div>
        
          </CardContent>
        </SurfaceCard>

        {/* Log details driven by our own database */}
        <SurfaceCard>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Game log</CardTitle>
                <CardDescription>
                   Users personal notes and rating for this game
                </CardDescription>
              </div>
              {log.rating != null && (
                <div className="flex items-center gap-2">
                  <RatingStars value={ratingForStars} />
                  <Badge variant="secondary" className="text-xs">
                    {ratingForStars.toFixed(1)} / 5
                  </Badge>
                </div>
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
              {/* show other user data, watch setting, watch time, standout players */}
                <div className="text-sm text-muted-foreground">
                    {log.howDidYouWatch && (
                        <p><span className="font-medium">How did you watch:</span> {log.howDidYouWatch}</p>
                    )}
                    {log.viewingTime && (
                        <p><span className="font-medium">When did you watch:</span> {log.viewingTime}</p>
                    )}
                    {log.standoutPlayers && log.standoutPlayers.length > 0 && (
                        <p><span className="font-medium">Standout players:</span> {log.standoutPlayers.join(", ")}</p>
                    )}
                </div>
            </div>
            {/* show deserve to winometer in pie chart */}
            <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Deserve-to-winometer
                </p>
                <div className="flex items-center gap-4">
                    <div className="relative flex h-24 w-24 items-center justify-center">
                        <svg className="h-24 w-24">
                            <circle
                                className="text-muted-foreground/20"
                                strokeWidth="8"
                                stroke="currentColor"
                                fill="transparent"
                                r="36"
                                cx="48"
                                cy="48"
                            />
                            <circle
                                className="text-primary"
                                strokeWidth="8"
                                strokeDasharray={226.195} // 2 * Math.PI * 36
                                strokeDashoffset={226.195 - (log.deservedWin ?? 0) / 100 * 226.195}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="36"
                                cx="48"
                                cy="48"
                            />
                        </svg>
                        <span className="absolute text-lg font-semibold">
                            {log.deservedWin ?? 0}%
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                    {(log.eventDetails.intHomeScore != null && log.eventDetails.intAwayScore != null) ?   (log.eventDetails.intHomeScore > log.eventDetails.intAwayScore ? log.eventDetails.strHomeTeam : log.eventDetails.strAwayTeam) : "Winning  team"} deserved to win {log.deservedWin ?? 0}% of the time.
                    </p>
                </div>
            </div>

          </CardContent>
        </SurfaceCard>
      </div>
    </SplitPage>
  )
}

