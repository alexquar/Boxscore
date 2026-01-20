"use client";
import Logo from "../public/logo.svg";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { User, CirclePlus, Search, Settings } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/AuthProvider";
import { NHLTeam } from "@/util/nhlTeams";
import { NFLTeam } from "@/util/nflTeams";
import { NBATeam } from "@/util/nbaTeams";
import { MLBTeam } from "@/util/mlbTeams";
import { useState } from "react";
const LEAGUE_TEAMS = {
  nhl: NHLTeam,
  nfl: NFLTeam,
  nba: NBATeam,
  mlb: MLBTeam,
} as const;

type LeagueKey = keyof typeof LEAGUE_TEAMS;
export default function Nav() {
  const { user } = useAuth();
  const [activeLeague, setActiveLeague] = useState<LeagueKey>("nhl");

  return (
    <nav className="sticky top-0 z-50 w-full bg-secondary backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          {/* place logo.svg here */}
          <Image src={Logo} alt="Boxscore Logo" width={24} height={24} />
          <span className="text-lg">Boxscore</span>
        </Link>

        {/* CENTER: Main nav */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {user ? (
            <>
              <Link href="/games" className="hover:text-foreground">
                Games
              </Link>
              <Link href="/members" className="hover:text-foreground">
                Members
              </Link>
              <Link href="/lists" className="hover:text-foreground">
                Lists
              </Link>
              <Link href="/journal" className="hover:text-foreground">
                Journal
              </Link>


              {/* 2 tiered leagues and teams dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:text-foreground">
                      Leagues & Teams
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <div className="grid w-150 grid-cols-2 gap-4 p-4">
                        {/* LEFT: Leagues */}
                        <div>
                          <h3 className="mb-2 font-medium">Leagues</h3>
                          <ul className="space-y-1">
                            {(
                              [
                                ["nhl", "NHL"],
                                ["nfl", "NFL"],
                                ["nba", "NBA"],
                                ["mlb", "MLB"],
                              ] as [LeagueKey, string][]
                            ).map(([key, label]) => (
                              <li key={key}>
                                <Link
                                  href={`/league/?league=${key}`}
                                  onMouseEnter={() => setActiveLeague(key)}
                                  className={`block rounded px-2 py-1 transition hover:text-foreground ${
                                    activeLeague === key
                                      ? "bg-muted font-medium"
                                      : ""
                                  }`}
                                >
                                  {label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="mb-2 font-medium">
                            {activeLeague.toUpperCase()} Teams
                          </h3>

                          <ul className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto">
                            {Object.entries(LEAGUE_TEAMS[activeLeague]).map(
                              ([slug, team]) => (
                                <li key={slug}>
                                  <Link
                                    href={`/team/?team=${team}`}
                                    className="block rounded px-2 py-1 text-sm transition hover:text-foreground hover:bg-muted hover:font-medium"
                                  >
                                    {team}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Profile (logged-in) */}
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/profile/${user.id}`}>
                  <User className="h-4 w-4" />
                </Link>
              </Button>
              <Link href="/settings" className="hover:text-foreground">
                <Settings className="inline-block h-4 w-4 mr-1" />
              </Link>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/search">
                  <Search className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="flex items-center justify-center"
              >
                <Link href="/log">
                  <CirclePlus className="mr-1 h-4 w-4" />
                  <span className="leading-none">Log</span>
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
