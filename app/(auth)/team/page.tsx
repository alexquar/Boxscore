"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  ExternalLink,
  Calendar,
  Globe,
  Facebook,
  Twitter,
  Youtube,
  Rss,
  Instagram,
  Trophy,
  Info,
  Users,
  Shield,
  Sparkles,
  MapPin,
  Building2,
  Heart,
  Shirt,
} from "lucide-react"
import type { TeamData } from "@/types/teamType"

function normalizeUrl(raw?: string | null) {
  if (!raw) return null
  const v = raw.trim()
  if (!v) return null
  if (v.startsWith("http://") || v.startsWith("https://")) return v
  return `https://${v.replace(/^\/\//, "")}`
}

/**
 * Input comes from /teams/?team=Toronto_Maple_Leafs
 * We just need a nice display label if needed.
 */
function fromQuerySlugToLabel(slug: string) {
  return slug.replace(/_/g, " ")
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <Card className="border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg border bg-background/60">
            {icon}
          </div>
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="truncate text-sm font-semibold">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SocialLink({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string
  icon: React.ReactNode
  title: string
  subtitle?: string
}) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="group">
      <Card className="border-border/60 transition hover:-translate-y-0.5 hover:border-border hover:shadow-md">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl border bg-background/60">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="truncate text-sm font-semibold">{title}</div>
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
            </div>
            {subtitle ? (
              <div className="truncate text-xs text-muted-foreground">{subtitle}</div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
      <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </div>
  )
}

function hexToRgb(hex?: string) {
  if (!hex) return null
  const h = hex.trim().replace("#", "")
  if (![3, 6].includes(h.length)) return null
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h
  const n = parseInt(full, 16)
  if (!Number.isFinite(n)) return null
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `${r} ${g} ${b}`
}

export default function TeamPage() {
  const searchParams = useSearchParams()
  const teamParam = searchParams.get("team") // e.g. Toronto_Maple_Leafs
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!teamParam) {
      setError("No team specified")
      setLoading(false)
      return
    }

    async function fetchTeamData() {
      try {
        setLoading(true)
        const response = await fetch(
          `http://localhost:3000/api/teams/?team=${encodeURIComponent(teamParam ?? "")}`,
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch team data")
        }

        const data = await response.json()
        setTeamData(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setTeamData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [teamParam])

  const links = useMemo(() => {
    const d = teamData
    if (!d) return null

    const website = normalizeUrl(d.strWebsite)
    const facebook = normalizeUrl(d.strFacebook)
    const twitter = normalizeUrl(d.strTwitter)
    const instagram = normalizeUrl(d.strInstagram)
    const youtube = normalizeUrl(d.strYoutube)
    const rss = normalizeUrl(d.strRSS) ?? (d.strRSS?.trim() ? d.strRSS.trim() : null)

    const twitterHandle = d.strTwitter?.includes("/")
      ? d.strTwitter.split("/").filter(Boolean).pop()
      : d.strTwitter?.replace(/^@/, "")

    return { website, facebook, twitter, twitterHandle, instagram, youtube, rss }
  }, [teamData])

  const heroImage =
    teamData?.strBanner ||
    teamData?.strFanart1 ||
    teamData?.strFanart2 ||
    teamData?.strFanart3 ||
    teamData?.strFanart4 ||
    teamData?.strEquipment ||
    null

  const gallery = useMemo(() => {
    const d = teamData
    if (!d) return []
    return [d.strFanart1, d.strFanart2, d.strFanart3, d.strFanart4, d.strEquipment]
      .filter(Boolean)
      .slice(0, 5)
  }, [teamData])

  // Optional: use team colours as a subtle accent (works even in dark mode)
  const accentRgb = useMemo(() => hexToRgb(teamData?.strColour1), [teamData?.strColour1])

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Card className="border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-2xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-28 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <Skeleton className="h-56 w-full rounded-xl lg:col-span-2" />
                <Skeleton className="h-56 w-full rounded-xl" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (error || !teamData) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Error loading team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{error}</p>
              <p className="text-xs text-muted-foreground">
                Example team param:{" "}
                <code className="rounded bg-muted px-2 py-1">Toronto_Maple_Leafs</code>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }


  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        {heroImage ? (
          <div className="absolute inset-0">
            <Image src={heroImage} alt="Team hero" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-background/70 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
        )}

        {/* Accent glow from team color */}
        {accentRgb ? (
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              backgroundColor: `rgb(${accentRgb} / 0.18)`,
            }}
          />
        ) : null}

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border bg-background/60 sm:h-20 sm:w-20">
                {teamData.strLogo || teamData.strBadge ? (
                  <Image
                    src={teamData.strLogo || teamData.strBadge || ""}
                    alt="Team logo"
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                ) : null}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-2xl font-semibold sm:text-3xl">
                    {teamData.strTeam}
                  </h1>
                  {teamData.strSport ? (
                    <Badge variant="secondary" className="gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      {teamData.strSport}
                    </Badge>
                  ) : null}
                </div>

                {teamData.strTeamAlternate ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {teamData.strTeamAlternate}
                    {teamData.strTeamShort ? (
                      <span className="text-muted-foreground"> · {teamData.strTeamShort}</span>
                    ) : null}
                  </p>
                ) : teamData.strTeamShort ? (
                  <p className="mt-1 text-sm text-muted-foreground">{teamData.strTeamShort}</p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  {teamData.strLeague ? (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="h-3.5 w-3.5" />
                      {teamData.strLeague}
                    </Badge>
                  ) : null}

                  {teamData.intFormedYear ? (
                    <Badge variant="outline" className="gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Founded {teamData.intFormedYear}
                    </Badge>
                  ) : null}

                  {teamData.strCountry ? (
                    <Badge variant="outline" className="gap-1">
                      <Globe className="h-3.5 w-3.5" />
                      {teamData.strCountry}
                    </Badge>
                  ) : null}

                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {teamData.strLeague ? (
                <Button asChild variant="outline" className="gap-2">
                  <Link href={`/league/?league=${encodeURIComponent(teamData.strLeague.toLowerCase())}`}>
                    <Shield className="h-4 w-4" />
                    League
                  </Link>
                </Button>
              ) : null}

              {links?.website ? (
                <Button asChild variant="secondary" className="gap-2">
                  <Link href={links.website} target="_blank" rel="noreferrer">
                    <Globe className="h-4 w-4" />
                    Website
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
              label="Location"
              value={teamData.strLocation || "—"}
            />
            <StatCard
              icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
              label="Stadium"
              value={teamData.strStadium || "—"}
            />
            <StatCard
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              label="Division"
              value={teamData.strDivision || "—"}
            />
            <StatCard
              icon={<Shirt className="h-4 w-4 text-muted-foreground" />}
              label="Capacity"
              value={teamData.intStadiumCapacity && !isNaN(Number(teamData.intStadiumCapacity)) && Number(teamData.intStadiumCapacity) ? Number(teamData.intStadiumCapacity) : "—"}
            />
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-muted-foreground" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4">
                    <ScrollArea className="h-[280px] pr-4">
                      <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
                        {(teamData.strDescriptionEN || "")
                          .split("\n\n")
                          .filter(Boolean)
                          .map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                        {!teamData.strDescriptionEN ? (
                          <p className="text-muted-foreground">No description available.</p>
                        ) : null}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="details" className="mt-4">
                    <div className="rounded-xl border bg-muted/40 p-4 text-sm">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <div className="text-xs text-muted-foreground">Team</div>
                          <div className="font-semibold">{teamData.strTeam}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">League</div>
                          <div className="font-semibold">{teamData.strLeague || "—"}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Founded</div>
                          <div className="font-semibold">{teamData.intFormedYear || "—"}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Sport</div>
                          <div className="font-semibold">{teamData.strSport || "—"}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Stadium</div>
                          <div className="font-semibold">{teamData.strStadium || "—"}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Capacity</div>
                          <div className="font-semibold">
                            {teamData.intStadiumCapacity
                              ? Number(teamData.intStadiumCapacity).toLocaleString()
                              : "—"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {gallery.length ? (
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-muted-foreground" />
                    Visuals
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  {gallery.map((src, i) => (
                    <GalleryImage key={src ?? "" + i} src={src ?? ""} alt={`Visual ${i + 1}`} />
                  ))}
                </CardContent>
              </Card>
            ) : null}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {(teamData.strBadge || teamData.strLogo) ? (
              <Card className="border-border/60 overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                    Identity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {teamData.strBadge ? (
                    <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
                      <Image
                        src={teamData.strBadge}
                        alt="badge"
                        fill
                        className="object-contain p-6"
                        unoptimized
                      />
                    </div>
                  ) : null}
                  {teamData.strLogo ? (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
                      <Image
                        src={teamData.strLogo}
                        alt="logo"
                        fill
                        className="object-contain p-6"
                        unoptimized
                      />
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}

            {teamData.strEquipment ? (
              <Card className="border-border/60 overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Shirt className="h-5 w-5 text-muted-foreground" />
                    Equipment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
                    <Image
                      src={teamData.strEquipment}
                      alt="equipment"
                      fill
                      className="object-contain p-4"
                      unoptimized
                    />
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  Connect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {links?.website ? (
                  <SocialLink
                    href={links.website}
                    icon={<Globe className="h-5 w-5 text-muted-foreground" />}
                    title="Official website"
                    subtitle={teamData.strWebsite || undefined}
                  />
                ) : null}

                <div className="grid gap-3">
                  {links?.facebook ? (
                    <SocialLink
                      href={links.facebook}
                      icon={<Facebook className="h-5 w-5 text-muted-foreground" />}
                      title="Facebook"
                      subtitle="Updates & community"
                    />
                  ) : null}
                  {links?.twitter ? (
                    <SocialLink
                      href={links.twitter}
                      icon={<Twitter className="h-5 w-5 text-muted-foreground" />}
                      title="Twitter / X"
                      subtitle={links.twitterHandle ? `@${links.twitterHandle}` : "News & highlights"}
                    />
                  ) : null}
                  {links?.instagram ? (
                    <SocialLink
                      href={links.instagram}
                      icon={<Instagram className="h-5 w-5 text-muted-foreground" />}
                      title="Instagram"
                      subtitle="Stories & behind the scenes"
                    />
                  ) : null}
                  {links?.youtube ? (
                    <SocialLink
                      href={links.youtube}
                      icon={<Youtube className="h-5 w-5 text-muted-foreground" />}
                      title="YouTube"
                      subtitle="Highlights & clips"
                    />
                  ) : null}
                  {links?.rss ? (
                    <SocialLink
                      href={links.rss}
                      icon={<Rss className="h-5 w-5 text-muted-foreground" />}
                      title="RSS feed"
                      subtitle="Latest updates"
                    />
                  ) : null}

                  {!links?.website &&
                  !links?.facebook &&
                  !links?.twitter &&
                  !links?.instagram &&
                  !links?.youtube &&
                  !links?.rss ? (
                    <div className="rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
                      No external links available.
                    </div>
                  ) : null}
                </div>

              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </main>
  )
}
