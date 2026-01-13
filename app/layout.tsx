import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import Nav from "@/components/nav";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


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
    <AuthProvider>
        <Nav />

        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
