"use client"

import Link from "next/link"

import { SplitPage } from "@/components/split-page"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/app/AuthProvider"
import { SurfaceCard } from "@/components/shared/surface-card"
import { FormField } from "@/components/shared/form-field"

export default function ProfilePage() {
  const { user, loading } = useAuth()

  const content = (() => {
    if (loading) {
      return (
        <SurfaceCard>
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
        </SurfaceCard>
      )
    }

    if (!user) {
      return (
        <SurfaceCard>
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
        </SurfaceCard>
      )
    }

    const displayName =
      (user.user_metadata && (user.user_metadata as any).displayName) || "Add your display name"

    return (
      <div className="space-y-6">
        {/* Core profile info */}
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-xl">Profile</CardTitle>
            <CardDescription>
              This is how your profile appears across Boxscore.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                id="displayName"
                label="Display name"
                hint="Pulling from your Boxscore account. Editing coming soon."
              >
                <Input
                  id="displayName"
                  value={displayName}
                  disabled
                  className="bg-background/80"
                />
              </FormField>

              <FormField id="email" label="Email">
                <Input
                  id="email"
                  type="email"
                  value={user.email ?? ""}
                  disabled
                  className="bg-background/80"
                />
              </FormField>
            </div>

            <FormField
              id="bio"
              label="Bio"
              hint="Public profile fields will be editable in a future iteration."
            >
              <textarea
                id="bio"
                className="flex min-h-20 w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add a short bio, favourite teams, or how you watch games."
                disabled
              />
            </FormField>
          </CardContent>
        </SurfaceCard>

        {/* Activity snapshot, Letterboxd-style */}
        <SurfaceCard>
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
        </SurfaceCard>
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

