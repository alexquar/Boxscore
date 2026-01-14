"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Ellipsis, Plus, Star, StarHalf } from "lucide-react"

import { useAuth } from "./AuthProvider"

export default function Home() {
  const { user } = useAuth()

  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background to-background/95">
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between lg:gap-12 lg:py-16">
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Sports commentary, reimagined
          </p>
          <div className="space-y-3">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to Boxscore
              <span className="block text-primary">your personal game diary.</span>
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              Log every game you watch, rate how it felt, and build a searchable
              history of your sports life. Inspired by Letterboxd, made for boxscores.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={user ? "/log" : "/signup"}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md shadow-primary/30 transition hover:bg-primary/90"
            >
              {user ? "Log a game" : "Join Boxscore"}
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-md border border-border/80 bg-background/70 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm hover:bg-background"
            >
              Browse logs &amp; lists
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1">
              <span className="flex items-center gap-0.5 text-yellow-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <StarHalf className="h-3.5 w-3.5 fill-current" />
              </span>
              <span>Track how every game felt</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1">
              <Plus className="h-3.5 w-3.5" />
              <span>Create lists of seasons, teams, or eras</span>
            </span>
          </div>
        </div>

        {/* Spotlight card mimicking an in-progress log */}
        <div className="mt-4 w-full max-w-md md:mt-0">
          <Card className="space-y-4 border-input/70 bg-card/95 p-5 shadow-lg shadow-black/25">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Game on now
                </p>
                <p className="text-sm font-medium">Leafs @ Canadiens</p>
              </div>
              <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                Live
              </Badge>
            </div>

            <div className="space-y-2 rounded-md bg-background/60 p-3 text-xs text-muted-foreground">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>TOR</span>
                <span className="text-xs font-semibold text-foreground">3</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>MTL</span>
                <span className="text-xs font-semibold text-foreground">2</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Capture the vibes while the game is unfolding, then polish your
                log once the final horn sounds.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">Your rating</span>
                <span className="flex items-center gap-0.5 text-yellow-400">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <StarHalf className="h-3.5 w-3.5 fill-current" />
                </span>
              </div>
              <Ellipsis className="h-4 w-4 text-muted-foreground" />
            </div>
          </Card>
        </div>
      </section>

      {/* Content sections */}
      <section className="border-t border-border/60 bg-background/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 lg:gap-12 lg:py-14">
          {/* Games on now */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight underline underline-offset-4">
              Games on now
            </h3>
            <p className="max-w-2xl text-sm text-muted-foreground">
              See what&apos;s live across your favourite leagues and quickly start a
              log from the games you&apos;re actually watching.
            </p>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col gap-2 border-input/70 bg-card/95 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold">Game Title 1</h4>
                  <Badge>Now playing</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Brief description of the matchup or why it&apos;s on your screen.
                </p>
                <div className="mt-auto flex items-center justify-between pt-2 text-xs">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <StarHalf className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Plus className="h-3.5 w-3.5" />
                    <Ellipsis className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Card>
              <Card className="flex flex-col gap-2 border-input/70 bg-card/95 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold">Game Title 2</h4>
                  <Badge>Now playing</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Brief description of the matchup or why it&apos;s on your screen.
                </p>
              </Card>
              <Card className="flex flex-col gap-2 border-input/70 bg-card/95 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold">Game Title 3</h4>
                  <Badge>Now playing</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Brief description of the matchup or why it&apos;s on your screen.
                </p>
              </Card>
            </div>
          </div>

          {/* Popular games */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight underline underline-offset-4">
              Popular games
            </h3>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Discover the games people can&apos;t stop logging and talking about.
            </p>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={index}
                  className="flex flex-col gap-2 border-input/70 bg-card/95 p-4"
                >
                  <h4 className="text-sm font-semibold">Popular Game {index + 1}</h4>
                  <p className="text-xs text-muted-foreground">
                    Brief description of why this game is showing up in everyone&apos;s
                    logs.
                  </p>
                  <Badge className="mt-1 w-fit" variant="outline">
                    Popular right now
                  </Badge>
                </Card>
              ))}
            </div>
          </div>

          {/* Latest news & reviews */}
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold tracking-tight underline underline-offset-4">
                Latest news
              </h3>
              <p className="max-w-xl text-sm text-muted-foreground">
                Contextual snippets you might want to remember alongside your
                logs&mdash;from trade rumours to playoff pushes.
              </p>
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="border-input/70 bg-card/95 p-4">
                  <h4 className="text-sm font-semibold">News Title 1</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Brief description of the news article.
                  </p>
                </Card>
                <Card className="border-input/70 bg-card/95 p-4">
                  <h4 className="text-sm font-semibold">News Title 2</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Brief description of the news article.
                  </p>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold tracking-tight underline underline-offset-4">
                Popular reviews
              </h3>
              <p className="max-w-xl text-sm text-muted-foreground">
                See how other fans felt about the same games you watched.
              </p>
              <Card className="border-input/70 bg-card/95 p-4">
                <h4 className="text-sm font-semibold">Review Title 1</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Brief excerpt of a fan&apos;s game log or review.
                </p>
              </Card>
            </div>
          </div>

          {/* Lists & members */}
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold tracking-tight underline underline-offset-4">
                Popular lists
              </h3>
              <p className="max-w-xl text-sm text-muted-foreground">
                Curated collections of games: dynasties, heartbreakers, rivalries,
                and more.
              </p>
              <Card className="border-input/70 bg-card/95 p-4">
                <h4 className="text-sm font-semibold">List Title 1</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Brief description of the list.
                </p>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold tracking-tight underline underline-offset-4">
                Top members
              </h3>
              <p className="max-w-xl text-sm text-muted-foreground">
                Fans who log often, write great notes, and surface memorable
                games.
              </p>
              <Card className="border-input/70 bg-card/95 p-4">
                <h4 className="text-sm font-semibold">Member Name 1</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Brief bio of the member.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

