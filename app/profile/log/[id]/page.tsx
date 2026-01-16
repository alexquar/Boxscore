"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { SplitPage } from "@/components/split-page"
import { SurfaceCard } from "@/components/shared/surface-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RatingInput, RatingStars } from "@/components/shared/rating-stars"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { FormField } from "@/components/shared/form-field"
import { useAuth } from "@/app/AuthProvider"
import type { SportsEvent } from "@/types/eventTypes"

type UserLogWithEvent = {
  id: string
  comments: string | null
  rating: number | null
  createdAt: string
  userId: string
  gameId: string
  howDidYouWatch: string | null
  viewingTime: string | null
  deservedWin: number | null
  standoutPlayers: string[] | null
  user: {
    id: string
    displayName: string | null
  }
  eventDetails: SportsEvent | null
}

type EditState = {
  comments: string
  rating: number
  howDidYouWatch: string
  viewingTime: string
  deservedWin: number
  standoutPlayers: string[]
}

function normalizeRatingToFive(raw: UserLogWithEvent["rating"]): number {
  if (raw == null) return 0
  const numeric = typeof raw === "string" ? parseFloat(raw) : raw
  if (!Number.isFinite(numeric)) return 0

  const maybeTenScale = numeric > 5 ? numeric / 2 : numeric
  return Math.min(5, Math.max(0, maybeTenScale))
}

