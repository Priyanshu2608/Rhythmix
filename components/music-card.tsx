import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PlayIcon, HeartIcon, MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MusicCardProps {
  track: {
    id: string
    title: string
    artist: string
    cover: string
    price: string
    sales?: number
  }
  showStats?: boolean
  className?: string
}

export function MusicCard({ track, showStats = false, className }: MusicCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <div className="relative aspect-square overflow-hidden group">
        <img
          src={track.cover || "/placeholder.svg"}
          alt={track.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="icon" variant="secondary" className="rounded-full">
            <PlayIcon className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full">
            <HeartIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link href={`/dashboard/track/${track.id}`} className="font-medium hover:underline line-clamp-1">
            {track.title}
          </Link>
          <Link
            href={`/dashboard/artist/${track.artist.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            {track.artist}
          </Link>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="font-medium text-primary">{track.price}</div>
        {showStats && track.sales !== undefined ? (
          <div className="text-sm text-muted-foreground">{track.sales} sales</div>
        ) : (
          <Button variant="ghost" size="icon">
            <MoreHorizontalIcon className="h-5 w-5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

