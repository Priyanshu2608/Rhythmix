"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"
import { getPlaylist, removeTrackFromPlaylist } from "@/services/user-service"
import { search } from "@/lib/spotify"
import { PlayIcon, PlusIcon, SearchIcon, ArrowLeftIcon, Loader2Icon, TrashIcon } from "lucide-react"

export default function PlaylistDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [playlist, setPlaylist] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    async function fetchPlaylist() {
      if (!user) return

      setIsLoading(true)
      try {
        const playlistData = await getPlaylist(params.id)

        if (!playlistData) {
          setError("Playlist not found")
          return
        }

        // Check if the playlist belongs to the current user
        if (playlistData.userId !== user.id) {
          setError("You don't have permission to view this playlist")
          return
        }

        setPlaylist(playlistData)
      } catch (error) {
        console.error("Error fetching playlist:", error)
        setError("Failed to load playlist")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlaylist()
  }, [user, params.id])

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      const results = await search(searchQuery, "track", 10)
      setSearchResults(results.tracks.items)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleAddToPlaylist = async (track: any) => {
    if (!user || !playlist) return

    try {
      // In a real app, you would call a service to add the track to the playlist
      // For now, we'll just update the UI
      setPlaylist({
        ...playlist,
        tracks: [
          ...playlist.tracks,
          {
            id: track.id,
            name: track.name,
            artist: track.artists.map((a: any) => a.name).join(", "),
            album: track.album.name,
            albumCover: track.album.images[0]?.url || "",
            previewUrl: track.preview_url,
            spotifyId: track.id,
          },
        ],
      })

      // Close the dialog
      setDialogOpen(false)
    } catch (error) {
      console.error("Error adding track to playlist:", error)
    }
  }

  const handleRemoveTrack = async (trackId: string) => {
    if (!user || !playlist) return

    try {
      await removeTrackFromPlaylist(playlist.id, trackId)

      // Update the UI
      setPlaylist({
        ...playlist,
        tracks: playlist.tracks.filter((track: any) => track.id !== trackId),
      })
    } catch (error) {
      console.error("Error removing track from playlist:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 pb-16">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Button>

        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>
      </div>
    )
  }

  if (!playlist) {
    return null
  }

  return (
    <div className="space-y-6 pb-16">
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Playlists
      </Button>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-64 aspect-square bg-muted flex items-center justify-center rounded-md overflow-hidden">
          {playlist.tracks && playlist.tracks.length > 0 ? (
            <img
              src={playlist.tracks[0].albumCover || "/placeholder.svg?height=300&width=300"}
              alt={playlist.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <PlayIcon className="h-16 w-16 mb-2" />
              <span>No tracks yet</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{playlist.name}</h1>
          {playlist.description && <p className="text-muted-foreground mb-4">{playlist.description}</p>}

          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-6">
            <div>{playlist.tracks.length} tracks</div>
            <div>•</div>
            <div>Created {new Date(playlist.createdAt.seconds * 1000).toLocaleDateString()}</div>
          </div>

          <div className="flex gap-2">
            <Button className="gap-2">
              <PlayIcon className="h-4 w-4" />
              Play All
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Add Tracks
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add Tracks to Playlist</DialogTitle>
                  <DialogDescription>Search for tracks to add to "{playlist.name}"</DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search for tracks..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={isSearching}>
                      {isSearching ? <Loader2Icon className="h-4 w-4 animate-spin mr-2" /> : null}
                      Search
                    </Button>
                  </form>

                  {searchResults.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto">
                      {searchResults.map((track) => (
                        <Card key={track.id} className="mb-2">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={track.album.images[0]?.url || "/placeholder.svg?height=48&width=48"}
                                alt={track.album.name}
                                className="h-12 w-12 object-cover rounded-md"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{track.name}</div>
                                <div className="text-sm text-muted-foreground truncate">
                                  {track.artists.map((a: any) => a.name).join(", ")}
                                </div>
                              </div>
                              <Button size="sm" onClick={() => handleAddToPlaylist(track)} className="gap-1">
                                <PlusIcon className="h-4 w-4" />
                                Add
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      {isSearching ? (
                        <Loader2Icon className="h-8 w-8 animate-spin mx-auto mb-2" />
                      ) : searchQuery ? (
                        <>
                          <SearchIcon className="h-8 w-8 mx-auto mb-2" />
                          No results found
                        </>
                      ) : (
                        <>
                          <SearchIcon className="h-8 w-8 mx-auto mb-2" />
                          Search for tracks to add to your playlist
                        </>
                      )}
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Done
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <Separator />

      {playlist.tracks.length > 0 ? (
        <div className="space-y-2">
          {playlist.tracks.map((track: any) => (
            <Card key={track.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={track.albumCover || "/placeholder.svg?height=48&width=48"}
                    alt={track.name}
                    className="h-12 w-12 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{track.name}</div>
                    <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveTrack(track.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-lg font-medium mb-2">This playlist is empty</div>
          <p className="mb-4">Add some tracks to get started</p>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Tracks
          </Button>
        </div>
      )}
    </div>
  )
}

