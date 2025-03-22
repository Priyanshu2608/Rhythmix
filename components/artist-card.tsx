import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"

interface ArtistCardProps {
  artist: {
    id: string
    name: string
    genre: string
    image: string
  }
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img src={artist.image || "/placeholder.svg"} alt={artist.name} className="object-cover w-full h-full" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link
            href={`/dashboard/artist/${artist.name.replace(/\s+/g, "-").toLowerCase()}`}
            className="font-medium hover:underline line-clamp-1"
          >
            {artist.name}
          </Link>
          <div className="text-sm text-muted-foreground">{artist.genre}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full gap-1">
          <PlusIcon className="h-4 w-4" />
          Follow
        </Button>
      </CardFooter>
    </Card>
  )
}

