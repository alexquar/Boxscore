"use client"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SplitPage } from "@/components/split-page"
import { SurfaceCard } from "@/components/shared/surface-card"
import { FormField } from "@/components/shared/form-field"
import { RatingInput } from "@/components/shared/rating-stars"
import { useState } from "react"
import { useParams } from "next/navigation"
import { fetchEvent } from "@/util/fetchEvent"
import type { SportsEvent } from "@/types/eventTypes"
import { useAuth } from "../../../AuthProvider"
import { useRouter } from "next/navigation"
export default function GameLogPage() {
    const params: { id: string } = useParams();
    const { id: gameId } = params;
    const { user } = useAuth();
    const router = useRouter();
    const [rating, setRating] = useState<number>(0);
    const [comments, setComments] = useState<string>("");
    console.log("Game ID from params:", gameId);
    //fetch game details using gameId 
    const [gameDetails, setGameDetails] = useState<SportsEvent | null>(null);
    
    useState(() => {
        const getGameDetails = async () => {
            const data = await fetchEvent(gameId);
            console.log("Game details fetched:", data);
            setGameDetails(data);
        }
        getGameDetails();
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            console.error("User not authenticated");
            return;
        }
        try {
            const response = await fetch('/api/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    gameId: gameId,
                    comments: comments,
                    rating: rating,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to create log");
            }
            const data = await response.json();
            console.log("Log created successfully:", data);
            router.push(`/log/${data.id}`);
        }
        catch (error) {
            console.error("Error creating log:", error);
        }
    }
  return (
    <>
      {gameDetails ? (
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField id="date" label="Date">
                    <p className="flex h-10 w-full items-center rounded-md border border-input bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                      {new Date(gameDetails.dateEvent).toLocaleDateString()}
                    </p>
                  </FormField>
                  <FormField id="time" label="Time">
                    <p className="flex h-10 w-full items-center rounded-md border border-input bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                      {/* change to a timestamp */}
                      {gameDetails.strTime.slice(0,5)} UTC
                    </p>
                  </FormField>
                  <FormField id="league" label="League">
                    <p className="flex h-10 w-full items-center rounded-md border border-input bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                      {gameDetails.strLeague}
                    </p>
                  </FormField>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField id="homeTeam" label="Home team">
                    <p className="flex h-10 w-full items-center rounded-md border border-input bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                      {gameDetails.strHomeTeam}
                    </p>
                  </FormField>
                  <FormField id="awayTeam" label="Away team">
                    <p className="flex h-10 w-full items-center rounded-md border border-input bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                      {gameDetails.strAwayTeam}
                    </p>
                  </FormField>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField id="venue" label="Venue (optional)">
                    <p className="flex h-10 w-full items-center rounded-md border border-input bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                      {gameDetails.strVenue || "N/A"}
                    </p>
                  </FormField>
                  <FormField id="scoreHome" label="Final score">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <p className="flex h-10 w-full items-center rounded-md border border-input bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                        {gameDetails.intHomeScore}
                      </p>
                      
                      <span className="text-xs text-muted-foreground">–</span>
                      <p className="flex h-10 w-full items-center rounded-md border border-input bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                        {gameDetails.intAwayScore}
                      </p>
                    </div>
                  </FormField>
                </div>
                {/* divider so users know this is where the actual form fields start */}
                <hr className="my-4 border-t border-muted-foreground/20" />

                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <FormField
                    id="rating"
                    label="Your rating"
                    hint="Tap a star to rate this game on a 5-star scale."
                  >
                    <RatingInput 
                    name="rating"
                    value={rating}
                    onChange={setRating}
                    />
                  </FormField>
                </div>

                <FormField id="notes" label="Your notes">
                  <Textarea
                    id="notes"
                    placeholder="How did the game feel? Key moments, atmosphere, storylines..."
                    className="bg-background/80"
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </FormField>

                <Button type="submit" className="w-full">
                  Save log
                </Button>
              </form>
            </CardContent>
          </SurfaceCard>
        </SplitPage>
      ) : (
        <div>Loading game details...</div>
      )}
    </>
  );
}

