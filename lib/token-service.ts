"use client"

import { ethers } from "ethers"
import type { NetworkType } from "./networks"
import { tokenFactoryABI } from "./abis/token-factory-abi"
import { tokenERC20ABI } from "./abis/token-erc20-abi"

export type TokenInfo = {
  tokenAddress: string
  name: string
  symbol: string
  totalSupply: string
  owner: string
}

export type CreateTokenParams = {
  name: string
  symbol: string
  totalSupply: string
  owner: string
  network: NetworkType
}

export type BurnTokensParams = {
  tokenAddress: string
  amount: string
  network: NetworkType
}

export type SendTokensParams = {
  tokenAddress: string
  recipient: string
  amount: string
  network: NetworkType
}

export type GetTokenBalanceParams = {
  tokenAddress: string
  owner: string
  network: NetworkType
}

// Helper function to ensure we're on the right network
async function ensureCorrectNetwork(network: NetworkType): Promise<boolean> {
  try {
    const { ethereum } = window as any

    if (!ethereum) {
      throw new Error("Ethereum provider not found. Please install MetaMask.")
    }

    // Check if we're on the right network
    const chainId = await ethereum.request({ method: "eth_chainId" })
    if (Number.parseInt(chainId, 16) !== network.chainId) {
      // If not on the right network, inform the user to switch manually
      throw new Error(`Please switch to ${network.name} network in your wallet to continue.`)
    }

    return true
  } catch (error) {
    console.error("Network check error:", error)
    throw error
  }
}

// Modified createToken function to handle all networks consistently
export async function createToken(params: CreateTokenParams): Promise<string> {
  try {
    const { ethereum } = window as any

    if (!ethereum) {
      throw new Error("Ethereum provider not found. Please install MetaMask.")
    }

    // Request account access
    await ethereum.request({ method: "eth_requestAccounts" })

    // Make sure we're on the right network
    await ensureCorrectNetwork(params.network)

    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()

    const factoryContract = new ethers.Contract(params.network.factoryAddress, tokenFactoryABI, signer)

    // Don't add 18 decimals to the total supply
    // This will display the exact number the user entered
    const totalSupply = ethers.parseUnits(params.totalSupply, 0)

    // Call the createToken function
    const tx = await factoryContract.createToken(params.name, params.symbol, totalSupply, params.owner)

    console.log("Transaction submitted with hash:", tx.hash)

    // For all networks, just return the transaction hash without waiting for receipt
    // This avoids issues with different wallet implementations and null blockHash errors
    return tx.hash
  } catch (error) {
    console.error("Error creating token:", error)
    throw error
  }
}

export async function getAllTokens(network: NetworkType): Promise<TokenInfo[]> {
  try {
    const { ethereum } = window as any

    if (!ethereum) {
      throw new Error("Ethereum provider not found. Please install MetaMask.")
    }

    // Make sure we're on the right network
    try {
      await ensureCorrectNetwork(network)
    } catch (error) {
      // If network check fails, return empty array instead of throwing
      console.warn("Network check failed, returning empty token list:", error)
      return []
    }

    const provider = new ethers.BrowserProvider(ethereum)

    const factoryContract = new ethers.Contract(network.factoryAddress, tokenFactoryABI, provider)

    // Call the getAllTokens function
    const tokens = await factoryContract.getAllTokens()

    // Format the tokens - display the exact number without decimals
    return tokens.map((token: any) => ({
      tokenAddress: token.tokenAddress,
      name: token.name,
      symbol: token.symbol,
      totalSupply: ethers.formatUnits(token.totalSupply, 0),
      owner: token.owner,
    }))
  } catch (error) {
    console.error("Error getting tokens:", error)
    throw error
  }
}

// Modified burnTokens function to handle all networks consistently
export async function burnTokens(params: BurnTokensParams): Promise<void> {
  try {
    const { ethereum } = window as any

    if (!ethereum) {
      throw new Error("Ethereum provider not found. Please install MetaMask.")
    }

    // Request account access
    await ethereum.request({ method: "eth_requestAccounts" })

    // Make sure we're on the right network
    await ensureCorrectNetwork(params.network)

    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()

    // Create contract instance for the token
    const tokenContract = new ethers.Contract(params.tokenAddress, tokenERC20ABI, signer)

    // Parse the amount (without decimals as per our implementation)
    const amount = ethers.parseUnits(params.amount, 0)

    // Call the burn function
    const tx = await tokenContract.burn(amount)

    // For all networks, don't wait for the receipt to avoid potential errors
    // Just return after the transaction is submitted
    return
  } catch (error) {
    console.error("Error burning tokens:", error)
    throw error
  }
}

// Modified sendTokens function to handle all networks consistently
export async function sendTokens(params: SendTokensParams): Promise<void> {
  try {
    const { ethereum } = window as any

    if (!ethereum) {
      throw new Error("Ethereum provider not found. Please install MetaMask.")
    }

    // Request account access
    await ethereum.request({ method: "eth_requestAccounts" })

    // Make sure we're on the right network
    await ensureCorrectNetwork(params.network)

    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()

    // Create contract instance for the token
    const tokenContract = new ethers.Contract(params.tokenAddress, tokenERC20ABI, signer)

    // Parse the amount (without decimals as per our implementation)
    const amount = ethers.parseUnits(params.amount, 0)

    // Call the transfer function
    const tx = await tokenContract.transfer(params.recipient, amount)

    // For all networks, don't wait for the receipt to avoid potential errors
    // Just return after the transaction is submitted
    return
  } catch (error) {
    console.error("Error sending tokens:", error)
    throw error
  }
}

export async function getTokenBalance(params: GetTokenBalanceParams): Promise<string> {
  try {
    const { ethereum } = window as any

    if (!ethereum) {
      throw new Error("Ethereum provider not found. Please install MetaMask.")
    }

    // Make sure we're on the right network
    try {
      await ensureCorrectNetwork(params.network)
    } catch (error) {
      // If network check fails, return "0" instead of throwing
      console.warn("Network check failed, returning zero balance:", error)
      return "0"
    }

    const provider = new ethers.BrowserProvider(ethereum)

    // Create contract instance for the token
    const tokenContract = new ethers.Contract(params.tokenAddress, tokenERC20ABI, provider)

    // Call the balanceOf function
    const balance = await tokenContract.balanceOf(params.owner)

    // Format the balance (without decimals as per our implementation)
    return ethers.formatUnits(balance, 0)
  } catch (error) {
    console.error("Error getting token balance:", error)
    throw error
  }
}

