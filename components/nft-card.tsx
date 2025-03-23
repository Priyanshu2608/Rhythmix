"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface NFT {
  id: string
  name: string
  description: string
  image: string
  price: string
  creator: string
  owner: string
}

interface NFTCardProps {
  nft: NFT
  account: string | null
}

export function NFTCard({ nft, account }: NFTCardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleBuyNFT = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase this NFT",
        variant: "destructive",
      })
      return
    }

    // Redirect to payment page with NFT details
    router.push(`/dashboard/marketplace/payment?id=${nft.id}&price=${nft.price}&name=${encodeURIComponent(nft.name)}`)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
          <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/70">{nft.price} ETH</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold">{nft.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{nft.description}</p>
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <span>
            Created by {nft.creator.substring(0, 6)}...{nft.creator.substring(nft.creator.length - 4)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button onClick={handleBuyNFT} disabled={isLoading || account === nft.owner} className="w-full">
          {isLoading ? "Processing..." : account === nft.owner ? "Owned" : "Buy Now"}
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setIsFavorite(!isFavorite)}>
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  )
}

