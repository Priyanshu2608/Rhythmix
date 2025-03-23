"use client"

import { useState, useEffect } from "react"
import { Music, Upload, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [uploadedMusic, setUploadedMusic] = useState([])
  const [uploadCount, setUploadCount] = useState(0)

  // Simulate fetching user's uploaded music
  useEffect(() => {
    // Get data from localStorage for demo purposes
    const storedUploads = JSON.parse(localStorage.getItem("userUploads") || "[]")
    const storedCount = Number.parseInt(localStorage.getItem("uploadCount") || "0")

    if (storedUploads.length > 0) {
      setUploadedMusic(storedUploads)
      setUploadCount(storedCount)
    } else {
      // Fallback to mock data if no uploads exist
      const mockData = [
        {
          id: 1,
          title: "Ethereal Dreams",
          coverImage: "/placeholder.svg?height=100&width=100",
          artist: "Your Artist Name",
          price: "0.05",
          description: "A dreamy electronic track",
          duration: "3:45",
          uploadDate: "2023-05-15",
        },
        {
          id: 2,
          title: "Digital Horizon",
          coverImage: "/placeholder.svg?height=100&width=100",
          artist: "Your Artist Name",
          price: "0.08",
          description: "Ambient vibes for relaxation",
          duration: "4:20",
          uploadDate: "2023-06-22",
        },
        {
          id: 3,
          title: "Blockchain Beats",
          coverImage: "/placeholder.svg?height=100&width=100",
          artist: "Your Artist Name",
          price: "0.12",
          description: "Futuristic electronic music",
          duration: "2:55",
          uploadDate: "2023-07-10",
        },
      ]

      setUploadedMusic(mockData)
      setUploadCount(mockData.length)
    }

    // Set up an interval to check for updates
    const interval = setInterval(() => {
      const updatedUploads = JSON.parse(localStorage.getItem("userUploads") || "[]")
      const updatedCount = Number.parseInt(localStorage.getItem("uploadCount") || "0")

      if (updatedUploads.length > 0 && updatedUploads.length !== uploadedMusic.length) {
        setUploadedMusic(updatedUploads)
        setUploadCount(updatedCount)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [uploadedMusic.length])

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image src="/placeholder-user.jpg" alt="Profile" fill className="object-cover" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Artist Name</h2>
                  <p className="text-muted-foreground">artist@example.com</p>
                </div>

                <div className="w-full mt-6">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-3">
                    <div className="flex items-center">
                      <Upload className="mr-2 h-5 w-5 text-primary" />
                      <span>Uploads</span>
                    </div>
                    <span className="font-bold">{uploadCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                      <span>Total Streams</span>
                    </div>
                    <span className="font-bold">1,234</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="my-music">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="my-music">My Music</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="my-music" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Music</CardTitle>
                  <CardDescription>All your uploaded music NFTs appear here</CardDescription>
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
                              <div className="relative w-12 h-12 rounded overflow-hidden mr-4">
                                <Image
                                  src={track.coverImage || "/placeholder.svg"}
                                  alt={track.title}
                                  width={48}
                                  height={48}
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{track.title}</h3>
                                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                  {track.description || "No description"}
                                </p>
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
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Track your music performance</CardDescription>
                </CardHeader>
                <CardContent>
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
                        <CardTitle className="text-sm font-medium">Streams This Month</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <p className="text-xs text-muted-foreground">+22% from last month</p>
                        <div className="mt-4 h-[60px] w-full bg-muted rounded-md"></div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

