"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ChevronDown, Globe, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useNetworkStore } from "@/lib/stores/network-store"
import NETWORKS from "@/lib/networks"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function NetworkSelector() {
  const [open, setOpen] = useState(false)
  const [switchingNetwork, setSwitchingNetwork] = useState(false)
  const [showNetworkDialog, setShowNetworkDialog] = useState(false)
  const [networkToAdd, setNetworkToAdd] = useState<(typeof NETWORKS)[keyof typeof NETWORKS] | null>(null)
  const { selectedNetwork, setSelectedNetwork } = useNetworkStore()
  const { toast } = useToast()

  const networks = Object.values(NETWORKS)

  const handleNetworkSelect = async (network: (typeof NETWORKS)[keyof typeof NETWORKS]) => {
    try {
      setSwitchingNetwork(true)
      const { ethereum } = window as any

      if (!ethereum) {
        toast({
          title: "MetaMask Not Found",
          description: "Please install MetaMask to switch networks",
          variant: "destructive",
        })
        return
      }

      // Check if the network already exists in MetaMask
      const chainId = await ethereum.request({ method: "eth_chainId" })

      // If we're already on the selected network, just update the state
      if (Number.parseInt(chainId, 16) === network.chainId) {
        setSelectedNetwork(network)
        setOpen(false)
        return
      }

      try {
        // Try to switch to the network
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${network.chainId.toString(16)}` }],
        })

        setSelectedNetwork(network)
        toast({
          title: "Network Switched",
          description: `Successfully switched to ${network.name}`,
        })
      } catch (switchError) {
        // If the error is because the network doesn't exist, try to add it
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${network.chainId.toString(16)}`,
                chainName: network.name,
                nativeCurrency: {
                  name: network.currency,
                  symbol: network.currency,
                  decimals: 18,
                },
                rpcUrls: [network.rpcUrl],
                blockExplorerUrls: [network.explorer],
              },
            ],
          })

          // Check if the network was added and selected
          const newChainId = await ethereum.request({ method: "eth_chainId" })
          if (Number.parseInt(newChainId, 16) === network.chainId) {
            setSelectedNetwork(network)
            toast({
              title: "Network Added",
              description: `Successfully added and switched to ${network.name}`,
            })
          } else {
            // Network was added but not selected
            setSelectedNetwork(network)
            toast({
              title: "Network Added",
              description: `${network.name} was added to your wallet. Please select it manually if needed.`,
            })
          }
        } catch (addError: any) {
          // If adding automatically fails, show the manual dialog
          console.error("Network add error:", addError)
          setNetworkToAdd(network)
          setShowNetworkDialog(true)

          toast({
            title: "Couldn't Add Network Automatically",
            description: "Please add the network manually using the provided details",
            variant: "destructive",
          })
        }
      }
    } catch (error: any) {
      console.error("General network error:", error)
      toast({
        title: "Network Error",
        description: error.message || "An error occurred while managing networks",
        variant: "destructive",
      })
    } finally {
      setSwitchingNetwork(false)
      setOpen(false)
    }
  }

  const addNetwork = async () => {
    if (!networkToAdd) return

    try {
      const { ethereum } = window as any

      // Try to add the network again
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${networkToAdd.chainId.toString(16)}`,
            chainName: networkToAdd.name,
            nativeCurrency: {
              name: networkToAdd.currency,
              symbol: networkToAdd.currency,
              decimals: 18,
            },
            rpcUrls: [networkToAdd.rpcUrl],
            blockExplorerUrls: [networkToAdd.explorer],
          },
        ],
      })

      setSelectedNetwork(networkToAdd)
      toast({
        title: "Network Added",
        description: `Successfully added ${networkToAdd.name}`,
      })
    } catch (error: any) {
      console.error("Manual network add error:", error)
      toast({
        title: "Failed to Add Network",
        description: "Please add the network manually through MetaMask settings",
        variant: "destructive",
      })
    } finally {
      setShowNetworkDialog(false)
      setNetworkToAdd(null)
    }
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="border-customBlue/20 bg-white hover:bg-customBlue/10 hover:text-customBlue focus:ring-2 focus:ring-customBlue/30 focus:border-customBlue/40 shadow-sm"
            disabled={switchingNetwork}
          >
            {switchingNetwork ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-customBlue border-t-transparent"></div>
                <span>Switching...</span>
              </div>
            ) : selectedNetwork ? (
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 rounded-full overflow-hidden">
                  <Image
                    src={selectedNetwork.icon || "/placeholder.svg"}
                    alt={selectedNetwork.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="hidden sm:inline">{selectedNetwork.name}</span>
                <span className="sm:hidden">{selectedNetwork.currency}</span>
              </div>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4 text-customBlue" />
                <span className="hidden sm:inline">Select Network</span>
                <span className="sm:hidden">Network</span>
              </>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0 border-customBlue/20 shadow-lg shadow-customBlue/5">
          <Command className="bg-white rounded-md">
            <CommandInput placeholder="Search network..." className="border-b border-customBlue/10" />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>No network found.</CommandEmpty>
              <div className="grid grid-cols-1 gap-2">
                <CommandGroup heading="Mainnet">
                  {networks
                    .filter((network) => network.type === "mainnet")
                    .map((network) => (
                      <CommandItem
                        key={network.chainId}
                        value={network.name}
                        onSelect={() => handleNetworkSelect(network)}
                        className="cursor-pointer hover:bg-customBlue/10 data-[selected=true]:bg-customBlue/15 data-[selected=true]:text-customBlue"
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative w-5 h-5 rounded-full overflow-hidden">
                            <Image
                              src={network.icon || "/placeholder.svg"}
                              alt={network.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span>{network.name}</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4 text-customBlue",
                            selectedNetwork?.chainId === network.chainId ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Testnet">
                  {networks
                    .filter((network) => network.type === "testnet")
                    .map((network) => (
                      <CommandItem
                        key={network.chainId}
                        value={network.name}
                        onSelect={() => handleNetworkSelect(network)}
                        className="cursor-pointer hover:bg-customBlue/10 data-[selected=true]:bg-customBlue/15 data-[selected=true]:text-customBlue"
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative w-5 h-5 rounded-full overflow-hidden">
                            <Image
                              src={network.icon || "/placeholder.svg"}
                              alt={network.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span>{network.name}</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4 text-customBlue",
                            selectedNetwork?.chainId === network.chainId ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={showNetworkDialog} onOpenChange={setShowNetworkDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-customBlue" />
              Add Network to MetaMask
            </DialogTitle>
            <DialogDescription>
              {networkToAdd?.name} network needs to be added to your MetaMask. Would you like to add it now?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {networkToAdd && (
              <div className="bg-customBlue/5 p-3 rounded-md border border-customBlue/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={networkToAdd.icon || "/placeholder.svg"}
                      alt={networkToAdd.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{networkToAdd.name}</h4>
                    <p className="text-sm text-muted-foreground">Chain ID: {networkToAdd.chainId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                  <span className="text-muted-foreground">Network Name:</span>
                  <span className="font-medium">{networkToAdd.name}</span>

                  <span className="text-muted-foreground">Chain ID:</span>
                  <span className="font-medium">{networkToAdd.chainId}</span>

                  <span className="text-muted-foreground">Currency Symbol:</span>
                  <span className="font-medium">{networkToAdd.currency}</span>

                  <span className="text-muted-foreground">RPC URL:</span>
                  <span className="truncate font-medium">{networkToAdd.rpcUrl}</span>

                  <span className="text-muted-foreground">Block Explorer:</span>
                  <span className="truncate font-medium">{networkToAdd.explorer}</span>
                </div>
              </div>
            )}
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-sm">
              <p className="text-yellow-800">
                <strong>Note:</strong> If automatic addition fails, you can add the network manually in MetaMask:
                Settings &gt; Networks &gt; Add Network &gt; Add a network manually
              </p>
            </div>
          </div>
          <DialogFooter className="flex sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setShowNetworkDialog(false)}
              className="border-customBlue/20 hover:bg-customBlue/5"
            >
              Cancel
            </Button>
            <Button onClick={addNetwork} className="bg-customBlue hover:bg-customBlue/90 text-white">
              Add Network
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
