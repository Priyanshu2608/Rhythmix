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
      title: "Ajab Si",
      artist: "Vishal-Shekhar",
      cover: "https://i.scdn.co/image/ab67616d0000b273675b3f7dea80153c73581e5e",
      price: "0.05 ETH",
    },
    {
      id: "2",
      title: "Tumse Milke Dil Ka",
      artist: "Sonu Nigam",
      cover: "https://i.scdn.co/image/ab67616d0000b273e7fa423de639247fed12be4a",
      price: "0.03 ETH",
    },
    {
      id: "3",
      title: "Pehli Baar",
      artist: "Ajay Gogavale",
      cover: "https://i.scdn.co/image/ab67616d0000b273757a24699f13a78d2d207aa8",
      price: "0.02 ETH",
    },
    {
      id: "4",
      title: "Voh Dekhnay Mein",
      artist: "Ali Zafar",
      cover: "https://i.scdn.co/image/ab6761610000e5eb4a63849116405206fce30002",
      price: "0.04 ETH",
    },
    {
      id: "5",
      title: "Kuch To Hua Hai",
      artist: "Shankar-Ehsaan-Loy",
      cover: "https://i.scdn.co/image/ab6761610000e5eb3db0499a689aa9b4a47ebba3",
      price: "0.06 ETH",
    },
    {
      id: "6",
      title: "Excuses",
      artist: "AP Dhillon",
      cover: "https://c.saavncdn.com/890/Excuses-English-2021-20210930112054-500x500.jpg",
      price: "0.03 ETH",
    },
    {
      id: "7",
      title: "Paro",
      artist: "Aditya Rikhari",
      cover: "https://c.saavncdn.com/121/Paaro-Hindi-2024-20240402130143-500x500.jpg",
      price: "0.04 ETH",
    },
    {
      id: "8",
      title: "Departure Lane  ",
      artist: "Talha Anjum",
      cover: "https://i.ytimg.com/vi/25cpx_ThZhg/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AGGCYAC0AWKAgwIABABGCIgaShyMA8=&rs=AOn4CLByCYgnxvJU6NGqVp9KXdx4F0eYiQ",
      price: "0.05 ETH",
    },
    {
      id: "9",
      title: "Tension",
      artist: "Diljit Dosanjh", 
      cover: "https://i.ytimg.com/vi/-Df32w9xINY/maxresdefault.jpg",
      price: "0.07 ETH",
    },
    {
      id: "10",
      title: "Marham",
      artist: "Rochak Kohli, Aditya Rikhari",
      cover: "https://i.scdn.co/image/ab67616d0000b273bc98190edf344c78cc20818b",
      price: "0.08 ETH",
    },
    {
      id: "11",
      title: "Chaand Sifarish",
      artist: "Shaan",
      cover: "https://upload.wikimedia.org/wikipedia/en/6/6e/Chand_Sifarish.webp",
      price: "0.04 ETH",
    },
    {
      id: "12",
      title: "Ek Tarfa",
      artist: "Darshan Raval",
      cover: "https://c.saavncdn.com/333/Ek-Tarfa-Reprise-Hindi-2020-20200805081615-500x500.jpg",
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

