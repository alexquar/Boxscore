"use client"

import Link from "next/link"

import { SplitPage } from "@/components/split-page"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/app/AuthProvider"

export default function ProfilePage() {
  const { user, loading } = useAuth()

  const content = (() => {
    if (loading) {
      return (
        <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
          <CardHeader>
            <CardTitle className="text-xl">Loading your profile</CardTitle>
            <CardDescription>
              Fetching your account details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 animate-pulse">
              <div className="h-10 rounded-md bg-muted/60" />
              <div className="h-10 rounded-md bg-muted/60" />
              <div className="h-24 rounded-md bg-muted/60" />
            </div>
          </CardContent>
        </Card>
      )
    }

    if (!user) {
      return (
        <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
          <CardHeader>
            <CardTitle className="text-xl">You&apos;re not signed in</CardTitle>
            <CardDescription>
              Log in to view and edit your Boxscore profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    const displayName =
      (user.user_metadata && (user.user_metadata as any).displayName) || "Add your display name"

    return (
      <div className="space-y-6">
        {/* Core profile info */}
        <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
          <CardHeader>
            <CardTitle className="text-xl">Profile</CardTitle>
            <CardDescription>
              This is how your profile appears across Boxscore.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  disabled
                  className="bg-background/80"
                />
                <p className="text-xs text-muted-foreground">
                  Pulling from your Boxscore account. Editing coming soon.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email ?? ""}
                  disabled
                  className="bg-background/80"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add a short bio, favourite teams, or how you watch games."
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Public profile fields will be editable in a future iteration.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Activity snapshot, Letterboxd-style */}
        <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
          <CardHeader>
            <CardTitle className="text-xl">Activity snapshot</CardTitle>
            <CardDescription>
              A quick overview of how you use Boxscore.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Logs
                </p>
                <p className="text-2xl font-semibold">—</p>
                <p className="text-xs text-muted-foreground">
                  Total games you&apos;ve logged.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Lists
                </p>
                <p className="text-2xl font-semibold">—</p>
                <p className="text-xs text-muted-foreground">
                  Curated lists of games, series, and seasons.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Member since
                </p>
                <p className="text-2xl font-semibold">—</p>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll show your join date here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  })()

  return (
    <SplitPage
      title={
        <>
          Your profile
          <span className="block text-primary">how the community sees you.</span>
        </>
      }
      description={
        <>
          Adjust the basics of your Boxscore identity. More detailed profile
          customization, stats, and social features will appear here over time.
        </>
      }
      pills={["Display details", "Public bio", "Activity snapshot"]}
    >
      {content}
    </SplitPage>
  )
}


