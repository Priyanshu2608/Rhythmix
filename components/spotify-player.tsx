"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSpotifyAuth } from "@/hooks/use-spotify-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from "react-icons/fa"

interface SpotifyPlayerProps {
  trackId?: string
}

export default function SpotifyPlayer({ trackId = "" }: SpotifyPlayerProps) {
  const { accessToken, isLoading, error } = useSpotifyAuth()
  const [track, setTrack] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0)
  const [volume, setVolume] = useState(50)

  useEffect(() => {
    if (!accessToken || !trackId) return

    const fetchTrack = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch track")
        }

        const data = await response.json()
        setTrack(data)
      } catch (err) {
        console.error("Error fetching track:", err)
      }
    }

    fetchTrack()
  }, [accessToken, trackId])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseInt(e.target.value))
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-2 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center py-4">
            <p className="text-red-500">Error: {error}</p>
            <p className="mt-2">Please log in with Spotify to use the player</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!track) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center py-4">
            <p>No track selected</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={track.album?.images[0]?.url || "/placeholder.svg"}
            alt={track.name}
            className="h-16 w-16 rounded-md object-cover"
          />
          <div>
            <h3 className="font-medium line-clamp-1">{track.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {track.artists?.map((artist: any) => artist.name).join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div className="absolute h-full bg-primary" style={{ width: `${trackProgress}%` }}></div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0:00</span>
            <span>
              {Math.floor(track.duration_ms / 60000)}:
              {String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <FaBackward className="h-4 w-4" />
          </Button>
          <Button onClick={togglePlay} variant="default" size="icon" className="h-12 w-12 rounded-full">
            {isPlaying ? <FaPause className="h-5 w-5" /> : <FaPlay className="h-5 w-5 ml-1" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <FaForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <FaVolumeUp className="h-4 w-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </CardContent>
    </Card>
  )
}

