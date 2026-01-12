import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SplitPage } from "@/components/split-page"

export default function LoginPage() {
  return (
    <SplitPage
      title={
        <>
          Track every game.
          <span className="block text-primary">Remember every moment.</span>
        </>
      }
      description={
        <>
          Log the games you watch, rate performances, and build a history of your
          sports life. Boxscore brings a cinematic, Letterboxd-inspired feel to
          your stats.
        </>
      }
      pills={[
        "Personal game diary",
        "Season-long tracking",
        "Share with friends",
      ]}
    >
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
    </SplitPage>
  )
}
