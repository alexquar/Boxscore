import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SplitPage } from "@/components/split-page"

export default function GameLogPage() {
  return (
    <SplitPage
      title={
        <>
          Log a game
          <span className="block text-primary">capture every detail.</span>
        </>
      }
      description={
        <>
          Record scores, standout moments, and how the game felt. Build your
          personal history of sports, one boxscore at a time.
        </>
      }
      pills={[
        "Final score",
        "Standout players",
        "Vibes-only notes",
      ]}
    >
      <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
        <CardHeader>
          <CardTitle className="text-xl">New game log</CardTitle>
          <CardDescription>
            This form is for capturing how you experienced the game. Stats are
            optional, vibes are not.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  className="bg-background/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="league">League</Label>
                <select
                  id="league"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="NHL"
                >
                  <option value="NHL">NHL</option>
                  <option value="NBA">NBA</option>
                  <option value="NFL">NFL</option>
                  <option value="MLB">MLB</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="homeTeam">Home team</Label>
                <Input
                  id="homeTeam"
                  placeholder="Home team name"
                  className="bg-background/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="awayTeam">Away team</Label>
                <Input
                  id="awayTeam"
                  placeholder="Away team name"
                  className="bg-background/80"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue (optional)</Label>
                <Input
                  id="venue"
                  placeholder="Arena or stadium"
                  className="bg-background/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scoreHome">Final score</Label>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <Input
                    id="scoreHome"
                    type="number"
                    min={0}
                    className="bg-background/80"
                    placeholder="3"
                  />
                  <span className="text-xs text-muted-foreground">–</span>
                  <Input
                    id="scoreAway"
                    type="number"
                    min={0}
                    className="bg-background/80"
                    placeholder="2"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="space-y-2">
                <Label htmlFor="rating">Your rating</Label>
                <Input
                  id="rating"
                  type="number"
                  min={0}
                  max={10}
                  step={0.5}
                  className="bg-background/80"
                  placeholder="8.5"
                />
                <p className="text-xs text-muted-foreground">
                  Use any scale that feels right. We&apos;ll normalize it later.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="standouts">Standout players (optional)</Label>
                <Input
                  id="standouts"
                  placeholder="Who defined the game for you?"
                  className="bg-background/80"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Your notes</Label>
              <Textarea
                id="notes"
                placeholder="How did the game feel? Key moments, atmosphere, storylines..."
                className="bg-background/80"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full">
              Save log
            </Button>
          </form>
        </CardContent>
      </Card>
    </SplitPage>
  )
}

