"use client"
import Logo from "../public/logo.svg"
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
import {User, CirclePlus, Search} from "lucide-react"
import Link from "next/link";
import { useAuth } from "@/app/AuthProvider";
export default function Nav() {
    const { user } = useAuth();
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
            { user ? <>
          <Link href="/games" className="hover:text-foreground">Games</Link>
          <Link href="/members" className="hover:text-foreground">Members</Link>
          <Link href="/lists" className="hover:text-foreground">Lists</Link>
          <Link href="/journal" className="hover:text-foreground">Journal</Link>
          <Link href="/settings" className="hover:text-foreground">Settings</Link>
    
          {/* Leagues dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto bg-transparent px-0 py-0 text-sm text-muted-foreground hover:text-foreground">
                  Leagues
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-50 gap-2 p-2">
                    {["NHL", "NBA", "NFL", "MLB"].map((league) => (
                      <li key={league}>
                        <NavigationMenuLink
                          href={`/leagues/${league.toLowerCase()}`}
                          className="block rounded px-3 py-2 text-sm hover:bg-muted"
                        >
                          {league}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

    
          
    
          {/* Profile (logged-in) */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
                    <Button size="sm" asChild className="flex items-center justify-center">
            <Link href="/log">
              <CirclePlus className="mr-1 h-4 w-4" />
              <span className="leading-none">
                Log
              </span>
            </Link>
          </Button>
          </> :
          <>
                     <Button asChild variant="outline" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
          </>
}

        </div>
    
    
      </div>
    </nav>
  )
}
