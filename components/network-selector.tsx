"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useNetworkStore } from "@/lib/stores/network-store"
import NETWORKS from "@/lib/networks"

export function NetworkSelector() {
  const [open, setOpen] = useState(false)
  const { selectedNetwork, setSelectedNetwork } = useNetworkStore()

  const networks = Object.values(NETWORKS)

  return (
    <Card className="bg-white/25 border border-gray-200/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Select Network</CardTitle>
      </CardHeader>
      <CardContent>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-white/25 border-customBlue/20 hover:bg-purple-500/10 hover:text-primary-foreground"
            >
              {selectedNetwork ? (
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden">
                    <Image
                      src={selectedNetwork.icon || "/placeholder.svg"}
                      alt={selectedNetwork.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{selectedNetwork.name}</span>
                </div>
              ) : (
                "Select network..."
              )}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 border-purple-500/20">
            <Command className="bg-popover/95 backdrop-blur-sm">
              <CommandInput placeholder="Search network..." />
              <CommandList>
                <CommandEmpty>No network found.</CommandEmpty>
                <div className="grid grid-cols-1 gap-2">
                  <CommandGroup heading="Mainnet">
                    {networks
                      .filter((network) => network.type === "mainnet")
                      .map((network) => (
                        <CommandItem
                          key={network.chainId}
                          value={network.name}
                          onSelect={() => {
                            setSelectedNetwork(network)
                            setOpen(false)
                          }}
                          className="cursor-pointer hover:bg-purple-500/10"
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
                              "ml-auto h-4 w-4",
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
                          onSelect={() => {
                            setSelectedNetwork(network)
                            setOpen(false)
                          }}
                          className="cursor-pointer hover:bg-purple-500/10"
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
                              "ml-auto h-4 w-4",
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

        {selectedNetwork && (
          <div className="mt-4 space-y-2 text-sm bg-white/25 p-3 rounded-lg border border-gray-200/50">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Chain ID:</span>
              <span className="font-medium">{selectedNetwork.chainId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Currency:</span>
              <span className="font-medium">{selectedNetwork.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Explorer:</span>
              <a
                href={selectedNetwork.explorer}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                View Explorer
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
