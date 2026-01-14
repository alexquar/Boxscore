import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export default function Loading() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4">
      <div className="relative mb-8 flex items-center gap-3 rounded-full border border-border/60 bg-secondary/60 px-4 py-1 text-xs font-medium text-muted-foreground shadow-sm">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Trophy className="h-3.5 w-3.5" />
        </span>
        <span>Boxscore</span>
        <span className="h-4 w-px bg-border/70" />
        <span>Warming up the scoreboard</span>
      </div>

      <Card className="w-full max-w-2xl border-border/70 bg-background/80">
        <CardHeader className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Loading
          </p>
          <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Setting the lineup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            Hang tight while we pull the latest scores, logs, and league data for your
            boxscore.
          </p>

          <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-muted-foreground/90 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-md border border-border/70 bg-secondary/40 px-3 py-2 text-left"
              >
                <div className="mb-1 h-3 w-16 rounded bg-muted" />
                <div className="h-2 w-24 rounded bg-muted/80" />
              </div>
            ))}
          </div>

          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-muted-foreground/30 border-t-primary/80">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
