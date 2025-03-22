"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth-context"
import { 
  PlayIcon, 
  HeartIcon, 
  TrendingUpIcon, 
  WalletIcon, 
  Loader2Icon, 
  MusicIcon, 
  PlusCircleIcon,
  SparklesIcon,
  ListMusicIcon,
  DiscIcon
} from "lucide-react"
import { ArtistCard } from "@/components/artist-card"
import { RecommendedTracks } from "@/components/recommended-tracks"
import { SpotifyTrackList } from "@/components/spotify-track-list"
import { getNewReleases, getFeaturedPlaylists, getRecommendations } from "@/lib/spotify"
import { getHistory, getFavorites } from "@/services/user-service"

export function UserDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("discover")
  const [newReleases, setNewReleases] = useState<any[]>([])
  const [featuredPlaylists, setFeaturedPlaylists] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [listeningHistory, setListeningHistory] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data for artists
  const featuredArtists = [
    { id: "1", name: "Cosmic Harmony", genre: "Electronic", image: "/placeholder.svg?height=300&width=300" },
    { id: "2", name: "Digital Dreamers", genre: "Ambient", image: "/placeholder.svg?height=300&width=300" },
    { id: "3", name: "Blockchain Beats", genre: "Hip Hop", image: "/placeholder.svg?height=300&width=300" },
    { id: "4", name: "Crypto Collective", genre: "Jazz", image: "/placeholder.svg?height=300&width=300" },
    { id: "5", name: "NFT Noise", genre: "Experimental", image: "/placeholder.svg?height=300&width=300" },
    { id: "6", name: "Token Tunes", genre: "Chill", image: "/placeholder.svg?height=300&width=300" },
    { id: "7", name: "Decentralized DJs", genre: "House", image: "/placeholder.svg?height=300&width=300" },
    { id: "8", name: "Web3 Waves", genre: "Techno", image: "/placeholder.svg?height=300&width=300" },
  ]

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch data from Spotify API
        const [newReleasesData, featuredPlaylistsData] = await Promise.all([
          getNewReleases(10),
          getFeaturedPlaylists(5),
        ])

        setNewReleases(newReleasesData.albums.items)
        setFeaturedPlaylists(featuredPlaylistsData.playlists.items)

        // Fetch user-specific data if logged in
        if (user) {
          const [historyData, favoritesData] = await Promise.all([getHistory(user.id), getFavorites(user.id)])

          setListeningHistory(historyData)
          setFavorites(favoritesData)

          // Get recommendations based on user's history or favorites
          if (historyData.length > 0 || favoritesData.length > 0) {
            const seedTracks = [
              ...historyData.slice(0, 2).map((track: any) => track.spotifyId),
              ...favoritesData.slice(0, 3).map((track: any) => track.spotifyId),
            ].slice(0, 5)

            if (seedTracks.length > 0) {
              const recommendationsData = await getRecommendations([], seedTracks, [], 10)
              setRecommendations(recommendationsData.tracks)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setError("Failed to load some content. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4,5,6,7,8].map((i) => (
            <Skeleton key={i} className="h-32 w-32 rounded-md flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 md:p-8 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Welcome back, <span className="text-primary">{user?.name}</span>
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Discover, collect, and enjoy music on the blockchain. Your personal music NFT experience starts here.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/marketplace">
              <Button className="gap-2">
                <SparklesIcon className="h-4 w-4" />
                Browse Marketplace
              </Button>
            </Link>
            <Button variant="outline" className="gap-2">
              <PlusCircleIcon className="h-4 w-4" />
              Create Collection
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-4 rounded-lg border border-destructive/20 flex items-center">
          <span className="mr-2">⚠️</span>
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-8">
          <LoadingSkeleton />
        </div>
      ) : (
        <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-background sticky top-0 z-10 pt-2 pb-4 backdrop-blur-sm">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="discover" className="flex items-center gap-2">
                <DiscIcon className="h-4 w-4" />
                <span>Discover</span>
              </TabsTrigger>
              <TabsTrigger value="recommended" className="flex items-center gap-2">
                <SparklesIcon className="h-4 w-4" />
                <span>Recommended</span>
              </TabsTrigger>
              <TabsTrigger value="collection" className="flex items-center gap-2">
                <ListMusicIcon className="h-4 w-4" />
                <span>My Collection</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="discover" className="space-y-8 mt-2">
            {/* Featured Artists */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <MusicIcon className="h-5 w-5 text-primary" />
                  Featured Artists
                </h2>
                <Link href="/dashboard/artists" className="text-primary text-sm font-medium hover:underline">
                  View all artists
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {featuredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>

            {/* New Releases */}
            <section>
              <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex gap-6">
                  {newReleases.map((album) => (
                    <div key={album.id} className="w-[200px] flex-shrink-0 group">
                      <div className="aspect-square rounded-xl overflow-hidden mb-3 relative group">
                        <img
                          src={album.images[0]?.url || "/placeholder.svg?height=200&width=200"}
                          alt={album.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full">
                            <PlayIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      <div className="font-medium truncate">{album.name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {album.artists.map((a: any) => a.name).join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </section>

            {/* Featured Playlists */}
            

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Charts */}
              

             
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-6 mt-2">
            {recommendations.length > 0 ? (
              <SpotifyTrackList tracks={recommendations} title="Recommended For You" />
            ) : (
              <div className="bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl p-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4">
                  <SparklesIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start exploring music to get personalized recommendations based on your taste
                </p>
                <Button onClick={() => setActiveTab("discover")}>Discover Music</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="collection" className="space-y-6 mt-2">
            {favorites.length > 0 ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <HeartIcon className="h-5 w-5 text-primary" />
                    Your Favorites
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {favorites.map((track) => (
                      <div key={track.id} className="flex flex-col group">
                        <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                          <img
                            src={track.albumCover || "/placeholder.svg?height=200&width=200"}
                            alt={track.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full">
                              <PlayIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                        <div className="font-medium truncate">{track.name}</div>
                        <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border bg-gradient-to-r from-muted/50 to-background p-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <WalletIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your collection is empty</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start collecting music NFTs to build your personal library and enjoy exclusive content
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <Link href="/dashboard/marketplace">Browse Marketplace</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/discover">Explore Trending</Link>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}