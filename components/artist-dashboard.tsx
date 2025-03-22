"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import {
  BarChart3Icon,
  DollarSignIcon,
  MusicIcon,
  UsersIcon,
  PlusCircleIcon,
  TrendingUpIcon,
  DownloadIcon,
} from "lucide-react"
import { MusicCard } from "@/components/music-card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function ArtistDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const artistStats = {
    totalEarnings: "2.45 ETH",
    totalSales: 28,
    totalTracks: 12,
    totalFollowers: 156,
  }

  const recentSales = [
    { id: "1", title: "Ethereal Dreams", buyer: "0x1a2...3b4c", price: "0.05 ETH", date: "2 days ago" },
    { id: "2", title: "Digital Horizon", buyer: "0x5e6...7f8g", price: "0.03 ETH", date: "3 days ago" },
    { id: "3", title: "Crypto Sunrise", buyer: "0x9h0...1i2j", price: "0.02 ETH", date: "5 days ago" },
  ]

  const artistTracks = [
    { id: "1", title: "Ethereal Dreams", cover: "/placeholder.svg?height=300&width=300", price: "0.05 ETH", sales: 12 },
    { id: "2", title: "Digital Horizon", cover: "/placeholder.svg?height=300&width=300", price: "0.03 ETH", sales: 8 },
    { id: "3", title: "Crypto Sunrise", cover: "/placeholder.svg?height=300&width=300", price: "0.02 ETH", sales: 5 },
    { id: "4", title: "Web3 Lullaby", cover: "/placeholder.svg?height=300&width=300", price: "0.04 ETH", sales: 3 },
  ]

  const salesData = [
    { name: "Jan", sales: 0.2 },
    { name: "Feb", sales: 0.5 },
    { name: "Mar", sales: 0.3 },
    { name: "Apr", sales: 0.8 },
    { name: "May", sales: 0.4 },
    { name: "Jun", sales: 1.2 },
    { name: "Jul", sales: 0.8 },
  ]

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Artist Dashboard</h1>
          <p className="text-muted-foreground">Manage your music, track sales, and connect with fans</p>
        </div>
        <Link href="/dashboard/upload">
          <Button className="gap-2">
            <PlusCircleIcon className="h-4 w-4" />
            Upload New Track
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artistStats.totalEarnings}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artistStats.totalSales}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tracks</CardTitle>
            <MusicIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artistStats.totalTracks}</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artistStats.totalFollowers}</div>
            <p className="text-xs text-muted-foreground">+24 new followers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracks">My Tracks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Your latest music NFT sales</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentSales.map((sale) => (
                    <li key={sale.id} className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium">{sale.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Purchased by {sale.buyer} • {sale.date}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-primary">{sale.price}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Sales
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Your earnings over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales (ETH)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={salesData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1) / 0.2)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Performing Tracks</h2>
              <Link href="/dashboard/tracks" className="text-primary text-sm hover:underline">
                View all tracks
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {artistTracks.map((track) => (
                <MusicCard
                  key={track.id}
                  track={{
                    ...track,
                    artist: user?.name || "Artist",
                  }}
                  showStats
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tracks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Music NFTs</CardTitle>
              <CardDescription>Manage your music collection on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {artistTracks.map((track) => (
                  <div key={track.id} className="flex items-center gap-4 p-3 rounded-lg border">
                    <img
                      src={track.cover || "/placeholder.svg"}
                      alt={track.title}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{track.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>Price: {track.price}</span>
                        <span>•</span>
                        <span>Sales: {track.sales}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2">
                <PlusCircleIcon className="h-4 w-4" />
                Upload New Track
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Track your music performance and earnings</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  sales: {
                    label: "Sales (ETH)",
                    color: "hsl(var(--chart-1))",
                  },
                  listeners: {
                    label: "Listeners",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { name: "Jan", sales: 0.2, listeners: 45 },
                      { name: "Feb", sales: 0.5, listeners: 78 },
                      { name: "Mar", sales: 0.3, listeners: 56 },
                      { name: "Apr", sales: 0.8, listeners: 120 },
                      { name: "May", sales: 0.4, listeners: 95 },
                      { name: "Jun", sales: 1.2, listeners: 156 },
                      { name: "Jul", sales: 0.8, listeners: 132 },
                    ]}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="sales"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1) / 0.2)"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="listeners"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2) / 0.2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUpIcon className="h-5 w-5 text-primary" />
                  Track Performance
                </CardTitle>
                <CardDescription>How your tracks are performing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {artistTracks.map((track) => (
                    <li key={track.id} className="flex items-center gap-3">
                      <img
                        src={track.cover || "/placeholder.svg"}
                        alt={track.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{track.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {track.sales} sales • {track.price}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-green-500">+{Math.floor(Math.random() * 30)}%</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-primary" />
                  Fan Demographics
                </CardTitle>
                <CardDescription>Where your fans are from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>United States</span>
                    </div>
                    <span className="font-medium">42%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>Europe</span>
                    </div>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Asia</span>
                    </div>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span>Other</span>
                    </div>
                    <span className="font-medium">12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

