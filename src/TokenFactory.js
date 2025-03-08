"use client"

// Enhance error handling and add network switching support
import { useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"
import TokenFactoryABI from "./components/TokenFactoryABI.json"
import NETWORKS from "./components/networks"
import Navbar from "./components/Navbar"
import TokenForm from "./components/TokenForm"
import MessageBox from "./components/MessageBox"
import Footer from "./components/Footer"
import QuickInfoBanner from "./components/QuickInfoBanner"
import { Container, Transition } from "semantic-ui-react"

const TokenFactory = () => {
  const [network, setNetwork] = useState("soneium")
  const [factoryAddress, setFactoryAddress] = useState(NETWORKS["soneium"].factoryAddress)
  const [walletAddress, setWalletAddress] = useState(null)
  const [walletBalance, setWalletBalance] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [totalSupply, setTotalSupply] = useState("")
  const [message, setMessage] = useState(null)
  const [creatingToken, setCreatingToken] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [messageVisible, setMessageVisible] = useState(false)
  const [currentChainId, setCurrentChainId] = useState(null)

  // Initialize provider and reconnect wallet when page is refreshed
  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        try {
          const newProvider = new ethers.BrowserProvider(window.ethereum)
          setProvider(newProvider)

          // Get current chain ID
          const { chainId } = await newProvider.getNetwork()
          setCurrentChainId(chainId)

          // Find matching network in our config
          const matchedNetwork = Object.keys(NETWORKS).find((key) => NETWORKS[key].chainId === Number(chainId))

          if (matchedNetwork) {
            setNetwork(matchedNetwork)
            setFactoryAddress(NETWORKS[matchedNetwork].factoryAddress)
          }

          checkIfWalletConnected(newProvider)
        } catch (error) {
          console.error("Failed to initialize provider:", error)
        }
      }
      // Add a small delay to create a smooth page load effect
      setTimeout(() => setPageLoaded(true), 500)
    }

    initializeProvider()

    // Listen for chain changes
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload()
      })

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet()
        } else {
          // User switched accounts
          window.location.reload()
        }
      })
    }

    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("chainChanged")
        window.ethereum.removeAllListeners("accountsChanged")
      }
    }
  }, [])

  useEffect(() => {
    if (NETWORKS[network]) {
      setFactoryAddress(NETWORKS[network].factoryAddress)
    }
  }, [network])

  // Effect for message animation
  useEffect(() => {
    if (message) {
      setMessageVisible(true)
      // Auto-hide success messages after 10 seconds
      if (message.type === "success") {
        const timer = setTimeout(() => {
          setMessageVisible(false)
          setTimeout(() => setMessage(null), 500) // Clear message after fade out
        }, 10000)
        return () => clearTimeout(timer)
      }
    } else {
      setMessageVisible(false)
    }
  }, [message])

  // Check if wallet is already connected
  const checkIfWalletConnected = async (providerInstance) => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      if (accounts.length > 0) {
        reconnectWallet(providerInstance, accounts[0])
      }
    } catch (error) {
      console.error("Failed to check wallet connection:", error)
    }
  }

  // Reconnect wallet if previously connected
  const reconnectWallet = async (providerInstance, savedWallet) => {
    try {
      const walletSigner = await providerInstance.getSigner()
      const balance = await providerInstance.getBalance(savedWallet)

      setWalletAddress(savedWallet)
      setSigner(walletSigner)
      setWalletBalance(Number.parseFloat(ethers.formatEther(balance)).toFixed(4))
    } catch (error) {
      console.error("Failed to reconnect wallet:", error)
    }
  }

  // Switch network function
  const switchNetwork = useCallback(
    async (targetNetwork) => {
      if (!window.ethereum || !provider) return false

      const targetChainId = NETWORKS[targetNetwork].chainId

      try {
        // Try to switch to the network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${targetChainId.toString(16)}` }],
        })
        return true
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${targetChainId.toString(16)}`,
                  chainName: NETWORKS[targetNetwork].name,
                  rpcUrls: [NETWORKS[targetNetwork].rpcUrl],
                  nativeCurrency: {
                    name: NETWORKS[targetNetwork].currency,
                    symbol: NETWORKS[targetNetwork].currency,
                    decimals: 18,
                  },
                  blockExplorerUrls: [NETWORKS[targetNetwork].explorer],
                },
              ],
            })
            return true
          } catch (addError) {
            setMessage({
              type: "error",
              content: `Failed to add ${NETWORKS[targetNetwork].name} network to your wallet.`,
            })
            return false
          }
        } else {
          setMessage({
            type: "error",
            content: `Failed to switch to ${NETWORKS[targetNetwork].name} network.`,
          })
          return false
        }
      }
    },
    [provider],
  )

  // Enhanced network setter with network switching
  const handleNetworkChange = async (newNetwork) => {
    if (walletAddress && provider) {
      const switched = await switchNetwork(newNetwork)
      if (switched) {
        setNetwork(newNetwork)
        setFactoryAddress(NETWORKS[newNetwork].factoryAddress)
      }
    } else {
      // If wallet not connected, just update UI
      setNetwork(newNetwork)
      setFactoryAddress(NETWORKS[newNetwork].factoryAddress)
    }
  }

  const connectWallet = async () => {
    if (!provider) {
      setMessage({
        type: "error",
        content: "Metamask not detected! Please install Metamask to use this application.",
      })
      return
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", [])
      const walletSigner = await provider.getSigner()
      const balance = await provider.getBalance(accounts[0])

      setWalletAddress(accounts[0])
      setSigner(walletSigner)
      setWalletBalance(Number.parseFloat(ethers.formatEther(balance)).toFixed(4))

      // Check if we need to switch networks
      const { chainId } = await provider.getNetwork()
      const targetChainId = NETWORKS[network].chainId

      if (Number(chainId) !== targetChainId) {
        await switchNetwork(network)
      }

      setMessage({ type: "success", content: "Wallet connected successfully!" })
    } catch (error) {
      console.error("Wallet connection error:", error)
      setMessage({
        type: "error",
        content: error.message || "Failed to connect Metamask. Please try again.",
      })
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setWalletBalance(null)
    setSigner(null)
    setMessage({ type: "info", content: "Wallet disconnected." })
  }

  const validateTokenInput = () => {
    // Validate token name
    if (!name.trim()) {
      setMessage({ type: "error", content: "Token name cannot be empty!" })
      return false
    }

    // Validate token symbol
    if (!symbol.trim()) {
      setMessage({ type: "error", content: "Token symbol cannot be empty!" })
      return false
    }

    // Check for special characters in symbol
    const symbolRegex = /^[A-Z0-9]+$/
    if (!symbolRegex.test(symbol)) {
      setMessage({
        type: "error",
        content: "Token symbol can only contain uppercase letters and numbers!",
      })
      return false
    }

    // Validate total supply
    if (!totalSupply || Number.parseInt(totalSupply) <= 0) {
      setMessage({ type: "error", content: "Total supply must be greater than zero!" })
      return false
    }

    return true
  }

  const createToken = async () => {
    if (!signer) {
      setMessage({ type: "error", content: "Please connect your wallet first!" })
      return
    }

    if (!validateTokenInput()) {
      return
    }

    try {
      setCreatingToken(true)
      setMessage({ type: "info", content: "Preparing to create your token..." })

      const factoryContract = new ethers.Contract(factoryAddress, TokenFactoryABI, signer)

      // Check if we're on the correct network
      const { chainId } = await provider.getNetwork()
      const targetChainId = NETWORKS[network].chainId

      if (Number(chainId) !== targetChainId) {
        const switched = await switchNetwork(network)
        if (!switched) {
          setCreatingToken(false)
          return
        }
      }

      setMessage({ type: "info", content: "Please confirm the transaction in your wallet..." })

      const tx = await factoryContract.createToken(name, symbol, ethers.parseUnits(totalSupply, 0), walletAddress)

      setMessage({
        type: "info",
        content: `Transaction submitted! Waiting for confirmation...<br/>
                 <a href="${NETWORKS[network].explorer}/tx/${tx.hash}" target="_blank" rel="noopener noreferrer">
                   View transaction
                 </a>`,
      })

      const receipt = await tx.wait()

      // Find the event with the token address
      const event = receipt.logs.find((log) => log.address.toLowerCase() === factoryAddress.toLowerCase())
      const tokenAddress = event ? event.args[0] : null

      if (tokenAddress) {
        setMessage({
          type: "success",
          content: `
            <div style="text-align: center;">
              <div style="font-size: 18px; margin-bottom: 10px;">🎉 Token created successfully!</div>
              <div>
                <strong>Name:</strong> ${name}<br/>
                <strong>Symbol:</strong> ${symbol}<br/>
                <strong>Total Supply:</strong> ${totalSupply}<br/>
                <strong>Address:</strong> ${tokenAddress}<br/>
                <a href="${NETWORKS[network].explorer}/address/${tokenAddress}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 10px; color: #3498db; text-decoration: underline;">
                  View on Explorer
                </a>
              </div>
            </div>
          `,
        })
      } else {
        setMessage({
          type: "warning",
          content: "Token created but unable to fetch contract address. Check your wallet for the new token.",
        })
      }

      // Reset form
      setName("")
      setSymbol("")
      setTotalSupply("")
    } catch (error) {
      console.error("Token creation error:", error)

      let errorMessage = "Failed to create token!"

      // Handle specific error messages
      if (error.reason === "Token with this symbol already exists") {
        errorMessage = "🚨 Token with this symbol already exists!"
      } else if (error.code === "ACTION_REJECTED") {
        errorMessage = "Transaction was rejected by the user."
      } else if (error.message && error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds to complete this transaction."
      } else if (error.message) {
        // Extract the error message from the error object
        errorMessage = `Error: ${error.message.split("(")[0].trim()}`
      }

      setMessage({ type: "error", content: errorMessage })
    } finally {
      setCreatingToken(false)
    }
  }

  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        opacity: pageLoaded ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {/* Navbar */}
      <Navbar
        network={network}
        setNetwork={handleNetworkChange}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        walletAddress={walletAddress}
        walletBalance={walletBalance}
      />

      {/* Quick Info Banner */}
      <QuickInfoBanner />

      {/* Main Content */}
      <Container
        style={{
          flex: "1",
          maxWidth: "900px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Transition visible={messageVisible} animation="fade" duration={500}>
          <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto 20px auto" }}>
            {message && <MessageBox message={message} />}
          </div>
        </Transition>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "12px",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <TokenForm
              name={name}
              setName={setName}
              symbol={symbol}
              setSymbol={setSymbol}
              totalSupply={totalSupply}
              setTotalSupply={setTotalSupply}
              createToken={createToken}
              creatingToken={creatingToken}
              walletConnected={!!walletAddress}
              network={network}
              networkName={NETWORKS[network]?.name || "Current Network"}
              explorer={NETWORKS[network]?.explorer || "#"}
            />
          </div>
        </div>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default TokenFactory

