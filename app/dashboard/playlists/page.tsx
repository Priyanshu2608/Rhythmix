"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { getUserPlaylists, createPlaylist } from "@/services/user-service"
import { PlusIcon, MusicIcon, Loader2Icon } from "lucide-react"

export default function PlaylistsPage() {
  const { user } = useAuth()
  const [playlists, setPlaylists] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    async function fetchPlaylists() {
      if (!user) return

      setIsLoading(true)
      try {
        const userPlaylists = await getUserPlaylists(user.id)
        setPlaylists(userPlaylists)
      } catch (error) {
        console.error("Error fetching playlists:", error)
        setError("Failed to load playlists")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlaylists()
  }, [user])

  const handleCreatePlaylist = async () => {
    if (!user || !newPlaylistName.trim()) return

    setIsCreating(true)
    try {
      const playlistId = await createPlaylist(user.id, newPlaylistName, newPlaylistDescription)

      // Add the new playlist to the list
      setPlaylists([
        ...playlists,
        {
          id: playlistId,
          name: newPlaylistName,
          description: newPlaylistDescription,
          userId: user.id,
          tracks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])

      // Reset form and close dialog
      setNewPlaylistName("")
      setNewPlaylistDescription("")
      setDialogOpen(false)
    } catch (error) {
      console.error("Error creating playlist:", error)
      setError("Failed to create playlist")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Playlists</h1>
          <p className="text-muted-foreground">Create and manage your music playlists</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
              <DialogDescription>Give your playlist a name and description</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="playlist-name">Playlist Name</Label>
                <Input
                  id="playlist-name"
                  placeholder="My Awesome Playlist"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="playlist-description">Description (Optional)</Label>
                <textarea
                  id="playlist-description"
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="What's this playlist about?"
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePlaylist} disabled={isCreating || !newPlaylistName.trim()}>
                {isCreating ? (
                  <>
                    <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create Playlist"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : playlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                {playlist.tracks && playlist.tracks.length > 0 ? (
                  <img
                    src={playlist.tracks[0].albumCover || "/placeholder.svg?height=300&width=300"}
                    alt={playlist.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <MusicIcon className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">{playlist.name}</h3>
                <p className="text-sm text-muted-foreground">{playlist.tracks ? playlist.tracks.length : 0} tracks</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <a href={`/dashboard/playlists/${playlist.id}`}>View Playlist</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-card text-card-foreground p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <MusicIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No playlists yet</h3>
          <p className="text-muted-foreground mb-4">Create your first playlist to organize your favorite music</p>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Playlist
          </Button>
        </div>
      )}
    </div>
  )
}

