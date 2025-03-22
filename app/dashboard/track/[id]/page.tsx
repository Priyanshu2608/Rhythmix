"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PlayIcon,
  PauseIcon,
  HeartIcon,
  ShareIcon,
  DownloadIcon,
  ShoppingCartIcon,
  ClockIcon,
  UserIcon,
  HistoryIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function TrackPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Mock data - in a real app, this would be fetched based on the ID
  const track = {
    id: params.id,
    title: "Ethereal Dreams",
    artist: "Cosmic Harmony",
    cover: "/placeholder.svg?height=500&width=500",
    price: "0.05 ETH",
    description:
      "A journey through ambient soundscapes and electronic rhythms. This track explores the intersection of digital and organic elements, creating a unique sonic experience that transcends traditional genre boundaries.",
    genre: "Electronic",
    duration: "3:45",
    releaseDate: "April 15, 2023",
    tokenId: "1234",
    owner: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    creator: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a",
    history: [
      { event: "Minted", price: "0.03 ETH", from: "Cosmic Harmony", to: "Cosmic Harmony", date: "Apr 15, 2023" },
      { event: "Listed", price: "0.05 ETH", from: "Cosmic Harmony", to: "-", date: "Apr 16, 2023" },
    ],
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square rounded-lg overflow-hidden mb-4">
            <img src={track.cover || "/placeholder.svg"} alt={track.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 gap-2" size="lg" onClick={togglePlay}>
              {isPlaying ? (
                <>
                  <PauseIcon className="h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="h-5 w-5" />
                  Play
                </>
              )}
            </Button>
            <Button variant="outline" size="icon" className={cn(isLiked && "text-red-500")} onClick={toggleLike}>
              <HeartIcon className={cn("h-5 w-5", isLiked && "fill-red-500")} />
            </Button>
            <Button variant="outline" size="icon">
              <ShareIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">{track.title}</h1>
            <div className="text-lg text-muted-foreground mb-4">{track.artist}</div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1 text-sm">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span>{track.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>{track.genre}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <HistoryIcon className="h-4 w-4 text-muted-foreground" />
                <span>Released {track.releaseDate}</span>
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-medium">Current Price</div>
                  <div className="text-2xl font-bold text-primary">{track.price}</div>
                </div>
                <Button className="w-full gap-2" size="lg">
                  <ShoppingCartIcon className="h-5 w-5" />
                  Buy Now
                </Button>
              </CardContent>
            </Card>

            <Tabs defaultValue="about">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <p>{track.description}</p>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Token ID</span>
                    <span className="font-medium">{track.tokenId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Contract</span>
                    <span className="font-medium truncate max-w-[200px]">0x1a2...3b4c</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Token Standard</span>
                    <span className="font-medium">ERC-721</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Blockchain</span>
                    <span className="font-medium">Ethereum</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Creator</span>
                    <span className="font-medium truncate max-w-[200px]">
                      {track.creator.substring(0, 6)}...{track.creator.substring(track.creator.length - 4)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Owner</span>
                    <span className="font-medium truncate max-w-[200px]">
                      {track.owner.substring(0, 6)}...{track.owner.substring(track.owner.length - 4)}
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="space-y-4">
                  {track.history.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {item.event === "Minted" ? (
                          <DownloadIcon className="h-5 w-5 text-primary" />
                        ) : (
                          <ShoppingCartIcon className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.event}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.from} {item.to !== "-" ? `→ ${item.to}` : ""}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.price}</div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

