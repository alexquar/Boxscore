"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SplitPage } from "@/components/split-page"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/app/AuthProvider"
import { SurfaceCard } from "@/components/shared/surface-card"
import { FormField } from "@/components/shared/form-field"
import { useEffect, useState} from "react"
import { useRouter } from "next/navigation"
import { NHLTeam } from "@/util/nhlTeams"
import { NFLTeam } from "@/util/nflTeams"
import { NBATeam } from "@/util/nbaTeams"
import { MLBTeam } from "@/util/mlbTeams"
type userProfile = {
    id: string;
    email: string | null;
    displayName: string | null;
    Bio: string | null;
    avatarUrl: string | null;
    favoriteTeam: string | null;
    favoritePlayer: string | null;
    favoriteLeague: string | null;
    createdAt: Date;
    _count: {
        journals: number;
        logs: number;
        lists: number;
    }
  }
export default function ProfilePage() {
  const router = useRouter();
  const params: { id:string} = useParams();
  const {id} = params;
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<userProfile | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  useEffect(() => {
    //fetch from backend using id param on /api/user/[id]/profile route
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching profile for user ID:", id);
        const response = await fetch(`/api/user/${id}/profile`);
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data: userProfile = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    fetchUserProfile();
  }, [id])

  const handleProfileUpdate = async () => {
    if (!profile) return;
    try {

      const response = await fetch(`/api/user/${profile.id}/profile`, {
        method: "PUT",
        body: JSON.stringify({
          displayName: profile.displayName,
          Bio: profile.Bio,
          favoriteTeam: profile.favoriteTeam,
          favoritePlayer: profile.favoritePlayer,
          favoriteLeague: profile.favoriteLeague,
          // avatarUrl: profile.avatarUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const updatedProfile: userProfile = await response.json();
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

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

    return (
      <div className="space-y-6">
        {/* Core profile info */}
        {user && user.id === profile?.id && 
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-xl">Profile</CardTitle>
            <CardDescription>
              This is how your profile appears across Boxscore.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <FormField
                id="displayName"
                label="Display name"
                hint="Name other users will know you by."
              >
                <Input
                  id="displayName"
                  value={profile?.displayName ?? ""}
                  onChange={
                    (e) => {
                      setProfile({
                        ...profile!,
                        displayName: e.target.value
                      })
                  }
                }
                  className="bg-background/80"
                />
              </FormField>

              <FormField id="email" label="Email">
                <Input
                  id="email"
                  type="email"
                  value={profile.email ?? ""}
                  disabled
                  className="bg-background/80"
                />
              </FormField>
            </div>
            <div className="grid gap-4 md:grid-cols-1">

            <FormField
              id="bio"
              label="Bio"
              hint="About your profile visible to all other users."
            >
              <textarea
                id="bio"
                className="flex min-h-20 w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add a short bio, favourite teams, or how you watch games."
                value={profile?.Bio ?? ""}
                onChange={
                  (e) => {
                    setProfile({
                      ...profile!,
                      Bio: e.target.value
                    })
                }
              }
              />
            </FormField>
            {/* form fields for updating favorite player, team and league  */}
            <FormField
              id="favoritePlayer"
              label="Favorite Player"
            >
              <Input
                id="favoritePlayer"
                value={profile?.favoritePlayer ?? ""}
                onChange={
                  (e) => {
                    setProfile({
                      ...profile!,
                      favoritePlayer: e.target.value
                    })
                }
              }
                className="bg-background/80"
              />
            </FormField>

                        <FormField
              id="favoriteLeague"
              label="Favorite League"
            >
              <Select 
                value={profile?.favoriteLeague ?? ""}
                onValueChange={
                  (value) => {
                    setProfile({
                      ...profile!,
                      favoriteLeague: value
                    })
                }
              }
              >
                <SelectTrigger className="w-full bg-background/80">
                  <SelectValue placeholder="Select your favorite league" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NHL">NHL</SelectItem>
                  <SelectItem value="NBA">NBA</SelectItem>
                  <SelectItem value="NFL">NFL</SelectItem>
                  <SelectItem value="MLB">MLB</SelectItem>
                </SelectContent>
              </Select>

            </FormField>
              {/* favorite team should be a select conditional on which league is selected */}
            <FormField
              id="favoriteTeam"
              label="Favorite Team"
            >
              <Select
                value={profile?.favoriteTeam ?? ""}
                onValueChange={
                  (value) => {
                    setProfile({
                      ...profile!,
                      favoriteTeam: value
                    })
                }
              }
              >
                <SelectTrigger className="w-full bg-background/80">
                  <SelectValue placeholder="Select your favorite team" />
                </SelectTrigger>
                <SelectContent>
                  {profile?.favoriteLeague === "NHL" && Object.entries(NHLTeam).map(([slug, team]) => (
                    <SelectItem key={slug} value={slug}>{team}</SelectItem>
                  ))}
                  {profile?.favoriteLeague === "NBA" && Object.entries(NBATeam).map(([slug, team]) => (
                    <SelectItem key={slug} value={slug}>{team}</SelectItem>
                  ))}
                  {profile?.favoriteLeague === "NFL" && Object.entries(NFLTeam).map(([slug, team]) => (
                    <SelectItem key={slug} value={slug}>{team}</SelectItem>
                  ))}
                  {profile?.favoriteLeague === "MLB" && Object.entries(MLBTeam).map(([slug, team]) => (
                    <SelectItem key={slug} value={slug}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            {/* upload image field for setting the avatar which will be uploaded to s3 wrapper and then saved as avatarURL */}
            {/* <FormField
              id="avatar"
              label="Profile avatar"
              
              hint="Upload an image to represent your profile."
            >
              <input
              disabled
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setAvatarFile(e.target.files[0]);
                  }
                }}
              />
            </FormField> */}
            
            <Button onClick={handleProfileUpdate}>Save changes</Button>
              </div>
            </form>
            {/* multi select of nhl/nfl/nba/mlb */}
          </CardContent>
        </SurfaceCard>
  }

        {/* Activity snapshot, Letterboxd-style */}
        <SurfaceCard>
          <CardHeader>
            <CardTitle className="text-xl">Activity snapshot</CardTitle>
            <CardDescription>
              A quick overview of {profile?.displayName}'s Boxscore.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link href={`/profile/log/${profile?.id}`} className="space-y-1">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Logs
                </p>
                <p className="text-2xl font-semibold">{profile?._count.logs ?? "—"}</p>
                <p className="text-xs text-muted-foreground">
                  Total games you&apos;ve logged.
                </p>
              </div>
              </Link>
              <Link href={`/profile/list/${profile?.id}`} className="space-y-1">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Lists
                </p>
                <p className="text-2xl font-semibold">{profile?._count.lists ?? "—"}</p>
                <p className="text-xs text-muted-foreground">
                  Number of lists created.
                </p>
              </div>
              </Link>
              <Link href={`/profile/journal/${profile?.id}`} className="space-y-1">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Journals
                </p>
                <p className="text-2xl font-semibold">{profile?._count.journals ?? "—"}</p>
                <p className="text-xs text-muted-foreground">
                 Number of journals created.
                </p>
              </div>
              </Link>
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
         { user && user.id === profile?.id ? "Your profile" : `${profile?.displayName}'s profile`}
          <span className="block text-primary">Member since {new Date(profile?.createdAt ?? "").toLocaleDateString()}</span>
        </>
      }
      description={
        <>
        { user && user.id === profile?.id ? "Manage and customize your Boxscore profile." : "View this user's Boxscore profile."}
        </>
      }
      pills={["Display details", "Public bio", "Activity snapshot"]}
    >
      {content}
    </SplitPage>
  )
}

