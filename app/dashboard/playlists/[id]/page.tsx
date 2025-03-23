
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { Suspense } from "react"
import { formatDistanceToNow } from "date-fns"

// Loading component for Suspense
function LoadingPlaylist() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Skeleton className="h-64 w-64 flex-shrink-0" />
        <div className="space-y-4 flex-1">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}

// Format duration from ms to mm:ss
function formatDuration(ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

// Component to display playlist details
async function PlaylistDetail({ id }: { id: string }) {
  const playlist = await fetchPlaylistById(id)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="h-64 w-64 flex-shrink-0 relative">
          {playlist.images && playlist.images[0] ? (
            <Image
              src={playlist.images[0].url || "/placeholder.svg"}
              alt={playlist.name}
              fill
              className="object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center rounded-md">
              <span className="text-6xl">🎵</span>
            </div>
          )}
        </div>

        <div className="space-y-4 flex-1">
          <h1 className="text-3xl font-bold">{playlist.name}</h1>
          {playlist.description && <p className="text-muted-foreground">{playlist.description}</p>}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>By {playlist.owner.display_name}</span>
            <span>•</span>
            <span>{playlist.tracks.total} tracks</span>
            {playlist.followers && (
              <>
                <span>•</span>
                <span>{playlist.followers.total} followers</span>
              </>
            )}
          </div>
          {playlist.public !== undefined && (
            <div className="text-sm text-muted-foreground">
              {playlist.public ? "Public playlist" : "Private playlist"}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tracks</h2>
        <div className="space-y-2">
          {playlist.tracks.items.map((item: any, index: number) => {
            const track = item.track
            if (!track) return null // Skip null tracks

            return (
              <div key={`${track.id}-${index}`} className="flex items-center p-2 hover:bg-muted/50 rounded-md">
                <div className="w-10 text-center text-muted-foreground">{index + 1}</div>
                <div className="w-10 h-10 relative mr-3">
                  {track.album.images && track.album.images[0] ? (
                    <Image
                      src={track.album.images[0].url || "/placeholder.svg"}
                      alt={track.album.name}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center rounded">
                      <span className="text-lg">🎵</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{track.name}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {track.artists.map((artist: any) => artist.name).join(", ")}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground hidden md:block">{track.album.name}</div>
                <div className="w-16 text-right text-sm text-muted-foreground">{formatDuration(track.duration_ms)}</div>
                {item.added_at && (
                  <div className="w-32 text-right text-sm text-muted-foreground hidden lg:block">
                    {formatDistanceToNow(new Date(item.added_at), { addSuffix: true })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function PlaylistPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-6">
      <Suspense fallback={<LoadingPlaylist />}>
        <PlaylistDetail id={params.id} />
      </Suspense>
    </div>
  )
}

