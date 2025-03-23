"use client"

import { useState, useEffect } from "react"
import { Music, Upload, BarChart3, Users, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArtistDashboard() {
  const [uploadedMusic, setUploadedMusic] = useState([])
  const [uploadCount, setUploadCount] = useState(0)

  // Simulate fetching user's uploaded music
  useEffect(() => {
    // This would be replaced with your actual API call
    const fetchUploadedMusic = async () => {
      // Check localStorage first (for demo purposes)
      const storedUploads = JSON.parse(localStorage.getItem("userUploads") || "[]")

      // If we have uploads in localStorage, use those
      if (storedUploads.length > 0) {
        // Add mock streams and sales data
        const enhancedUploads = storedUploads.map((upload) => ({
          ...upload,
          streams: Math.floor(Math.random() * 1000) + 100,
          sales: Math.floor(Math.random() * 10) + 1,
        }))

        setUploadedMusic(enhancedUploads)
        setUploadCount(enhancedUploads.length)
      } else {
        // Mock data - replace with actual API call
        const mockData = [
          {
            id: 1,
            title: "Ethereal Dreams",
            coverImage: "/placeholder.svg?height=100&width=100",
            artist: "Your Artist Name",
            duration: "3:45",
            uploadDate: "2023-05-15",
            streams: 1245,
            sales: 5,
          },
          {
            id: 2,
            title: "Digital Horizon",
            coverImage: "/placeholder.svg?height=100&width=100",
            artist: "Your Artist Name",
            duration: "4:20",
            uploadDate: "2023-06-22",
            streams: 876,
            sales: 3,
          },
          {
            id: 3,
            title: "Blockchain Beats",
            coverImage: "/placeholder.svg?height=100&width=100",
            artist: "Your Artist Name",
            duration: "2:55",
            uploadDate: "2023-07-10",
            streams: 543,
            sales: 2,
          },
        ]

        setUploadedMusic(mockData)
        setUploadCount(mockData.length)
      }
    }

    fetchUploadedMusic()

    // Check local storage for upload count (for demo purposes)
    const storedCount = Number.parseInt(localStorage.getItem("uploadCount") || "0")
    if (storedCount > 0) {
      setUploadCount(storedCount)
    }

    // Set up an interval to check for updates (for demo purposes)
    const interval = setInterval(() => {
      const storedCount = Number.parseInt(localStorage.getItem("uploadCount") || "0")
      const storedUploads = JSON.parse(localStorage.getItem("userUploads") || "[]")

      if (storedCount > uploadCount || (storedUploads.length > 0 && storedUploads.length !== uploadedMusic.length)) {
        // Refresh data
        fetchUploadedMusic()
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

      <Tabs defaultValue="my-music">
        <TabsList>
          <TabsTrigger value="my-music">My Music</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="my-music" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Music</CardTitle>
                <CardDescription>Manage your uploaded music NFTs</CardDescription>
              </div>
              <Button asChild>
                <Link href="/dashboard/upload">Upload New</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedMusic.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground">
                      <div className="col-span-5">Track</div>
                      <div className="col-span-2">Uploaded</div>
                      <div className="col-span-2 text-right">Streams</div>
                      <div className="col-span-2 text-right">Sales</div>
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
                            <div className="text-sm text-muted-foreground">{track.duration}</div>
                          </div>
                        </div>
                        <div className="col-span-2 text-sm">{track.uploadDate}</div>
                        <div className="col-span-2 text-right text-sm">{track.streams || 0}</div>
                        <div className="col-span-2 text-right text-sm">{track.sales || 0}</div>
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
                    <h3 className="mt-4 text-lg font-medium">No music uploaded yet</h3>
                    <p className="text-muted-foreground">Upload your first track to get started</p>
                    <Button asChild className="mt-4">
                      <Link href="/dashboard/upload">Upload Music</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Track your music performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Upload Statistics</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{uploadCount}</div>
                        <p className="text-xs text-muted-foreground">+{uploadCount > 0 ? 1 : 0} from last month</p>
                        <div className="mt-4 h-[60px] w-full bg-muted rounded-md flex items-end">
                          {Array.from({ length: uploadCount > 0 ? uploadCount : 1 }).map((_, i) => (
                            <div
                              key={i}
                              className="bg-primary w-full h-[30%] rounded-sm mx-[1px]"
                              style={{
                                height: `${Math.max(30, Math.min(90, 30 + i * 15))}%`,
                              }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Growth Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <div className="text-2xl font-bold">+{uploadCount}</div>
                          <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-xs text-muted-foreground">Steady growth in your catalog</p>
                        <div className="mt-4 h-[60px] w-full bg-muted rounded-md"></div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Top Performing Tracks</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground">
                      <div className="col-span-6">Track</div>
                      <div className="col-span-2 text-right">Streams</div>
                      <div className="col-span-2 text-right">Sales</div>
                      <div className="col-span-2 text-right">Revenue</div>
                    </div>

                    {uploadedMusic
                      .sort((a, b) => b.streams - a.streams)
                      .map((track) => (
                        <div
                          key={track.id}
                          className="grid grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors border-t"
                        >
                          <div className="col-span-6 flex items-center gap-4">
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
                              <div className="text-sm text-muted-foreground">{track.duration}</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-right text-sm">{track.streams}</div>
                          <div className="col-span-2 text-right text-sm">{track.sales}</div>
                          <div className="col-span-2 text-right text-sm">${(track.sales * 0.05).toFixed(2)}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

