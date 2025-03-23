"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, Copy, LogOut, ExternalLink } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ConnectWalletProps {
  account: string | null
  connect: () => Promise<void>
  disconnect: () => void
  isConnecting: boolean
}

export function ConnectWallet({ account, connect, disconnect, isConnecting }: ConnectWalletProps) {
  const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)
      toast({
        description: "Address copied to clipboard",
      })
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const viewOnEtherscan = () => {
    if (account) {
      window.open(`https://etherscan.io/address/${account}`, "_blank")
    }
  }

  if (!account) {
    return (
      <Button onClick={connect} disabled={isConnecting}>
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Wallet className="mr-2 h-4 w-4" />
          {formatAddress(account)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={viewOnEtherscan}>
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Etherscan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect}>
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}