"use client"

import { useState } from "react"

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SurfaceCard } from "@/components/shared/surface-card"

export default function SearchPage() {
  const [query, setQuery] = useState("")

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-background to-background/80 px-4 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {/* Header and primary search bar */}
        <section className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Search games
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground md:text-base">
              Find games, series, seasons, and logs. This page is designed to
              support rich, Letterboxd-style filtering, so there&apos;s plenty of
              room for the controls we&apos;ll add next.
            </p>
          </div>

          <SurfaceCard>
            <CardContent className="flex flex-col gap-3 py-4 md:flex-row md:items-center">
              <Input
                type="search"
                placeholder="Search by team, league, season, player, venue..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-background/80"
              />
              <div className="flex gap-2 md:w-auto">
                <Button className="w-full md:w-auto">Search</Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full md:w-auto"
                  onClick={() => setQuery("")}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </SurfaceCard>
        </section>

        {/* Main search layout: large filter column + results column */}
        <section className="grid flex-1 gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2.2fr)]">
          {/* Filters sidebar — intentionally tall with lots of sections */}
          <SurfaceCard>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Filters
              </CardTitle>
              <CardDescription>
                A dedicated column for rich filtering, inspired by Letterboxd&apos;s
                browse tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm">
              <div className="space-y-2">
                <p className="font-medium">Sport &amp; league</p>
                <p className="text-xs text-muted-foreground">
                  Narrow by sport and competition (e.g. NHL, NBA, Champions League).
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Sport
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    League
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Season &amp; date</p>
                <p className="text-xs text-muted-foreground">
                  Filter by season, year, or specific date ranges.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Season
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Year
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Date range
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Teams &amp; players</p>
                <p className="text-xs text-muted-foreground">
                  Limit results to specific teams, rivalries, or star players.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Home / away team
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Players
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Result type</p>
                <p className="text-xs text-muted-foreground">
                  Decide whether you&apos;re browsing full games, series, playoffs,
                  or user logs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Games
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Logs
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Series / playoffs
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Atmosphere &amp; rating</p>
                <p className="text-xs text-muted-foreground">
                  Filter by your own ratings or vibe tags once they exist.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Rating range
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Tags
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                This column is intentionally spacious so we can keep adding
                filters (venues, broadcasters, overtime, playoffs, etc.) without
                crowding the UI.
              </p>
            </CardContent>
          </SurfaceCard>

          {/* Results column */}
          <div className="space-y-4">
            <SurfaceCard>
              <CardHeader>
                <CardTitle className="text-base">Results</CardTitle>
                <CardDescription>
                  Once wired up, this will show matching games and logs,
                  ordered by relevance and date.
                </CardDescription>
              </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Start by searching for a team, league, or season. You&apos;ll be
                    able to stack filters from the left to dial in exactly the
                    kind of games you&apos;re looking for.
                  </p>
                  <p>
                    We&apos;ll model this after Letterboxd&apos;s browse: rows of
                    results with rich context (score, teams, competition,
                    your rating, and whether you&apos;ve logged the game).
                  </p>
                </div>

                {/* Skeleton rows */}
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-14 rounded-md bg-muted/60" 
                    />
                  ))}
                </div>
                </CardContent>
              </SurfaceCard>
          </div>
        </section>
      </div>
    </main>
  )
}
