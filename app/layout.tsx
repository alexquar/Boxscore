import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "../public/logo.svg"
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {User, CirclePlus, Search} from "lucide-react"
import Link from "next/link";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// set the apps image


export const metadata: Metadata = {
  title: "Boxscore",
  description: "Your ultimate sports tracking platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark w-full h-full bg-background text-foreground">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      <Link href="/games" className="hover:text-foreground">Games</Link>
      <Link href="/members" className="hover:text-foreground">Members</Link>
      <Link href="/lists" className="hover:text-foreground">Lists</Link>
      <Link href="/journal" className="hover:text-foreground">Journal</Link>

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
      <Button  size="sm">
        Log in
      </Button>
      <Button size="sm">
        Sign up
      </Button>

      {/* Primary action */}
      <Button size="sm" className="flex items-center justify-center">
        <CirclePlus className="mr-1 h-4 w-4" />
        <span className="leading-none">
          Log
        </span>
      </Button>

      {/* Profile (logged-in) */}
      <Button variant="ghost" size="icon">
        <User className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>


  </div>
</nav>

        {children}
      </body>
    </html>
  );
}
