"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlayIcon, PauseIcon, HeartIcon, PlusIcon, MoreHorizontalIcon } from "lucide-react"
import { SpotifyPlayer } from "@/components/spotify-player"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"
import { addToFavorites, addToHistory } from "@/services/user-service"
import { cn } from "@/lib/utils"

interface Track {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  preview_url: string | null
  duration_ms: number
}

interface SpotifyTrackListProps {
  tracks: Track[]
  title?: string
  onAddToPlaylist?: (track: Track) => void
}

export function SpotifyTrackList({ tracks, title, onAddToPlaylist }: SpotifyTrackListProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set())
  const { user } = useAuth()

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      // Toggle play/pause for current track
      setIsPlaying(!isPlaying)
    } else {
      // Play new track
      setCurrentTrack(track)
      setIsPlaying(true)

      // Add to history if user is logged in
      if (user) {
        addToHistory(user.id, track.id, {
          name: track.name,
          artist: track.artists.map((a) => a.name).join(", "),
          album: track.album.name,
          albumCover: track.album.images[0]?.url || "",
          previewUrl: track.preview_url,
          spotifyId: track.id,
        }).catch((err) => console.error("Error adding to history:", err))
      }
    }
  }

  const handleLikeTrack = async (track: Track) => {
    if (!user) return

    try {
      const trackId = track.id

      if (likedTracks.has(trackId)) {
        // Remove from liked tracks
        const newLikedTracks = new Set(likedTracks)
        newLikedTracks.delete(trackId)
        setLikedTracks(newLikedTracks)
        // In a real app, you would call a service to remove from favorites
      } else {
        // Add to liked tracks
        const newLikedTracks = new Set(likedTracks)
        newLikedTracks.add(trackId)
        setLikedTracks(newLikedTracks)

        // Add to favorites in Firestore
        await addToFavorites(user.id, trackId, {
          name: track.name,
          artist: track.artists.map((a) => a.name).join(", "),
          album: track.album.name,
          albumCover: track.album.images[0]?.url || "",
          previewUrl: track.preview_url,
          spotifyId: track.id,
        })
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}

      <div className="space-y-2">
        {tracks.map((track) => (
          <Card key={track.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <img
                    src={track.album.images[0]?.url || "/placeholder.svg?height=48&width=48"}
                    alt={track.album.name}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className={cn(
                      "absolute inset-0 h-full w-full rounded-md bg-black/60 opacity-0 hover:opacity-100 transition-opacity",
                      currentTrack?.id === track.id && isPlaying && "opacity-100",
                    )}
                    onClick={() => handlePlayTrack(track)}
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <PauseIcon className="h-5 w-5" />
                    ) : (
                      <PlayIcon className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{track.name}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {track.artists.map((a) => a.name).join(", ")}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">{formatDuration(track.duration_ms)}</div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLikeTrack(track)}
                    className={cn(likedTracks.has(track.id) && "text-red-500")}
                  >
                    <HeartIcon className={cn("h-5 w-5", likedTracks.has(track.id) && "fill-red-500")} />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handlePlayTrack(track)}>
                        {currentTrack?.id === track.id && isPlaying ? "Pause" : "Play"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLikeTrack(track)}>
                        {likedTracks.has(track.id) ? "Remove from Liked" : "Add to Liked"}
                      </DropdownMenuItem>
                      {onAddToPlaylist && (
                        <DropdownMenuItem onClick={() => onAddToPlaylist(track)}>
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add to Playlist
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>View on Spotify</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {currentTrack && (
        <div className="mt-6 p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <img
              src={currentTrack.album.images[0]?.url || "/placeholder.svg?height=80&width=80"}
              alt={currentTrack.album.name}
              className="h-20 w-20 object-cover rounded-md"
            />
            <SpotifyPlayer
              previewUrl={currentTrack.preview_url}
              trackName={currentTrack.name}
              artistName={currentTrack.artists.map((a) => a.name).join(", ")}
              albumCover={currentTrack.album.images[0]?.url || ""}
              onPlayStateChange={setIsPlaying}
            />
          </div>
        </div>
      )}
    </div>
  )
}

