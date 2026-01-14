import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4">
      <div className="relative mb-8 flex items-center gap-3 rounded-full border border-border/60 bg-secondary/60 px-4 py-1 text-xs font-medium text-muted-foreground shadow-sm">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Trophy className="h-3.5 w-3.5" />
        </span>
        <span>Boxscore</span>
        <span className="h-4 w-px bg-border/70" />
        <span>Out-of-bounds route</span>
      </div>

      <Card className="w-full max-w-2xl border-border/70 bg-background/80">
        <CardHeader className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            404 • Page Not Found
          </p>
          <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
            This play isn&apos;t on the board
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            The page you&apos;re looking for may have
            been moved, deleted, or never made the lineup.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">
                Back to dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/log">Log a new game</Link>
            </Button>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-muted-foreground/90 sm:grid-cols-4">
            <div className="rounded-md border border-border/70 bg-secondary/40 px-3 py-2">
              <p className="font-medium">Games</p>
              <p className="text-[0.7rem]">Track scores and results in real time or from past games</p>
            </div>
            <div className="rounded-md border border-border/70 bg-secondary/40 px-3 py-2">
              <p className="font-medium">Leagues</p>
              <p className="text-[0.7rem]">See what's happening in North America's big 4</p>
            </div>
            <div className="rounded-md border border-border/70 bg-secondary/40 px-3 py-2">
              <p className="font-medium">Lists</p>
              <p className="text-[0.7rem]">Sets of logs with interesting themes</p>
            </div>
            <div className="rounded-md border border-border/70 bg-secondary/40 px-3 py-2">
              <p className="font-medium">Journal</p>
              <p className="text-[0.7rem]">Keep your game notes alive privately or for all to see</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
