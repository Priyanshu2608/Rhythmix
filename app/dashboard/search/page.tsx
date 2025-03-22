"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchIcon, Loader2Icon } from "lucide-react"
import { SpotifyTrackList } from "@/components/spotify-track-list"
import { search } from "@/lib/spotify"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any>({
    tracks: { items: [] },
    artists: { items: [] },
    albums: { items: [] },
    playlists: { items: [] },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("tracks")
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const results = await search(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error("Search error:", error)
      setError("Failed to search. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Search</h1>
        <p className="text-muted-foreground">Search for your favorite songs, artists, albums, and playlists</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2Icon className="h-4 w-4 animate-spin mr-2" /> : null}
          Search
        </Button>
      </form>

      {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

      {(searchResults.tracks.items.length > 0 ||
        searchResults.artists.items.length > 0 ||
        searchResults.albums.items.length > 0 ||
        searchResults.playlists.items.length > 0) && (
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tracks">Tracks ({searchResults.tracks.items.length})</TabsTrigger>
            <TabsTrigger value="artists">Artists ({searchResults.artists.items.length})</TabsTrigger>
            <TabsTrigger value="albums">Albums ({searchResults.albums.items.length})</TabsTrigger>
            <TabsTrigger value="playlists">Playlists ({searchResults.playlists.items.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="tracks" className="mt-6">
            <SpotifyTrackList tracks={searchResults.tracks.items} />
          </TabsContent>

          <TabsContent value="artists" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.artists.items.map((artist: any) => (
                <div key={artist.id} className="flex flex-col items-center text-center">
                  <div className="h-32 w-32 rounded-full overflow-hidden mb-2">
                    <img
                      src={artist.images[0]?.url || "/placeholder.svg?height=128&width=128"}
                      alt={artist.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="font-medium">{artist.name}</div>
                  <div className="text-sm text-muted-foreground">Artist</div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="albums" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.albums.items.map((album: any) => (
                <div key={album.id} className="flex flex-col">
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
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.playlists.items.map((playlist: any) => (
                <div key={playlist.id} className="flex flex-col">
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
          </TabsContent>
        </Tabs>
      )}

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading &&
        searchQuery &&
        !searchResults.tracks.items.length &&
        !searchResults.artists.items.length &&
        !searchResults.albums.items.length &&
        !searchResults.playlists.items.length && (
          <div className="text-center py-12">
            <div className="text-lg font-medium">No results found</div>
            <p className="text-muted-foreground">Try searching for something else</p>
          </div>
        )}

      {!searchQuery && !isLoading && (
        <div className="text-center py-12">
          <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <div className="text-lg font-medium">Search for music</div>
          <p className="text-muted-foreground">Find your favorite songs, artists, albums, and playlists</p>
        </div>
      )}
    </div>
  )
}

