import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SplitPage } from "@/components/split-page"
import { SurfaceCard } from "@/components/shared/surface-card"
import { FormField } from "@/components/shared/form-field"
import { RatingInput } from "@/components/shared/rating-stars"

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
      <SurfaceCard>
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
              <FormField id="date" label="Date">
                <Input
                  id="date"
                  type="date"
                  className="bg-background/80"
                />
              </FormField>
              <FormField id="league" label="League">
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
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField id="homeTeam" label="Home team">
                <Input
                  id="homeTeam"
                  placeholder="Home team name"
                  className="bg-background/80"
                />
              </FormField>
              <FormField id="awayTeam" label="Away team">
                <Input
                  id="awayTeam"
                  placeholder="Away team name"
                  className="bg-background/80"
                />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField id="venue" label="Venue (optional)">
                <Input
                  id="venue"
                  placeholder="Arena or stadium"
                  className="bg-background/80"
                />
              </FormField>
              <FormField id="scoreHome" label="Final score">
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
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <FormField
                id="rating"
                label="Your rating"
                hint="Tap a star to rate this game on a 5-star scale."
              >
                <RatingInput name="rating" />
              </FormField>
            </div>

            <FormField id="notes" label="Your notes">
              <Textarea
                id="notes"
                placeholder="How did the game feel? Key moments, atmosphere, storylines..."
                className="bg-background/80"
                rows={4}
              />
            </FormField>

            <Button type="submit" className="w-full">
              Save log
            </Button>
          </form>
        </CardContent>
      </SurfaceCard>
    </SplitPage>
  )
}

