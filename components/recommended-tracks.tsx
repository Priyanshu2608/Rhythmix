"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MusicCard } from "@/components/music-card"
import { WalletIcon } from "lucide-react"

export function RecommendedTracks() {
  const [isLoading, setIsLoading] = useState(true)
  const [recommendedTracks, setRecommendedTracks] = useState<any[]>([])

  useEffect(() => {
    // Simulate loading recommendations
    const timer = setTimeout(() => {
      // Mock data - in a real app, this would come from an AI recommendation system
      const mockRecommendations = [
        {
          id: "1",
          title: "Ethereal Dreams",
          artist: "Cosmic Harmony",
          cover: "/placeholder.svg?height=300&width=300",
          price: "0.05 ETH",
        },
        {
          id: "2",
          title: "Digital Horizon",
          artist: "Blockchain Beats",
          cover: "/placeholder.svg?height=300&width=300",
          price: "0.03 ETH",
        },
        {
          id: "3",
          title: "Crypto Sunrise",
          artist: "Digital Dreamers",
          cover: "/placeholder.svg?height=300&width=300",
          price: "0.02 ETH",
        },
        {
          id: "4",
          title: "Web3 Lullaby",
          artist: "Crypto Collective",
          cover: "/placeholder.svg?height=300&width=300",
          price: "0.04 ETH",
        },
        {
          id: "5",
          title: "Decentralized Melody",
          artist: "Cosmic Harmony",
          cover: "/placeholder.svg?height=300&width=300",
          price: "0.06 ETH",
        },
        {
          id: "6",
          title: "Blockchain Blues",
          artist: "Digital Dreamers",
          cover: "/placeholder.svg?height=300&width=300",
          price: "0.03 ETH",
        },
        {
          id: "7",
          title: "NFT Nocturne",
          artist: "Blockchain Beats",
          cover: "/placeholder.svg?height=300&width=300",
          price: "0.04 ETH",
        },
        {
          id: "8",
          title: "Metaverse Melodies",
          artist: "Crypto Collective",
          cover: "/placeholder.svg?height=300&width=300",
          price: "0.05 ETH",
        },
      ]

      setRecommendedTracks(mockRecommendations)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Generating personalized recommendations...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
        <p className="text-muted-foreground mb-6">
          Based on your listening history, we think you'll enjoy these tracks
        </p>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="electronic">Electronic</TabsTrigger>
            <TabsTrigger value="ambient">Ambient</TabsTrigger>
            <TabsTrigger value="hiphop">Hip Hop</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedTracks.map((track) => (
                <MusicCard key={track.id} track={track} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="electronic" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedTracks.slice(0, 4).map((track) => (
                <MusicCard key={track.id} track={track} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ambient" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedTracks.slice(2, 6).map((track) => (
                <MusicCard key={track.id} track={track} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hiphop" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedTracks.slice(4, 8).map((track) => (
                <MusicCard key={track.id} track={track} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How Recommendations Work</CardTitle>
          <CardDescription>Our AI-powered recommendation system analyzes your listening habits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            RHYTHMIX uses advanced machine learning algorithms to analyze your listening history and preferences. The
            more you listen and interact with music on the platform, the more personalized your recommendations become.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <WalletIcon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Listening History</h3>
              <p className="text-sm text-muted-foreground">We analyze the tracks you listen to most frequently</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <WalletIcon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Purchase Patterns</h3>
              <p className="text-sm text-muted-foreground">Your NFT purchases help us understand your taste</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <WalletIcon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Similar Users</h3>
              <p className="text-sm text-muted-foreground">We find users with similar tastes to expand your horizons</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

