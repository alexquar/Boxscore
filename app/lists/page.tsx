"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { SurfaceCard } from "@/components/shared/surface-card"
import { FormField } from "@/components/shared/form-field"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/app/AuthProvider"
import { ExternalLink } from "lucide-react"

type EventSummary = {
  strFilename?: string | null
  strHomeTeam?: string | null
  strAwayTeam?: string | null
  dateEvent?: string | null
  strTime?: string | null
   strVenue?: string | null
   strDescriptionEN?: string | null
}

type UserLogWithEvent = {
  id: string
  comments: string | null
  rating: number | null
  createdAt: string
  gameId: string
  eventDetails: EventSummary | null
}

export default function ListsCreatePage() {
  const { user, loading: authLoading } = useAuth()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [logs, setLogs] = useState<UserLogWithEvent[] | null>(null)
  const [logsLoading, setLogsLoading] = useState(false)
  const [logsError, setLogsError] = useState<string | null>(null)
  const [selectedLogIds, setSelectedLogIds] = useState<string[]>([])

  const [searchTerm, setSearchTerm] = useState("")
  const [showOnlySelected, setShowOnlySelected] = useState(false)
  const [teamFilter, setTeamFilter] = useState("")
  const [venueFilter, setVenueFilter] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const loadLogs = async () => {
      try {
        setLogsLoading(true)
        setLogsError(null)
        const res = await fetch(`/api/logs/user/${user.id}`)
        if (!res.ok) {
          throw new Error("Failed to load your logs")
        }
        const data: UserLogWithEvent[] = await res.json()
        setLogs(data)
      } catch (err) {
        console.error("Error loading user logs for lists page", err)
        setLogsError("Unable to load your logs. Try refreshing the page.")
      } finally {
        setLogsLoading(false)
      }
    }

    loadLogs()
  }, [user])

  const hasLogs = useMemo(() => !!logs && logs.length > 0, [logs])

  const filteredLogs = useMemo(() => {
    if (!logs) return []
    const query = searchTerm.trim().toLowerCase()
    const team = teamFilter.trim().toLowerCase()
    const venue = venueFilter.trim().toLowerCase()

    return logs.filter((log) => {
      if (showOnlySelected && !selectedLogIds.includes(log.id)) return false

      const event = log.eventDetails
      // Free-text search across description and core game fields
      if (query) {
        const haystack = [
          event?.strFilename,
          event?.strHomeTeam,
          event?.strAwayTeam,
          event?.strVenue,
          event?.strDescriptionEN,
          log.comments,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()

        if (!haystack.includes(query)) return false
      }

      // Team filter (home or away contains team string)
      if (team) {
        const home = event?.strHomeTeam?.toLowerCase() || ""
        const away = event?.strAwayTeam?.toLowerCase() || ""
        if (!home.includes(team) && !away.includes(team)) return false
      }

      // Venue filter
      if (venue) {
        const v = event?.strVenue?.toLowerCase() || ""
        if (!v.includes(venue)) return false
      }

      // Date range filter based on event date
      if ((fromDate || toDate) && event?.dateEvent) {
        const eventDate = new Date(event.dateEvent)
        if (Number.isNaN(eventDate.getTime())) return false

        if (fromDate) {
          const from = new Date(fromDate)
          if (eventDate < from) return false
        }
        if (toDate) {
          const to = new Date(toDate)
          if (eventDate > to) return false
        }
      } else if (fromDate || toDate) {
        // If a date filter is applied but this event has no date, hide it
        return false
      }

      return true
    })
  }, [
    logs,
    searchTerm,
    showOnlySelected,
    selectedLogIds,
    teamFilter,
    venueFilter,
    fromDate,
    toDate,
  ])

  const toggleLogSelection = (logId: string) => {
    setSelectedLogIds((prev) =>
      prev.includes(logId)
        ? prev.filter((id) => id !== logId)
        : [...prev, logId],
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    setSubmitError(null)
    setSubmitSuccess(null)

    const trimmedName = name.trim()
    const trimmedDescription = description.trim()

    if (!trimmedName) {
      setSubmitError("List name is required.")
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch("/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          name: trimmedName,
          description: trimmedDescription || null,
          logIds: selectedLogIds,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Failed to create list")
      }

      setSubmitSuccess("List created successfully.")
      setName("")
      setDescription("")
      setSelectedLogIds([])
    } catch (err: any) {
      console.error("Error creating list", err)
      setSubmitError(err.message || "There was a problem creating the list.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-linear-to-b from-background to-background/80 px-4 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {/* Header */}
        <section className="space-y-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Build a list from your logs
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground md:text-base">
              Curate themed collections of games you&apos;ve logged—seasons, rivalries,
              arenas, or any storyline you want to track.
            </p>
          </div>
        </section>

        {/* Main layout: controls on the left, logs on the right */}
        <section className="grid flex-1 gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2.1fr)]">
          <div className="space-y-4">
            {/* List details card */}
            <SurfaceCard>
              <CardHeader>
                <CardTitle className="text-base font-semibold">List details</CardTitle>
                <CardDescription>
                  Name your list and explain the theme. Then pick logs on the
                  right to include.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!user && !authLoading ? (
                  <p className="text-sm text-muted-foreground">
                    You need to be signed in to create lists.
                  </p>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <FormField
                      id="list-name"
                      label="List name"
                      hint="E.g., 2024 playoff run, Classic comebacks, Games at MSG"
                    >
                      <Input
                        id="list-name"
                        className="bg-background/80"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={submitting}
                      />
                    </FormField>

                    <FormField
                      id="list-description"
                      label="Description (optional)"
                      hint="Describe what ties these games together. This helps future you remember why this list exists."
                    >
                      <Textarea
                        id="list-description"
                        className="bg-background/80"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={submitting}
                      />
                    </FormField>

                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        You can always edit the list later to add or remove logs.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Lists currently only support logs that you&apos;ve created
                        yourself.
                      </p>
                    </div>

                    {submitError && (
                      <p className="text-sm text-destructive">{submitError}</p>
                    )}
                    {submitSuccess && (
                      <p className="text-sm text-emerald-500">{submitSuccess}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitting || !user}
                    >
                      {submitting ? "Creating list..." : "Create list"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </SurfaceCard>

            {/* Filters card inspired by the search page layout */}
            <SurfaceCard>
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Filters
                </CardTitle>
                <CardDescription>
                  Narrow down your own logs by matchup details before you pick
                  which ones to include.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 text-sm">
                <div className="space-y-2">
                  <p className="font-medium">Search description &amp; matchup</p>
                  <p className="text-xs text-muted-foreground">
                    Search across your notes plus basic game info.
                  </p>
                  <Input
                    type="search"
                    placeholder="Search by notes, filename, teams, or venue..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-background/80"
                  />
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Teams</p>
                  <p className="text-xs text-muted-foreground">
                    Filter by home or away team name.
                  </p>
                  <Input
                    placeholder="E.g., Rangers, Lakers, Leafs..."
                    value={teamFilter}
                    onChange={(e) => setTeamFilter(e.target.value)}
                    className="bg-background/80"
                  />
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Venue</p>
                  <p className="text-xs text-muted-foreground">
                    Filter by arena or stadium name.
                  </p>
                  <Input
                    placeholder="E.g., Madison Square Garden"
                    value={venueFilter}
                    onChange={(e) => setVenueFilter(e.target.value)}
                    className="bg-background/80"
                  />
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Game date</p>
                  <p className="text-xs text-muted-foreground">
                    Use a simple date range filter on the actual game date.
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">From</p>
                      <Input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="bg-background/80"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">To</p>
                      <Input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="bg-background/80"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>
                    {hasLogs
                      ? `Showing ${filteredLogs.length} of ${logs?.length ?? 0} logs`
                      : "No logs to filter yet"}
                  </span>
                  <Button
                    type="button"
                    variant={showOnlySelected ? "default" : "outline"}
                    size="sm"
                    className="h-7 px-2 text-[11px]"
                    onClick={() => setShowOnlySelected((prev) => !prev)}
                  >
                    {showOnlySelected ? "Showing only selected" : "Show only selected"}
                  </Button>
                </div>
              </CardContent>
            </SurfaceCard>
          </div>

          {/* Right column: log picker / results */}
          <div className="space-y-4">
            <SurfaceCard>
              <CardHeader>
                <CardTitle className="text-base">Your logs</CardTitle>
                <CardDescription>
                  Browse your existing logs, open any in a new tab, and tap a row
                  to include or remove it from this list.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {logsLoading || authLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-14 rounded-md bg-muted/60 animate-pulse"
                      />
                    ))}
                  </div>
                ) : logsError ? (
                  <p className="text-sm text-destructive">{logsError}</p>
                ) : !logs || logs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    You don&apos;t have any logs yet. Create a log from a game page to
                    start building lists.
                  </p>
                ) : filteredLogs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No logs match your current filters.
                  </p>
                ) : (
                  <div className="max-h-[460px] space-y-2 overflow-y-auto rounded-md border border-border/60 bg-background/40 p-3">
                    {filteredLogs.map((log) => {
                      const createdAt = log.createdAt
                        ? new Date(log.createdAt)
                        : null
                      const event = log.eventDetails
                      const isSelected = selectedLogIds.includes(log.id)

                      return (
                        <button
                          key={log.id}
                          type="button"
                          onClick={() => toggleLogSelection(log.id)}
                          className={`w-full rounded-md border px-3 py-3 text-left text-sm transition hover:border-primary/60 hover:bg-primary/5 ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/60"
                          }`}
                        >
                          <div className="flex w-full items-start justify-between gap-3">
                            <div className="min-w-0 flex-1 space-y-1">
                              <p className="truncate font-medium">
                                {event?.strFilename ||
                                  `${event?.strHomeTeam ?? "Home"} vs ${event?.strAwayTeam ?? "Away"}`}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                {createdAt && (
                                  <span>
                                    Logged {createdAt.toLocaleDateString()} · {" "}
                                    {createdAt.toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                )}
                                {event?.dateEvent && (
                                  <span className="inline-flex items-center gap-1">
                                    <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                                    Game {event.dateEvent}{" "}
                                    {event.strTime?.slice(0, 5) ?? ""}
                                  </span>
                                )}
                                {event?.strVenue && (
                                  <span className="inline-flex items-center gap-1">
                                    <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                                    {event.strVenue}
                                  </span>
                                )}
                              </div>
                              {log.comments && (
                                <p className="line-clamp-2 text-xs text-muted-foreground">
                                  {log.comments}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {isSelected && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] uppercase tracking-wide"
                                >
                                  In list
                                </Badge>
                              )}
                              <Link
                                href={`/log/${log.id}`}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/60 px-2 py-1 text-[11px] text-muted-foreground hover:border-primary/60 hover:text-primary"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span>Open</span>
                              </Link>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </SurfaceCard>
          </div>
        </section>
      </div>
    </main>
  )
}
