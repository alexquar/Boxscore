import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gradient-to-b from-background to-background/80 px-4 py-10">
      <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* Left column: marketing copy */}
        <section className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Track every game.
            <span className="block text-primary">Remember every moment.</span>
          </h1>
          <p className="max-w-md text-sm text-muted-foreground md:text-base">
            Log the games you watch, rate performances, and build a history of your
            sports life. Boxscore brings a cinematic, Letterboxd-inspired feel to
            your stats.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary/60 px-3 py-1">Personal game diary</span>
            <span className="rounded-full bg-secondary/60 px-3 py-1">Season-long tracking</span>
            <span className="rounded-full bg-secondary/60 px-3 py-1">Share with friends</span>
          </div>
        </section>

        {/* Right column: auth card */}
        <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
          <CardHeader>
            <CardTitle className="text-xl">Log in to Boxscore</CardTitle>
            <CardDescription>
              Welcome back. Continue tracking the games you watch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="bg-background/80"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="bg-background/80"
                />
              </div>

              <Button type="submit" className="w-full">
                Log in
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                New to Boxscore?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

