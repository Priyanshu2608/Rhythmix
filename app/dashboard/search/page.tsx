"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"


export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState("track")
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}&type=${searchType}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Search</h1>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for tracks, artists, or albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      <Tabs defaultValue="track" onValueChange={setSearchType}>
        <TabsList>
          <TabsTrigger value="track">Tracks</TabsTrigger>
          <TabsTrigger value="artist">Artists</TabsTrigger>
          <TabsTrigger value="album">Albums</TabsTrigger>
        </TabsList>

        <TabsContent value="track" className="mt-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : results?.tracks ? (
            <div className="space-y-2">
              {results.tracks.items.length > 0 ? (
                results.tracks.items.map((track: any) => (
                  <Link
                    key={track.id}
                    href={`/dashboard/track/${track.id}`}
                    className="flex items-center p-2 hover:bg-muted/50 rounded-md"
                  >
                    <div className="w-12 h-12 relative mr-3">
                      {track.album.images && track.album.images[0] ? (
                        <Image
                          src={track.album.images[0].url || "/placeholder.svg"}
                          alt={track.album.name}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center rounded">
                          <span className="text-lg">🎵</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{track.name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {track.artists.map((artist: any) => artist.name).join(", ")}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground hidden md:block">{track.album.name}</div>
                  </Link>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No tracks found</p>
              )}
            </div>
          ) : query ? (
            <p className="text-center py-4 text-muted-foreground">Search for tracks</p>
          ) : null}
        </TabsContent>

        <TabsContent value="artist" className="mt-4">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
            </div>
          ) : results?.artists ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.artists.items.length > 0 ? (
                results.artists.items.map((artist: any) => (
                  <a
                    key={artist.id}
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                      <div className="aspect-square relative">
                        {artist.images && artist.images[0] ? (
                          <Image
                            src={artist.images[0].url || "/placeholder.svg"}
                            alt={artist.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-4xl">👤</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium truncate">{artist.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {artist.followers.total.toLocaleString()} followers
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground col-span-full">No artists found</p>
              )}
            </div>
          ) : query ? (
            <p className="text-center py-4 text-muted-foreground">Search for artists</p>
          ) : null}
        </TabsContent>

        <TabsContent value="album" className="mt-4">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
            </div>
          ) : results?.albums ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.albums.items.length > 0 ? (
                results.albums.items.map((album: any) => (
                  <a
                    key={album.id}
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                      <div className="aspect-square relative">
                        {album.images && album.images[0] ? (
                          <Image
                            src={album.images[0].url || "/placeholder.svg"}
                            alt={album.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-4xl">💿</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium truncate">{album.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {album.artists.map((artist: any) => artist.name).join(", ")}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground col-span-full">No albums found</p>
              )}
            </div>
          ) : query ? (
            <p className="text-center py-4 text-muted-foreground">Search for albums</p>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  )
}

