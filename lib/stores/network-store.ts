"use client"

import { create } from "zustand"
import type { NetworkType } from "../networks"

type NetworkStore = {
  selectedNetwork: NetworkType | undefined
  setSelectedNetwork: (network: NetworkType) => void
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  selectedNetwork: undefined,
  setSelectedNetwork: (network) => set({ selectedNetwork: network }),
}))

