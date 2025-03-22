"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { PlayIcon, PauseIcon, VolumeIcon, Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpotifyPlayerProps {
  previewUrl: string | null
  trackName: string
  artistName: string
  albumCover: string
  onPlayStateChange?: (isPlaying: boolean) => void
}

export function SpotifyPlayer({
  previewUrl,
  trackName,
  artistName,
  albumCover,
  onPlayStateChange,
}: SpotifyPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    // Set up event listeners
    const audio = audioRef.current

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      if (onPlayStateChange) {
        onPlayStateChange(false)
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    // Clean up
    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
    }
  }, [onPlayStateChange])

  // Update audio source when previewUrl changes
  useEffect(() => {
    if (audioRef.current && previewUrl) {
      audioRef.current.src = previewUrl
      audioRef.current.load()
      setCurrentTime(0)
      setIsPlaying(false)
      if (onPlayStateChange) {
        onPlayStateChange(false)
      }
    }
  }, [previewUrl, onPlayStateChange])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  const togglePlay = () => {
    if (!previewUrl) return

    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }

    setIsPlaying(!isPlaying)
    if (onPlayStateChange) {
      onPlayStateChange(!isPlaying)
    }
  }

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const VolumeButtonIcon = () => {
    if (isMuted || volume === 0) return <VolumeXIcon className="h-5 w-5" />
    if (volume < 30) return <VolumeIcon className="h-5 w-5" />
    if (volume < 70) return <Volume1Icon className="h-5 w-5" />
    return <Volume2Icon className="h-5 w-5" />
  }

  return (
    <div className={cn("flex flex-col gap-2", !previewUrl && "opacity-50 pointer-events-none")}>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
          onClick={togglePlay}
          disabled={!previewUrl}
        >
          {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{trackName}</div>
          <div className="text-sm text-muted-foreground truncate">{artistName}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-8 text-right">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration || 30}
          step={0.1}
          onValueChange={handleTimeChange}
          disabled={!previewUrl}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-8">{formatTime(duration || 30)}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleMute} disabled={!previewUrl}>
          <VolumeButtonIcon />
        </Button>
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          disabled={!previewUrl}
          className="w-24"
        />
      </div>

      {!previewUrl && <div className="text-sm text-muted-foreground mt-2">No preview available for this track</div>}
    </div>
  )
}

