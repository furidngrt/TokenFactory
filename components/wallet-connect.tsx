"use client"

import { useState, useEffect } from "react"
import { Loader2, LogOut, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { connectWallet, disconnectWallet } from "@/lib/wallet-service"
import { useToast } from "@/hooks/use-toast"

export function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const { address, isConnected, setWalletState } = useWalletStore()
  const { toast } = useToast()

  useEffect(() => {
    // Check if wallet is already connected (e.g. from localStorage or browser extension)
    const checkConnection = async () => {
      try {
        const ethereum = (window as any).ethereum
        if (ethereum && ethereum.selectedAddress) {
          setWalletState({
            address: ethereum.selectedAddress,
            isConnected: true,
          })
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }

    checkConnection()
  }, [setWalletState])

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      const walletAddress = await connectWallet()
      setWalletState({
        address: walletAddress,
        isConnected: true,
      })
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully",
      })
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnectWallet()
      setWalletState({
        address: undefined,
        isConnected: false,
      })
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      })
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  function formatAddress(address: string) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-customBlue hover:bg-customBlue/90 text-white shadow-md hover:shadow-lg transition-all"
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-customBlue/20 bg-white hover:bg-customBlue/10 hover:text-customBlue shadow-sm"
        >
          <Wallet className="mr-2 h-4 w-4 text-customBlue" />
          {address ? formatAddress(address) : "Connected"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-customBlue/20 bg-white shadow-lg">
        <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer hover:bg-customBlue/10 text-gray-700"
          onClick={() => {
            if (address) {
              navigator.clipboard.writeText(address)
              toast({
                title: "Address Copied",
                description: "Wallet address copied to clipboard",
              })
            }
          }}
        >
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-500 focus:text-red-500 hover:bg-red-50"
          onClick={handleDisconnect}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

