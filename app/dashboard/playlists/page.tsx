import { fetchUserPlaylists } from "@/app/actions/spotify"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

// Loading component for Suspense
function LoadingPlaylists() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-40 w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Component to display playlists
async function PlaylistsGrid() {
  const playlists = await fetchUserPlaylists()

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {playlists.items.map((playlist: any) => (
        <Link key={playlist.id} href={`/dashboard/playlists/${playlist.id}`}>
          <Card className="overflow-hidden h-full transition-all hover:shadow-md">
            <div className="aspect-square relative">
              {playlist.images && playlist.images[0] ? (
                <Image
                  src={playlist.images[0].url || "/placeholder.svg"}
                  alt={playlist.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-4xl">🎵</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium truncate">{playlist.name}</h3>
              <p className="text-sm text-muted-foreground">{playlist.tracks.total} tracks</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default function PlaylistsPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Playlists</h1>
      <p className="text-muted-foreground">Browse and play your Spotify playlists</p>

      <Suspense fallback={<LoadingPlaylists />}>
        <PlaylistsGrid />
      </Suspense>
    </div>
  )
}

