import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gradient-to-b from-background to-background/80 px-4 py-10">
      <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* Left column: marketing copy */}
        <section className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Join the sports community
            <span className="block text-primary">built for boxscores.</span>
          </h1>
          <p className="max-w-md text-sm text-muted-foreground md:text-base">
            Create a profile, follow friends, and catalog every game you watch.
            Inspired by Letterboxd, designed for sports.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary/60 px-3 py-1">Track every league</span>
            <span className="rounded-full bg-secondary/60 px-3 py-1">Compare stats with friends</span>
            <span className="rounded-full bg-secondary/60 px-3 py-1">Build custom lists</span>
          </div>
        </section>

        {/* Right column: auth card */}
        <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
          <CardHeader>
            <CardTitle className="text-xl">Sign up for Boxscore</CardTitle>
            <CardDescription>
              Create an account to start logging and rating your games.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Display name</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="What should we call you?"
                  className="bg-background/80"
                />
              </div>

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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className="bg-background/80"
                />
              </div>

              <Button type="submit" className="w-full">
                Create account
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

