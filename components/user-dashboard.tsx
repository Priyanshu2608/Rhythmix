"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useAuth } from "@/context/auth-context"
import { PlayIcon, HeartIcon, TrendingUpIcon, WalletIcon, Loader2Icon } from "lucide-react"
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

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">Discover, collect, and enjoy music on the blockchain</p>
        </div>
        <Link href="/dashboard/marketplace">
          <Button>Browse Marketplace</Button>
        </Link>
      </div>

      {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="collection">My Collection</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Featured Artists</h2>
                <Link href="/dashboard/artists" className="text-primary text-sm hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {featuredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">New Releases</h2>
                <Link href="/dashboard/browse" className="text-primary text-sm hover:underline">
                  View all
                </Link>
              </div>
              <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex gap-4">
                  {newReleases.map((album) => (
                    <div key={album.id} className="w-[200px] flex-shrink-0">
                      <div className="aspect-square rounded-md overflow-hidden mb-2">
                        <img
                          src={album.images[0]?.url || "/placeholder.svg?height=200&width=200"}
                          alt={album.name}
                          className="h-full w-full object-cover"
                        />
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
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Featured Playlists</h2>
                <Link href="/dashboard/playlists" className="text-primary text-sm hover:underline">
                  View all
                </Link>
              </div>
              <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex gap-4">
                  {featuredPlaylists.map((playlist) => (
                    <div key={playlist.id} className="w-[200px] flex-shrink-0">
                      <div className="aspect-square rounded-md overflow-hidden mb-2">
                        <img
                          src={playlist.images[0]?.url || "/placeholder.svg?height=200&width=200"}
                          alt={playlist.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium truncate">{playlist.name}</div>
                      <div className="text-sm text-muted-foreground truncate">By {playlist.owner.display_name}</div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="h-5 w-5 text-primary" />
                    Top Charts
                  </CardTitle>
                  <CardDescription>The most popular tracks this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {newReleases.slice(0, 4).map((album, index) => (
                      <li key={album.id} className="flex items-center gap-3">
                        <span className="font-bold text-muted-foreground w-5">{index + 1}</span>
                        <img
                          src={album.images[0]?.url || "/placeholder.svg?height=40&width=40"}
                          alt={album.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{album.name}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {album.artists.map((a: any) => a.name).join(", ")}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <PlayIcon className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Charts
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartIcon className="h-5 w-5 text-primary" />
                    Recently Played
                  </CardTitle>
                  <CardDescription>Your listening history</CardDescription>
                </CardHeader>
                <CardContent>
                  {listeningHistory.length > 0 ? (
                    <ul className="space-y-4">
                      {listeningHistory.slice(0, 4).map((track) => (
                        <li key={track.id} className="flex items-center gap-3">
                          <img
                            src={track.albumCover || "/placeholder.svg?height=40&width=40"}
                            alt={track.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate">{track.name}</div>
                            <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                          </div>
                          <Button variant="ghost" size="icon" className="ml-auto">
                            <PlayIcon className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">No listening history yet</div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View History
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-6">
            {recommendations.length > 0 ? (
              <SpotifyTrackList tracks={recommendations} title="Recommended For You" />
            ) : (
              <RecommendedTracks />
            )}
          </TabsContent>

          <TabsContent value="collection" className="space-y-6">
            {favorites.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Your Favorites</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {favorites.map((track) => (
                    <div key={track.id} className="flex flex-col">
                      <div className="aspect-square rounded-md overflow-hidden mb-2">
                        <img
                          src={track.albumCover || "/placeholder.svg?height=200&width=200"}
                          alt={track.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium truncate">{track.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground p-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <WalletIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your collection is empty</h3>
                <p className="text-muted-foreground mb-4">Start collecting music NFTs to build your personal library</p>
                <Button asChild>
                  <Link href="/dashboard/marketplace">Browse Marketplace</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

