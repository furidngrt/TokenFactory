"use client"

export async function connectWallet(): Promise<string> {
  try {
    const { ethereum } = window as any

    if (!ethereum) {
      throw new Error("Ethereum provider not found. Please install MetaMask.")
    }

    // Request account access
    const accounts = await ethereum.request({ method: "eth_requestAccounts" })

    if (accounts.length === 0) {
      throw new Error("No accounts found. Please create an account in MetaMask.")
    }

    return accounts[0]
  } catch (error) {
    console.error("Error connecting wallet:", error)
    throw error
  }
}

export async function disconnectWallet(): Promise<void> {
  // MetaMask doesn't have a disconnect method
  // We just clear the state in our app
  return Promise.resolve()
}

