"use client"
import Link from "next/link"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SplitPage } from "@/components/split-page"
import { SurfaceCard } from "@/components/shared/surface-card"
import { FormField } from "@/components/shared/form-field"
import { useState } from "react"
import { useAuth } from "../AuthProvider"
import { useRouter } from "next/navigation"
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signInWithPassword } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    try {
      await signInWithPassword(email, password); 
    }
    catch (error) {
      console.error("Error logging in:", error);
      // return
      return;
    }
    router.push('/');
  }
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
      <SurfaceCard>
        <CardHeader>
          <CardTitle className="text-xl">Log in to Boxscore</CardTitle>
          <CardDescription>
            Welcome back. Continue tracking the games you watch.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField id="email" label="Email">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="bg-background/80"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            <FormField
              id="password"
              label="Password"
              labelExtras={
                <Link
                  href="#"
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              }
            >
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                className="bg-background/80"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>

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
      </SurfaceCard>
    </SplitPage>
  )
}
