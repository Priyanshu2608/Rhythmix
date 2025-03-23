"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useWallet } from "@/hooks/use-wallet"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle, Loader2, Wallet, AlertCircle, Music } from "lucide-react"
import { mockNFTs } from "@/constants/mock-nfts"
import { mockMusic } from "@/constants/mock-music"

enum PaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SUCCESS = "success",
  FAILED = "failed",
}

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { account, connect, isConnecting } = useWallet()

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.PENDING)
  const [countdown, setCountdown] = useState(5)

  // Get item details from URL params
  const itemType = searchParams.get("type") || "nft"
  const itemId = searchParams.get("id")
  const itemPrice = searchParams.get("price") || "0"
  const itemName = searchParams.get("name") || "Item"
  const artistName = searchParams.get("artist") || ""

  // Find the item in our mock data
  let item: any = null
  let itemImage = ""

  if (itemType === "nft") {
    item = mockNFTs.find((n) => n.id === itemId)
    if (item) {
      itemImage = item.image
    } else {
      itemImage = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(itemName)}`
    }
  } else {
    item = mockMusic.find((m) => m.id === itemId)
    if (item) {
      itemImage = item.image
    } else {
      itemImage = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(itemName)}`
    }
  }

  // Handle payment process
  const processPayment = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to complete this purchase",
        variant: "destructive",
      })
      return
    }

    setPaymentStatus(PaymentStatus.PROCESSING)

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // 90% chance of success (for demo purposes)
      if (Math.random() > 0.1) {
        setPaymentStatus(PaymentStatus.SUCCESS)

        // Redirect after successful payment
        let count = 5
        setCountdown(count)

        const interval = setInterval(() => {
          count -= 1
          setCountdown(count)

          if (count <= 0) {
            clearInterval(interval)
            router.push("/dashboard/marketplace")
          }
        }, 1000)
      } else {
        setPaymentStatus(PaymentStatus.FAILED)
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus(PaymentStatus.FAILED)
    }
  }

  // Connect wallet if not connected
  useEffect(() => {
    if (!account && paymentStatus === PaymentStatus.PENDING) {
      connect()
    }
  }, [account, connect, paymentStatus])

  return (
    <div className="container max-w-md mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
        disabled={paymentStatus === PaymentStatus.PROCESSING}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Button>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
          <CardDescription>
            {itemType === "nft"
              ? "You are about to purchase an NFT using your connected wallet"
              : "You are about to purchase a music track using your connected wallet"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Item Preview */}
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20 rounded-md overflow-hidden">
              <Image src={itemImage || "/placeholder.svg"} alt={itemName} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{itemName}</h3>
              {itemType === "nft" ? (
                <p className="text-sm text-muted-foreground">NFT #{itemId}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{artistName}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price</span>
              <span>{itemPrice} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gas Fee (estimated)</span>
              <span>0.002 ETH</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{(Number.parseFloat(itemPrice) + 0.002).toFixed(3)} ETH</span>
            </div>
          </div>

          {/* Payment Status */}
          {paymentStatus === PaymentStatus.PROCESSING && (
            <div className="bg-muted p-4 rounded-md flex items-center justify-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span>Processing your transaction...</span>
            </div>
          )}

          {paymentStatus === PaymentStatus.SUCCESS && (
            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-md flex items-center space-x-2 text-green-600 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">Payment Successful!</p>
                <p className="text-sm">
                  {itemType === "nft" ? "You now own this NFT!" : "You can now download this track!"}
                </p>
                <p className="text-sm">Redirecting in {countdown} seconds...</p>
              </div>
            </div>
          )}

          {paymentStatus === PaymentStatus.FAILED && (
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-md flex items-center space-x-2 text-red-600 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">Transaction Failed</p>
                <p className="text-sm">Please try again or contact support</p>
              </div>
            </div>
          )}

          {/* Wallet Info */}
          <div className="bg-muted p-4 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5" />
                <span className="font-medium">Payment Wallet</span>
              </div>
              {account ? (
                <span className="text-sm">
                  {account.substring(0, 6)}...{account.substring(account.length - 4)}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">Not connected</span>
              )}
            </div>
          </div>

          {/* Item Type */}
          <div className="bg-muted p-4 rounded-md">
            <div className="flex items-center space-x-2">
              {itemType === "nft" ? (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>NFT Purchase</span>
                </>
              ) : (
                <>
                  <Music className="h-5 w-5" />
                  <span>Music Purchase</span>
                </>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          {paymentStatus === PaymentStatus.PENDING && (
            <Button className="w-full" onClick={processPayment} disabled={!account || isConnecting}>
              {!account ? (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnecting ? "Connecting Wallet..." : "Connect Wallet to Pay"}
                </>
              ) : (
                `Pay ${(Number.parseFloat(itemPrice) + 0.002).toFixed(3)} ETH`
              )}
            </Button>
          )}

          {paymentStatus === PaymentStatus.PROCESSING && (
            <Button className="w-full" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Payment
            </Button>
          )}

          {paymentStatus === PaymentStatus.SUCCESS && (
            <Button className="w-full" variant="outline" onClick={() => router.push("/dashboard/marketplace")}>
              Return to Marketplace
            </Button>
          )}

          {paymentStatus === PaymentStatus.FAILED && (
            <Button className="w-full" onClick={() => setPaymentStatus(PaymentStatus.PENDING)}>
              Try Again
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