export default function ProfileLogsPage() {
  const params = useParams<{ id: string }>()
  const routeUserId = params.id
  const { user, loading: authLoading } = useAuth()

  const [logs, setLogs] = useState<UserLogWithEvent[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editState, setEditState] = useState<EditState | null>(null)
  const [saving, setSaving] = useState(false)
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  const isOwnProfile = useMemo(
    () => !!user && user.id === routeUserId,
    [user, routeUserId],
  )

  const handleDeleteLog = async (logId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this log? This action cannot be undone.",
    )
    if (!confirm) return

    try {
      const res = await fetch(`/api/logs/${logId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Failed to delete log")
      }

      setLogs((prev) => (prev ? prev.filter((log) => log.id !== logId) : prev))
      if (editingId === logId) {
        setEditingId(null)
        setEditState(null)
      }
      setExpandedIds((prev) => prev.filter((id) => id !== logId))
    } catch (err) {
      console.error("Error deleting log", err)
      alert("There was a problem deleting the log. Please try again.")
    }
  }

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/logs/user/${routeUserId}`)
        if (!res.ok) {
          throw new Error("Failed to load logs")
        }
        const data: UserLogWithEvent[] = await res.json()
        setLogs(data)
      } catch (err) {
        console.error("Error loading user logs", err)
        setError("Unable to load logs at the moment.")
      } finally {
        setLoading(false)
      }
    }

    if (routeUserId) {
      fetchLogs()
    }
  }, [routeUserId])

  const startEditing = (log: UserLogWithEvent) => {
    if (!isOwnProfile) return
    setExpandedIds((prev) =>
      prev.includes(log.id) ? prev : [...prev, log.id],
    )
    setEditingId(log.id)
    setEditState({
      comments: log.comments ?? "",
      rating: typeof log.rating === "number" ? log.rating : 0,
      howDidYouWatch: log.howDidYouWatch ?? "",
      viewingTime: log.viewingTime ?? "",
      deservedWin: typeof log.deservedWin === "number" ? log.deservedWin : 0,
      standoutPlayers:
        log.standoutPlayers && log.standoutPlayers.length > 0
          ? [...log.standoutPlayers]
          : [""],
    })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditState(null)
  }

   const toggleExpanded = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((logId) => logId !== id) : [...prev, id],
    )
  }

  const handleSave = async () => {
    if (!editingId || !editState) return
    try {
      setSaving(true)
      const res = await fetch(`/api/logs/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments: editState.comments,
          rating: editState.rating,
          howDidYouWatch: editState.howDidYouWatch,
          viewingTime: editState.viewingTime,
          deservedWin: editState.deservedWin,
          standoutPlayers: editState.standoutPlayers.filter((p) => p.trim() !== ""),
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to save log")
      }

      const updated = await res.json()
      setLogs((prev) =>
        prev
          ? prev.map((log) =>
              log.id === updated.id
                ? {
                    ...log,
                    comments: updated.comments,
                    rating: updated.rating,
                    howDidYouWatch: updated.howDidYouWatch,
                    viewingTime: updated.viewingTime,
                    deservedWin: updated.deservedWin,
                    standoutPlayers: updated.standoutPlayers,
                  }
                : log,
            )
          : prev,
      )
      setEditingId(null)
      setEditState(null)
    } catch (err) {
      console.error("Error saving log", err)
      alert("There was a problem saving your changes. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const titleName =
    logs && logs.length > 0 ? logs[0].user.displayName ?? "User" : "User"

  const title = isOwnProfile ? "Your game logs" : `${titleName}'s game logs`

  const description = isOwnProfile
    ? "Review, update, and revisit every game you've logged."
    : "Browse this member's game logs and see how they experienced each matchup."

  const pills = isOwnProfile
    ? ["Your history", "Edit logs", "Match details"]
    : ["Match history", "Ratings", "Notes"]

  return (
    <SplitPage title={title} description={description} pills={pills}>
      {loading || authLoading ? (
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-xl">Loading logs</CardTitle>
            <CardDescription>Fetching this user&apos;s game history.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 animate-pulse">
              <div className="h-10 rounded-md bg-muted/60" />
              <div className="h-10 rounded-md bg-muted/60" />
              <div className="h-24 rounded-md bg-muted/60" />
            </div>
          </CardContent>
        </SurfaceCard>
      ) : error ? (
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-xl">Logs unavailable</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            {isOwnProfile && (
              <p className="text-sm text-muted-foreground">
                Try refreshing the page, or create a new log from a game page.
              </p>
            )}
          </CardContent>
        </SurfaceCard>
      ) : !logs || logs.length === 0 ? (
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-xl">
              {isOwnProfile ? "No logs yet" : "No logs to show"}
            </CardTitle>
            <CardDescription>
              {isOwnProfile
                ? "Once you log a game, it will appear here."
                : "This user hasn&apos;t logged any games yet."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isOwnProfile && (
              <p className="text-sm text-muted-foreground">
                Start from the home page, search for a game, and create your first log.
              </p>
            )}
          </CardContent>
        </SurfaceCard>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => {
            const createdAt = log.createdAt ? new Date(log.createdAt) : null
            const isEditing = editingId === log.id && editState
            const ratingForStars = normalizeRatingToFive(
              isEditing && editState ? editState.rating : log.rating,
            )
            const event = log.eventDetails
            const isExpanded = expandedIds.includes(log.id)

            return (
              <SurfaceCard key={log.id}>
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {event?.strFilename ??
                        `${event?.strHomeTeam ?? "Home"} vs ${event?.strAwayTeam ?? "Away"}`}
                    </CardTitle>
                    <CardDescription>
                      {createdAt && (
                        <>
                          Logged on {createdAt.toLocaleDateString()} at{" "}
                          {createdAt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {event?.strLeague && (
                      <Badge variant="outline" className="text-xs">
                        {event.strLeague}
                      </Badge>
                    )}
                    {ratingForStars > 0 && (
                      <div className="flex items-center gap-2">
                        <RatingStars value={ratingForStars} />
                        <Badge variant="secondary" className="text-xs">
                          {ratingForStars.toFixed(1)} / 5
                        </Badge>
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpanded(log.id)}
                    >
                      {isExpanded ? "Hide details" : "Show details"}
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/log/${log.id}`}>View full log</Link>
                    </Button>
                    {isOwnProfile && !isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(log)}
                      >
                        Edit log
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isExpanded && (
                    <>
                      {event && (
                        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                          <div className="space-y-3 rounded-lg border border-dashed border-border/60 bg-background/40 p-4">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>Matchup</span>
                              {log.gameId && (
                                <span className="text-xs">Game ID: {log.gameId}</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-xl font-semibold">
                              <span className="opacity-60 ">{event.strHomeTeam}</span>
                              <span className="opacity-60 ">{event.strAwayTeam}</span>
                            </div>
                            <div className="flex items-center justify-between text-xl font-semibold">
                              <span className="opacity-60 mx-auto">{event.intHomeScore}</span>
                              <span className="opacity-60 mx-auto">{event.intAwayScore}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {event.strDescriptionEN || "Game description not available."}
                            </p>
                          </div>

                          <div className="space-y-3 rounded-lg border border-dashed border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                            <div className="flex flex-col gap-1">
                              <span className="font-medium text-foreground">Game meta</span>
                              <div className="flex flex-row lg:flex-col gap-1">
                                <span>League:</span>
                                <span>{event.strLeague || "N/A"}</span>
                              </div>
                              <div className="flex flex-row lg:flex-col gap-1">
                                <span>Attendance:</span>
                                <span>{event.intSpectators || "N/A"}</span>
                              </div>

                              <div className="flex flex-col gap-1 mt-2">
                                <span className="font-medium text-foreground">When &amp; where</span>
                                <div className="flex flex-row lg:flex-col gap-1">
                                  <span>Date:</span>
                                  <span>
                                    {event.dateEvent || "N/A"}{" "}
                                    {event.strTime?.slice(0, 5) || ""}
                                  </span>
                                </div>
                                <div className="flex flex-row lg:flex-col gap-1">
                                  <span>Venue:</span>
                                  <span>{event.strVenue || "N/A"}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <hr className="my-4 border-t border-muted-foreground/20" />

                      {isEditing && editState ? (
                        <>
                          <FormField id={`comments-${log.id}`} label="Your notes">
                            <Textarea
                              id={`comments-${log.id}`}
                              className="bg-background/80"
                              rows={3}
                              value={editState.comments}
                              onChange={(e) =>
                                setEditState((prev) =>
                                  prev ? { ...prev, comments: e.target.value } : prev,
                                )
                              }
                            />
                          </FormField>
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              id={`rating-${log.id}`}
                              label="Your rating"
                              hint="Tap a star to rate this game on a 5-star scale."
                            >
                              <RatingInput
                                name={`rating-${log.id}`}
                                value={editState.rating}
                                onChange={(value) =>
                                  setEditState((prev) =>
                                    prev ? { ...prev, rating: value } : prev,
                                  )
                                }
                              />
                            </FormField>
                            <FormField
                              id={`deservedWin-${log.id}`}
                              label="Deserve-to-winometer"
                              hint="Estimate how much the winner deserved it."
                            >
                              <Slider
                                id={`deservedWin-${log.id}`}
                                min={0}
                                max={100}
                                step={1}
                                value={[editState.deservedWin]}
                                onValueChange={(value) =>
                                  setEditState((prev) =>
                                    prev ? { ...prev, deservedWin: value[0] } : prev,
                                  )
                                }
                              />
                              <p className="mt-2 text-sm text-muted-foreground">
                                {editState.deservedWin}% of the time
                              </p>
                            </FormField>
                          </div>

                          <FormField
                            id={`how-${log.id}`}
                            label="How did you watch?"
                            hint="In person, on TV, or online?"
                          >
                            <Input
                              id={`how-${log.id}`}
                              className="bg-background/80"
                              value={editState.howDidYouWatch}
                              onChange={(e) =>
                                setEditState((prev) =>
                                  prev
                                    ? { ...prev, howDidYouWatch: e.target.value }
                                    : prev,
                                )
                              }
                            />
                          </FormField>

                          <FormField
                            id={`when-${log.id}`}
                            label="When did you watch?"
                            hint="Live, rewatch, condensed, etc."
                          >
                            <Input
                              id={`when-${log.id}`}
                              className="bg-background/80"
                              value={editState.viewingTime}
                              onChange={(e) =>
                                setEditState((prev) =>
                                  prev
                                    ? { ...prev, viewingTime: e.target.value }
                                    : prev,
                                )
                              }
                            />
                          </FormField>

                          <FormField
                            id={`players-${log.id}`}
                            label="Standout players"
                            hint="Add or adjust the names that stood out."
                          >
                            <div className="space-y-2">
                              {editState.standoutPlayers.map((player, index) => (
                                <div
                                  key={`${log.id}-player-${index}`}
                                  className="flex gap-2"
                                >
                                  <Input
                                    id={`${log.id}-player-${index}`}
                                    className="bg-background/80"
                                    placeholder={`Player ${index + 1}`}
                                    value={player}
                                    onChange={(e) => {
                                      const next = [...editState.standoutPlayers]
                                      next[index] = e.target.value
                                      setEditState((prev) =>
                                        prev
                                          ? { ...prev, standoutPlayers: next }
                                          : prev,
                                      )
                                    }}
                                  />
                                  {editState.standoutPlayers.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      onClick={() => {
                                        const next = editState.standoutPlayers.filter(
                                          (_p, i) => i !== index,
                                        )
                                        setEditState((prev) =>
                                          prev
                                            ? { ...prev, standoutPlayers: next }
                                            : prev,
                                        )
                                      }}
                                    >
                                      ✕
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setEditState((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          standoutPlayers: [
                                            ...prev.standoutPlayers,
                                            "",
                                          ],
                                        }
                                      : prev,
                                  )
                                }
                              >
                                Add another player
                              </Button>
                            </div>
                          </FormField>

                          <div className="flex flex-wrap gap-2 justify-end">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={cancelEditing}
                              disabled={saving}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              onClick={handleSave}
                              disabled={saving}
                            >
                              {saving ? "Saving..." : "Save changes"}
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 justify-end">
                            {/* button to delete the log */}
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => handleDeleteLog(log.id)}
                              disabled={saving}
                            >
                              Delete log
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-3">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Notes
                            </p>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">
                              {log.comments
                                ? log.comments
                                : isOwnProfile
                                  ? "You didn&apos;t add any notes for this game."
                                  : "No notes were added for this game."}
                            </p>
                          </div>

                          <div className="grid gap-4 md:grid-cols-3 text-sm text-muted-foreground">
                            {log.howDidYouWatch && (
                              <div>
                                <p className="font-medium text-foreground">How you watched</p>
                                <p>{log.howDidYouWatch}</p>
                              </div>
                            )}
                            {log.viewingTime && (
                              <div>
                                <p className="font-medium text-foreground">When you watched</p>
                                <p>{log.viewingTime}</p>
                              </div>
                            )}
                            {log.standoutPlayers && log.standoutPlayers.length > 0 && (
                              <div>
                                <p className="font-medium text-foreground">Standout players</p>
                                <p>{log.standoutPlayers.join(", ")}</p>
                              </div>
                            )}
                          </div>

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
                                    strokeDasharray={226.195}
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
                                {(event?.intHomeScore != null && event?.intAwayScore != null)
                                  ? (Number(event.intHomeScore) > Number(event.intAwayScore)
                                      ? event.strHomeTeam
                                      : event.strAwayTeam)
                                  : "Winning team"}{" "}
                                deserved to win {log.deservedWin ?? 0}% of the time.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </SurfaceCard>
            )
          })}
        </div>
      )}
    </SplitPage>
  )
}
