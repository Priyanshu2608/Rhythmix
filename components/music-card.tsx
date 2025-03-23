"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface MusicTrack {
  id: string
  title: string
  artist: string
  genre: string
  image: string
  price: string
  language: string
}

interface MusicCardProps {
  track: MusicTrack
  account: string | null
}

export function MusicCard({ track, account }: MusicCardProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleBuyMusic = () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase this track",
        variant: "destructive",
      })
      return
    }

    // Redirect to payment page with music details
    router.push(
      `/dashboard/marketplace/payment?type=music&id=${track.id}&price=${track.price}&name=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}`,
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image src={track.image || "/placeholder.svg"} alt={track.title} fill className="object-cover" />
          <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/70">{track.price} ETH</Badge>
          <Badge className="absolute top-2 left-2 bg-primary/80 hover:bg-primary/80">{track.language}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold">{track.title}</h3>
        <p className="text-sm text-muted-foreground">{track.artist}</p>
        <p className="text-xs text-muted-foreground mt-1">{track.genre}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button onClick={handleBuyMusic} className="w-full">
          Buy Now
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setIsFavorite(!isFavorite)}>
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  )
}
