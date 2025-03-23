"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NFTCard } from "@/components/nft-card"
import { MusicCard } from "@/components/music-card"
import { ConnectWallet } from "@/components/connect-wallet"
import { useWallet } from "@/hooks/use-wallet"
import { mockNFTs } from "@/constants/mock-nfts"
import { mockMusic } from "@/constants/mock-music"

export default function MarketplacePage() {
  const { account, connect, disconnect, isConnecting } = useWallet()
  const [activeTab, setActiveTab] = useState("music")

  return (
    <div className="flex flex-col p-6 space-y-6 pb-20"> {/* Added pb-20 to prevent overlap */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Discover, collect, and buy music and NFTs</p>
        </div>
        <ConnectWallet account={account} connect={connect} disconnect={disconnect} isConnecting={isConnecting} />
      </div>

      <Tabs defaultValue="music" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="collections" className="hidden md:block">
            Collections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="music" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockMusic.map((track) => (
              <MusicCard key={track.id} track={track} account={account} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nfts" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} account={account} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collections" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative aspect-[2/1]">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=Collection+${i + 1}`}
                      alt={`Collection ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold">Collection {i + 1}</h3>
                  <p className="text-sm text-muted-foreground">By Creator Name</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <span className="text-sm">10 items</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
