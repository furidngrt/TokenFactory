"use client"

import { create } from "zustand"

type WalletState = {
  address: string | undefined
  isConnected: boolean
  setWalletState: (state: { address?: string; isConnected: boolean }) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  address: undefined,
  isConnected: false,
  setWalletState: (state) => set(state),
}))

