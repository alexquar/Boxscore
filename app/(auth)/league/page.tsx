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
} from "lucide-react"

interface LeagueData {
  idLeague: string
  strSport: string
  strLeague: string
  strLeagueAlternate: string
  intDivision: string
  intFormedYear: string
  dateFirstEvent: string
  strCurrentSeason: string
  strGender: string
  strCountry: string
  strWebsite: string
  strFacebook: string
  strInstagram: string
  strTwitter: string
  strYoutube: string
  strRSS: string
  strDescriptionEN: string
  strTvRights: string
  strFanart1: string
  strFanart2: string
  strFanart3: string
  strFanart4: string
  strBanner: string
  strBadge: string
  strLogo: string
  strPoster: string
  strTrophy: string
}

function normalizeUrl(raw?: string) {
  if (!raw) return null
  const v = raw.trim()
  if (!v) return null
  if (v.startsWith("http://") || v.startsWith("https://")) return v
  // Some APIs return "www.foo.com/..." or "facebook.com/..."
  return `https://${v.replace(/^\/\//, "")}`
}

function safeYear(dateStr?: string) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return Number.isFinite(d.getTime()) ? d.getFullYear() : null
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
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
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
              <div className="truncate text-xs text-muted-foreground">
                {subtitle}
              </div>
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
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </div>
  )
}

export default function LeaguePage() {
  const searchParams = useSearchParams()
  const league = searchParams.get("league")
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!league) {
      setError("No league specified")
      setLoading(false)
      return
    }

    async function fetchLeagueData() {
      try {
        setLoading(true)
        const response = await fetch(
          `http://localhost:3000/api/leagues/?league=${league}`,
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch league data")
        }

        const data = await response.json()
        setLeagueData(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setLeagueData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchLeagueData()
  }, [league])

  const links = useMemo(() => {
    const d = leagueData
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

    return {
      website,
      facebook,
      twitter,
      twitterHandle,
      instagram,
      youtube,
      rss,
    }
  }, [leagueData])

  const heroImage =
    leagueData?.strBanner ||
    leagueData?.strFanart1 ||
    leagueData?.strFanart2 ||
    leagueData?.strFanart3 ||
    leagueData?.strFanart4 ||
    leagueData?.strPoster ||
    null

  const gallery = useMemo(() => {
    const d = leagueData
    if (!d) return []
    return [d.strFanart1, d.strFanart2, d.strFanart3, d.strFanart4, d.strPoster]
      .filter(Boolean)
      .slice(0, 5)
  }, [leagueData])

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

  if (error || !leagueData) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Error loading league</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{error}</p>
              <p className="text-xs text-muted-foreground">
                Try: <span className="font-medium">mlb</span>,{" "}
                <span className="font-medium">nfl</span>,{" "}
                <span className="font-medium">nba</span>,{" "}
                <span className="font-medium">nhl</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  const firstEventYear = safeYear(leagueData.dateFirstEvent)

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        {heroImage ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={heroImage}
                alt="League hero"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-background/70 backdrop-blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
        )}

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border bg-background/60 sm:h-20 sm:w-20">
                {(leagueData.strLogo || leagueData.strBadge) ? (
                  <Image
                    src={leagueData.strLogo || leagueData.strBadge}
                    alt="League logo"
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                ) : null}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-2xl font-semibold sm:text-3xl">
                    {leagueData.strLeague}
                  </h1>
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    {leagueData.strSport}
                  </Badge>
                </div>

                {leagueData.strLeagueAlternate ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {leagueData.strLeagueAlternate}
                  </p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Globe className="h-3.5 w-3.5" />
                    {leagueData.strCountry}
                  </Badge>
                  {leagueData.intFormedYear ? (
                    <Badge variant="outline" className="gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Founded {leagueData.intFormedYear}
                    </Badge>
                  ) : null}
                  {leagueData.strGender ? (
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {leagueData.strGender}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {links?.website ? (
                <Button asChild variant="secondary" className="gap-2">
                  <Link href={links.website} target="_blank" rel="noreferrer">
                    <Globe className="h-4 w-4" />
                    Website
                  </Link>
                </Button>
              ) : null}
              {links?.rss ? (
                <Button asChild variant="outline" className="gap-2">
                  <Link href={links.rss} target="_blank" rel="noreferrer">
                    <Rss className="h-4 w-4" />
                    RSS
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<Shield className="h-4 w-4 text-muted-foreground" />}
              label="Division"
              value={parseInt(leagueData.intDivision)+1 || "—"}
            />
            <StatCard
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
              label="First event"
              value={firstEventYear ?? "—"}
            />
            <StatCard
              icon={<Info className="h-4 w-4 text-muted-foreground" />}
              label="Season"
              value={leagueData.strCurrentSeason || "—"}
            />
            <StatCard
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              label="Gender"
              value={leagueData.strGender || "—"}
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
                    <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4">
                    <ScrollArea className="h-[280px] pr-4">
                      <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
                        {(leagueData.strDescriptionEN || "")
                          .split("\n\n")
                          .filter(Boolean)
                          .map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                        {!leagueData.strDescriptionEN ? (
                          <p className="text-muted-foreground">
                            No description available.
                          </p>
                        ) : null}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="broadcast" className="mt-4">
                    {leagueData.strTvRights ? (
                      <div className="rounded-xl border bg-muted/40 p-4 text-sm whitespace-pre-line">
                        {leagueData.strTvRights}
                      </div>
                    ) : (
                      <div className="rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
                        No broadcasting rights info available.
                      </div>
                    )}
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
                    <GalleryImage key={src + i} src={src} alt={`Fanart ${i + 1}`} />
                  ))}
                </CardContent>
              </Card>
            ) : null}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {leagueData.strTrophy ? (
              <Card className="border-border/60 overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                    Trophy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
                    <Image
                      src={leagueData.strTrophy}
                      alt="trophy"
                      fill
                      className="object-contain p-6"
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
                    subtitle={leagueData.strWebsite}
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
