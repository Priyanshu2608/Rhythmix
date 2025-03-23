"use client"

import { cn } from "@/lib/utils"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeXIcon,
  RepeatIcon,
  ShuffleIcon,
  HeartIcon,
} from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Mock current song data
  const currentSong = {
    title: "Afsos",
    artist: "Anuv Jain, AP Dhillon",
    cover: "https://i.ytimg.com/vi/2FhgKp_lfJQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCeQBJFUWZgjYrTQtnTdiO0hMCEzw",
  }

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio()

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
  }, [])

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
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      // In a real app, we would set the audio source here
      // audioRef.current.src = currentSong.audioUrl
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
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
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-2 md:p-4 z-50">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-1/3">
          <img
            src={currentSong.cover || "/placeholder.svg"}
            alt={currentSong.title}
            className="h-12 w-12 rounded-md object-cover"
          />
          <div className="min-w-0">
            <div className="font-medium truncate">{currentSong.title}</div>
            <div className="text-sm text-muted-foreground truncate">{currentSong.artist}</div>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto md:ml-0" onClick={() => setIsLiked(!isLiked)}>
            <HeartIcon className={cn("h-5 w-5", isLiked ? "fill-primary text-primary" : "")} />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-1 w-full md:w-1/3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <ShuffleIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <SkipBackIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={togglePlay}>
              {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForwardIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <RepeatIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleTimeChange}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">{formatTime(duration || 0)}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 w-full md:w-1/3 justify-end">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            <VolumeButtonIcon />
          </Button>
          <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="w-28" />
        </div>
      </div>
    </div>
  )
}

