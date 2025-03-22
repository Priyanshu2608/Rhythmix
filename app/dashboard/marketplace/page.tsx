"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MusicCard } from "@/components/music-card"
import { SearchIcon, FilterIcon } from "lucide-react"

export default function MarketplacePage() {
  const [priceRange, setPriceRange] = useState([0, 0.5])

  // Mock data
  const nfts = [
    {
      id: "1",
      title: "Ethereal Dreams",
      artist: "Cosmic Harmony",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.05 ETH",
    },
    {
      id: "2",
      title: "Digital Horizon",
      artist: "Blockchain Beats",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.03 ETH",
    },
    {
      id: "3",
      title: "Crypto Sunrise",
      artist: "Digital Dreamers",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.02 ETH",
    },
    {
      id: "4",
      title: "Web3 Lullaby",
      artist: "Crypto Collective",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.04 ETH",
    },
    {
      id: "5",
      title: "Decentralized Melody",
      artist: "Cosmic Harmony",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.06 ETH",
    },
    {
      id: "6",
      title: "Blockchain Blues",
      artist: "Digital Dreamers",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.03 ETH",
    },
    {
      id: "7",
      title: "NFT Nocturne",
      artist: "Blockchain Beats",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.04 ETH",
    },
    {
      id: "8",
      title: "Metaverse Melodies",
      artist: "Crypto Collective",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.05 ETH",
    },
    {
      id: "9",
      title: "Token Tunes",
      artist: "Cosmic Harmony",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.07 ETH",
    },
    {
      id: "10",
      title: "Crypto Concerto",
      artist: "Digital Dreamers",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.08 ETH",
    },
    {
      id: "11",
      title: "Wallet Waltz",
      artist: "Blockchain Beats",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.04 ETH",
    },
    {
      id: "12",
      title: "Ethereum Etude",
      artist: "Crypto Collective",
      cover: "/placeholder.svg?height=300&width=300",
      price: "0.06 ETH",
    },
  ]

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">NFT Marketplace</h1>
        <p className="text-muted-foreground">Discover, collect, and trade music NFTs from artists around the world</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by artist, track, or genre..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Price Range (ETH)</h3>
            <Slider
              value={priceRange}
              max={1}
              step={0.01}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <div className="border rounded-md px-3 py-1">{priceRange[0].toFixed(2)}</div>
              <div className="border rounded-md px-3 py-1">{priceRange[1].toFixed(2)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Genre</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="electronic" className="rounded text-primary" />
                <label htmlFor="electronic">Electronic</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="ambient" className="rounded text-primary" />
                <label htmlFor="ambient">Ambient</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="hiphop" className="rounded text-primary" />
                <label htmlFor="hiphop">Hip Hop</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="jazz" className="rounded text-primary" />
                <label htmlFor="jazz">Jazz</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="rock" className="rounded text-primary" />
                <label htmlFor="rock">Rock</label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Artist Verification</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="verified" className="rounded text-primary" />
                <label htmlFor="verified">Verified Artists</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="all-artists" className="rounded text-primary" />
                <label htmlFor="all-artists">All Artists</label>
              </div>
            </div>
          </div>

          <Button className="w-full">Apply Filters</Button>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New Releases</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="rare">Rare Finds</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.map((nft) => (
                  <MusicCard key={nft.id} track={nft} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.slice(0, 6).map((nft) => (
                  <MusicCard key={nft.id} track={nft} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.slice(3, 9).map((nft) => (
                  <MusicCard key={nft.id} track={nft} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rare" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.slice(6, 12).map((nft) => (
                  <MusicCard key={nft.id} track={nft} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

