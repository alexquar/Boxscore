import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, StarHalf, Ellipsis, Plus } from "lucide-react";
export default function Home() {
  return (
    // home page we will dispplay a welcome message similar to letter box and then sections with unnderlined subtitle similar to letterboxd home page, we will have games on now, poplular games, latest news, popular reviews and popular lists and top members, these should all be in a card format
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 mb-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Welcome to Boxscore</h1>
      </div>
     <h3 className="self-start text-2xl mb-10 font-semibold underline underline-offset-4">Games On Now</h3>
     <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Cards for games on now */}
      <Card className="p-4">
       <div className="flex justify-content-between items-center gap-2 w-full">
        <h4 className="text-xl font-semibold">Game Title 1</h4> 
        <Badge>Now Playing</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Brief description of the game.</p>
        {/* rating stuff at bottom of card */}
        <div className="mt-auto flex flex-row justify-content-left gap-1 items-center">
          {/* stars */}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-success" />
            <Star className="h-4 w-4 text-success" />
            <Star className="h-4 w-4 text-success" />
            <StarHalf className="h-4 w-4 text-success" />
          </div>
          <Plus className="h-4 w-4 text-primary " />
          <Ellipsis className="h-4 w-4 text-third" />

        </div>
      </Card>
      <Card className="p-4">
        <h4 className="text-xl font-semibold">Game Title 2</h4>
        <p className="text-sm text-muted-foreground">Brief description of the game.</p>
        <Badge className="mt-2">Now Playing</Badge>
      </Card>
      <Card className="p-4">
        <h4 className="text-xl font-semibold">Game Title
  3</h4>
        <p className="text-sm text-muted-foreground">Brief description of the game.</p>   
        <Badge className="mt-2">Now Playing</Badge>
      </Card>
      </div>
      <h3 className="self-start mt-8 text-2xl font-semibold underline underline-offset-4 mb-10">Popular Games</h3>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Cards for popular games */}
      <Card className="p-4">
        <h4 className="text-xl font-semibold">Popular Game 1</h4>
        <p className="text-sm text-muted-foreground">Brief description of the popular game.</p>
        <Badge className="mt-2">Popular</Badge>                               
      </Card>
      <Card className="p-4">
        <h4 className="text-xl font-semibold">Popular Game 2</h4>
        <p className="text-sm text-muted-foreground">Brief description of the popular game.</p>
        <Badge className="mt-2">Popular</Badge>                               
      </Card>
      <Card className="p-4">
        <h4 className="text-xl font-semibold">Popular Game 3</h4>
        <p className="text-sm text-muted-foreground">Brief description of the popular game.</p>
        <Badge className="mt-2">Popular</Badge>                               
      </Card>
      </div>
      <h3 className="self-start mt-8 text-2xl font-semibold underline underline-offset-4 mb-10">Latest News</h3>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Cards for latest news */}
      <Card className="p-4">
        <h4 className="text-xl font-semibold">News Title 1</h4>
        <p className="text-sm text-muted-foreground">Brief description of the news article.</p>                              
      </Card>
      <Card className="p-4">
        <h4 className="text-xl font-semibold">News Title 2</h4>
        <p className="text-sm text-muted-foreground">Brief description of the news article.</p>                              
      </Card>
    </div>
    <h3 className="self-start mt-8 text-2xl font-semibold underline underline-offset-4 mb-10">Popular Reviews</h3>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Cards for popular reviews */}
      <Card className="p-4">
        <h4 className="text-xl font-semibold">Review Title 1</h4>
        <p className="text-sm text-muted-foreground">Brief excerpt of the review.</p>                              
      </Card>
      </div>
    <h3 className="self-start mt-8 text-2xl font-semibold underline underline-offset-4 mb-10">Popular Lists</h3>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Cards for popular lists */}
      <Card className="p-4">
        <h4 className="text-xl font-semibold">List Title 1</h4>
        <p className="text-sm text-muted-foreground">Brief description of the list.</p>                              
      </Card>
      </div>
    <h3 className="self-start mt-8 text-2xl font-semibold underline underline-offset-4 mb-10">Top Members</h3>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Cards for top members */}
      <Card className="p-4">
        <h4 className="text-xl font-semibold">Member Name 1</h4>
        <p className="text
-sm text-muted-foreground">Brief bio of the member.</p>
      </Card>
      </div>
      
    </main>

  );
}
