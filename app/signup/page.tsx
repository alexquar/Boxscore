"use client"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SplitPage } from "@/components/split-page"
import { useAuth } from "../AuthProvider"
import { useRouter } from "next/navigation"
export default function SignupPage() {
  const { signUpWithPassword } = useAuth();
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign-up logic here
    try {
      await signUpWithPassword(email, password); 

    } catch (error) {
      console.error("Error signing up:", error);
      return
    }
    router.push('/login');
  }

  return (
    <SplitPage
      title={
        <>
          Join the sports community
          <span className="block text-primary">built for boxscores.</span>
        </>
      }
      description={
        <>
          Create a profile, follow friends, and catalog every game you watch.
          Inspired by Letterboxd, designed for sports.
        </>
      }
      pills={[
        "Track every league",
        "Compare stats with friends",
        "Build custom lists",
      ]}
    >
      <Card className="border-input/60 bg-card/95 shadow-lg shadow-black/30">
        <CardHeader>
          <CardTitle className="text-xl">Sign up for Boxscore</CardTitle>
          <CardDescription>
            Create an account to start logging and rating your games.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Display name</Label>
              <Input
                id="name"
                autoComplete="name"
                placeholder="What should we call you?"
                className="bg-background/80"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                className="bg-background/80"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
    </SplitPage>
  )
}

