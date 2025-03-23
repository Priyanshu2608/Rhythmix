"use client"

import { useState, useEffect } from "react"
import { Music, Upload, BarChart3, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [uploadedMusic, setUploadedMusic] = useState([])
  const [uploadCount, setUploadCount] = useState(0)

  // Fetch uploaded music from localStorage (for demo purposes)
  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem("userUploads") || "[]")
    setUploadedMusic(storedUploads)

    const storedCount = Number.parseInt(localStorage.getItem("uploadCount") || "0")
    setUploadCount(storedCount)

    // Set up an interval to check for updates (for demo purposes)
    const interval = setInterval(() => {
      const updatedUploads = JSON.parse(localStorage.getItem("userUploads") || "[]")
      const updatedCount = Number.parseInt(localStorage.getItem("uploadCount") || "0")

      if (updatedUploads.length !== uploadedMusic.length) {
        setUploadedMusic(updatedUploads)
      }

      if (updatedCount !== uploadCount) {
        setUploadCount(updatedCount)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [uploadCount, uploadedMusic.length])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadCount}</div>
            <p className="text-xs text-muted-foreground">+{uploadCount > 0 ? 1 : 0} from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,664</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234</div>
            <p className="text-xs text-muted-foreground">+18.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Music Library</CardTitle>
            <CardDescription>Manage your uploaded music NFTs</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile">View All</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/upload">Upload New</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedMusic.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-5">Track</div>
                  <div className="col-span-2">Uploaded</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right">Status</div>
                  <div className="col-span-1"></div>
                </div>

                {uploadedMusic.map((track) => (
                  <div
                    key={track.id}
                    className="grid grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors border-t"
                  >
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded overflow-hidden">
                        <Image
                          src={track.coverImage || "/placeholder.svg"}
                          alt={track.title}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{track.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {track.description || "No description"}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-sm">{track.uploadDate}</div>
                    <div className="col-span-2 text-right text-sm">{track.price} ETH</div>
                    <div className="col-span-2 text-right">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Minted
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/marketplace?id=${track.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Music className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Your library is empty</h3>
                <p className="text-muted-foreground">Upload your first track to get started</p>
                <Button asChild className="mt-4">
                  <Link href="/dashboard/upload">Upload Music</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

