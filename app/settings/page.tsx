"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { SplitPage } from "@/components/split-page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/app/AuthProvider"
import { SurfaceCard } from "@/components/shared/surface-card"
import { FormField } from "@/components/shared/form-field"

export default function SettingsPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      await signOut()
      router.push("/")
    } catch (err) {
      console.error("Error signing out", err)
    } finally {
      setLoggingOut(false)
    }
  }

  const content = (() => {
    if (loading) {
      return (
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-xl">Loading settings</CardTitle>
            <CardDescription>
              Fetching your account preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 animate-pulse">
              <div className="h-10 rounded-md bg-muted/60" />
              <div className="h-10 rounded-md bg-muted/60" />
              <div className="h-10 rounded-md bg-muted/60" />
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
              Log in to manage your Boxscore settings.
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

    return (
      <div className="space-y-6">
        {/* Account settings */}
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-xl">Account</CardTitle>
            <CardDescription>
              Core settings tied to your Boxscore account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              id="email"
              label="Email"
              hint={
                <>
                  Email changes and password resets will be managed from here in a
                  future version.
                </>
              }
            >
              <Input
                id="email"
                type="email"
                value={user.email ?? ""}
                disabled
                className="bg-background/80"
              />
            </FormField>

            <FormField
              id="password"
              label="Password"
              hint="You&apos;ll be able to update your password from this section later."
            >
              <Input
                id="password"
                type="password"
                value="••••••••"
                disabled
                className="bg-background/80"
              />
            </FormField>
          </CardContent>
        </SurfaceCard>

        {/* Preferences */}
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-xl">Preferences</CardTitle>
            <CardDescription>
              Tune how Boxscore feels for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">
                  Dark mode is currently the default. Theme switching will land
                  here.
                </p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                Dark
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">Email notifications</p>
                <p className="text-xs text-muted-foreground">
                  Control reminders and alerts about your activity.
                </p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                Coming soon
              </span>
            </div>
          </CardContent>
        </SurfaceCard>

        {/* Danger zone / sign out */}
        <Card className="border-destructive/40 bg-card/95 shadow-lg shadow-black/30">
          <CardHeader>
            <CardTitle className="text-xl">Sign out</CardTitle>
            <CardDescription>
              Log out of Boxscore on this device.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              You&apos;ll be able to sign back in at any time with your email and
              password.
            </p>
            <Button
              variant="destructive"
              className="sm:w-auto w-full"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? "Signing out..." : "Log out"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  })()

  return (
    <SplitPage
      title={
        <>
          Settings
          <span className="block text-primary">tune how Boxscore works for you.</span>
        </>
      }
      description={
        <>
          Manage account basics, preferences, and sign-out. As Boxscore grows,
          more fine-grained controls will live here.
        </>
      }
      pills={["Account", "Preferences", "Sign out"]}
    >
      {content}
    </SplitPage>
  )
}

