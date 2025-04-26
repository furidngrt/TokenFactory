"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Search, Copy, CheckCircle, BookOpen, Code, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { toast } = useToast()

  const copyToClipboard = (code: string, snippet: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(snippet)
    toast({
      title: "Code Copied",
      description: "Code snippet copied to clipboard",
    })
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="mb-6 relative w-16 h-16 bg-customBlue/10 rounded-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-customBlue" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-customBlue mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Comprehensive guides and references to help you create and manage tokens with TokenFactory.
          </p>
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search documentation..."
              className="pl-10 h-12 bg-white/25 border-gray-200 focus-visible:ring-customBlue/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="#getting-started" className="group">
            <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-customBlue transition-colors">
                Getting Started
              </h3>
              <p className="text-gray-600 mb-4">Learn the basics of TokenFactory and how to create your first token.</p>
              <div className="flex items-center text-customBlue font-medium">
                Read guide <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all" />
              </div>
            </div>
          </Link>

          <Link href="#api-reference" className="group">
            <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-customBlue transition-colors">
                API Reference
              </h3>
              <p className="text-gray-600 mb-4">Detailed documentation of the TokenFactory API for developers.</p>
              <div className="flex items-center text-customBlue font-medium">
                Explore API <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all" />
              </div>
            </div>
          </Link>

          <Link href="#network-guides" className="group">
            <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600"
                >
                  <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"></path>
                  <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"></path>
                  <line x1="12" y1="22" x2="12" y2="13"></line>
                  <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-customBlue transition-colors">
                Network Guides
              </h3>
              <p className="text-gray-600 mb-4">Specific guides for each supported blockchain network.</p>
              <div className="flex items-center text-customBlue font-medium">
                View networks <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all" />
              </div>
            </div>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/25 border border-gray-200/50 rounded-xl p-5 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Contents</h3>
              <nav className="space-y-1">
                <a
                  href="#getting-started"
                  className="block py-2 px-3 rounded-md text-customBlue bg-customBlue/5 font-medium"
                >
                  Getting Started
                </a>
                <a
                  href="#token-creation"
                  className="block py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-customBlue transition-colors"
                >
                  Token Creation
                </a>
                <a
                  href="#managing-tokens"
                  className="block py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-customBlue transition-colors"
                >
                  Managing Tokens
                </a>
                <a
                  href="#network-guides"
                  className="block py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-customBlue transition-colors"
                >
                  Network Guides
                </a>
                <a
                  href="#api-reference"
                  className="block py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-customBlue transition-colors"
                >
                  API Reference
                </a>
                <a
                  href="#troubleshooting"
                  className="block py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-customBlue transition-colors"
                >
                  Troubleshooting
                </a>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 md:p-8 shadow-sm">
              <section id="getting-started" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Getting Started</h2>
                <p className="text-gray-600 mb-6">
                  TokenFactory is a platform that allows you to create and deploy ERC20 tokens on multiple blockchain
                  networks with just a few clicks. This guide will help you get started with the platform.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Prerequisites</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                  <li>A Web3 wallet (like MetaMask) installed in your browser</li>
                  <li>Some native currency (ETH, BERA, etc.) for gas fees</li>
                  <li>Basic understanding of blockchain and tokens</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Start</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-600 mb-6">
                  <li className="mb-4">
                    <span className="font-medium text-gray-800">Connect your wallet</span>
                    <p className="mt-1 ml-6">
                      Click the "Connect Wallet" button in the top right corner of the page and select your wallet
                      provider.
                    </p>
                  </li>
                  <li className="mb-4">
                    <span className="font-medium text-gray-800">Select a network</span>
                    <p className="mt-1 ml-6">
                      Choose the blockchain network where you want to deploy your token from the network selector.
                    </p>
                  </li>
                  <li className="mb-4">
                    <span className="font-medium text-gray-800">Fill in token details</span>
                    <p className="mt-1 ml-6">
                      Enter your token name, symbol, and total supply in the token creation form.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Create your token</span>
                    <p className="mt-1 ml-6">
                      Click the "Create Token" button and confirm the transaction in your wallet.
                    </p>
                  </li>
                </ol>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <svg
                        className="h-5 w-5 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-blue-800">Note</h4>
                      <div className="mt-1 text-sm text-blue-700">
                        <p>
                          Token creation requires a small amount of the network's native currency to pay for gas fees.
                          Make sure you have enough funds in your wallet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="javascript" className="relative">
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="language-javascript">
                        <code>{`// Example of creating a token using the TokenFactory API
import { ethers } from "ethers";
import { tokenFactoryABI } from "./abis/token-factory-abi";

async function createToken() {
  // Connect to the provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  // Contract address for the selected network
  const factoryAddress = "0xdaAe77edcB0D2802Df1326d5eC5b2778A32a9f4E";
  
  // Create contract instance
  const factory = new ethers.Contract(factoryAddress, tokenFactoryABI, signer);
  
  // Token parameters
  const name = "My Token";
  const symbol = "MTK";
  const totalSupply = ethers.utils.parseUnits("1000000", 0); // No decimals
  
  // Create the token
  const tx = await factory.createToken(name, symbol, totalSupply, await signer.getAddress());
  
  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Token created:", receipt);
}`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        onClick={() =>
                          copyToClipboard(
                            `// Example of creating a token using the TokenFactory API
import { ethers } from "ethers";
import { tokenFactoryABI } from "./abis/token-factory-abi";

async function createToken() {
  // Connect to the provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  // Contract address for the selected network
  const factoryAddress = "0xdaAe77edcB0D2802Df1326d5eC5b2778A32a9f4E";
  
  // Create contract instance
  const factory = new ethers.Contract(factoryAddress, tokenFactoryABI, signer);
  
  // Token parameters
  const name = "My Token";
  const symbol = "MTK";
  const totalSupply = ethers.utils.parseUnits("1000000", 0); // No decimals
  
  // Create the token
  const tx = await factory.createToken(name, symbol, totalSupply, await signer.getAddress());
  
  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Token created:", receipt);
}`,
                            "javascript",
                          )
                        }
                      >
                        {copiedCode === "javascript" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="python" className="relative">
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="language-python">
                        <code>{`# Example of creating a token using the TokenFactory API with web3.py
from web3 import Web3
import json

# Connect to the provider
w3 = Web3(Web3.HTTPProvider('https://rpc.berachain.com/'))

# Load your account (replace with your private key)
private_key = '0x...'  # Your private key
account = w3.eth.account.from_key(private_key)

# Contract address for the selected network
factory_address = '0xdaAe77edcB0D2802Df1326d5eC5b2778A32a9f4E'

# Load the ABI
with open('token_factory_abi.json', 'r') as f:
    factory_abi = json.load(f)

# Create contract instance
factory = w3.eth.contract(address=factory_address, abi=factory_abi)

# Token parameters
name = "My Token"
symbol = "MTK"
total_supply = 1000000  # No decimals

# Build the transaction
tx = factory.functions.createToken(
    name, 
    symbol, 
    total_supply, 
    account.address
).build_transaction({
    'from': account.address,
    'nonce': w3.eth.get_transaction_count(account.address),
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price
})

# Sign the transaction
signed_tx = w3.eth.account.sign_transaction(tx, private_key)

# Send the transaction
tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
print(f"Transaction sent: {tx_hash.hex()}")

# Wait for the receipt
receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f"Token created: {receipt}")`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        onClick={() =>
                          copyToClipboard(
                            `# Example of creating a token using the TokenFactory API with web3.py
from web3 import Web3
import json

# Connect to the provider
w3 = Web3(Web3.HTTPProvider('https://rpc.berachain.com/'))

# Load your account (replace with your private key)
private_key = '0x...'  # Your private key
account = w3.eth.account.from_key(private_key)

# Contract address for the selected network
factory_address = '0xdaAe77edcB0D2802Df1326d5eC5b2778A32a9f4E'

# Load the ABI
with open('token_factory_abi.json', 'r') as f:
    factory_abi = json.load(f)

# Create contract instance
factory = w3.eth.contract(address=factory_address, abi=factory_abi)

# Token parameters
name = "My Token"
symbol = "MTK"
total_supply = 1000000  # No decimals

# Build the transaction
tx = factory.functions.createToken(
    name, 
    symbol, 
    total_supply, 
    account.address
).build_transaction({
    'from': account.address,
    'nonce': w3.eth.get_transaction_count(account.address),
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price
})

# Sign the transaction
signed_tx = w3.eth.account.sign_transaction(tx, private_key)

# Send the transaction
tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
print(f"Transaction sent: {tx_hash.hex()}")

# Wait for the receipt
receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f"Token created: {receipt}")`,
                            "python",
                          )
                        }
                      >
                        {copiedCode === "python" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="curl" className="relative">
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="language-bash">
                        <code>{`# This is a simplified example using curl to interact with the blockchain
# In practice, you would need to sign the transaction with your private key

# First, get the current nonce for your address
curl -X POST https://rpc.berachain.com/ \\
  -H "Content-Type: application/json" \\
  --data '{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionCount",
    "params":["0xYourAddress", "latest"],
    "id":1
  }'

# Then, create and send the transaction (this is simplified)
curl -X POST https://rpc.berachain.com/ \\
  -H "Content-Type: application/json" \\
  --data '{
    "jsonrpc":"2.0",
    "method":"eth_sendRawTransaction",
    "params":["0xSignedTransactionData"],
    "id":1
  }'`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        onClick={() =>
                          copyToClipboard(
                            `# This is a simplified example using curl to interact with the blockchain
# In practice, you would need to sign the transaction with your private key

# First, get the current nonce for your address
curl -X POST https://rpc.berachain.com/ \\
  -H "Content-Type: application/json" \\
  --data '{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionCount",
    "params":["0xYourAddress", "latest"],
    "id":1
  }'

# Then, create and send the transaction (this is simplified)
curl -X POST https://rpc.berachain.com/ \\
  -H "Content-Type: application/json" \\
  --data '{
    "jsonrpc":"2.0",
    "method":"eth_sendRawTransaction",
    "params":["0xSignedTransactionData"],
    "id":1
  }'`,
                            "curl",
                          )
                        }
                      >
                        {copiedCode === "curl" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </section>

              <section id="token-creation" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Token Creation</h2>
                <p className="text-gray-600 mb-6">
                  Creating a token with TokenFactory is a straightforward process. This section covers the details of
                  token creation, including parameters, customization options, and best practices.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Token Parameters</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full bg-white/50 border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Parameter</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Description</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-800 border-b">Name</td>
                        <td className="py-3 px-4 text-sm text-gray-600 border-b">The full name of your token</td>
                        <td className="py-3 px-4 text-sm text-gray-600 border-b">"My Awesome Token"</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-800 border-b">Symbol</td>
                        <td className="py-3 px-4 text-sm text-gray-600 border-b">
                          A short identifier for your token (usually 3-5 characters)
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 border-b">"MAT"</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-800 border-b">Total Supply</td>
                        <td className="py-3 px-4 text-sm text-gray-600 border-b">
                          The total number of tokens to create
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 border-b">"1000000"</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-800">Owner</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          The wallet address that will own the tokens (defaults to your connected wallet)
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">"0x..."</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-yellow-800">Important</h4>
                      <div className="mt-1 text-sm text-yellow-700">
                        <p>
                          Token symbols must be uppercase letters and numbers only. The total supply is the exact number
                          of tokens that will be created, with no decimal places.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Token Standards</h3>
                <p className="text-gray-600 mb-4">
                  All tokens created with TokenFactory follow the ERC20 standard, which is the most widely used token
                  standard on Ethereum and compatible blockchains. This ensures compatibility with wallets, exchanges,
                  and other DeFi applications.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Token Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                  <li>Basic ERC20 functionality (transfer, approve, allowance)</li>
                  <li>Ability to burn tokens (reduce supply)</li>
                  <li>Owner controls (for future upgrades or additional features)</li>
                  <li>Viewable on block explorers (Etherscan, Berascan, etc.)</li>
                  <li>Compatible with all ERC20-supporting wallets and exchanges</li>
                </ul>
              </section>

              <section id="managing-tokens" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Managing Tokens</h2>
                <p className="text-gray-600 mb-6">
                  After creating your token, you can manage it through the TokenFactory interface or directly through
                  blockchain interactions. This section covers the various management operations you can perform.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Viewing Your Tokens</h3>
                <p className="text-gray-600 mb-4">
                  You can view all tokens you've created by navigating to the "My Tokens" page. This page displays
                  information about each token, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                  <li>Token name and symbol</li>
                  <li>Total supply</li>
                  <li>Contract address</li>
                  <li>Network information</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Token Operations</h3>
                <p className="text-gray-600 mb-4">
                  From the "My Tokens" page, you can perform several operations on your tokens:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Burn Tokens</h4>
                    <p className="text-gray-600 mb-2">Reduce the total supply by burning tokens from your wallet.</p>
                    <ol className="list-decimal list-inside text-sm text-gray-600">
                      <li>Click the "Burn" button for the token</li>
                      <li>Enter the amount to burn</li>
                      <li>Confirm the transaction in your wallet</li>
                    </ol>
                  </div>

                  <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Send Tokens</h4>
                    <p className="text-gray-600 mb-2">Transfer tokens to another wallet address.</p>
                    <ol className="list-decimal list-inside text-sm text-gray-600">
                      <li>Click the "Send" button for the token</li>
                      <li>Enter the recipient address and amount</li>
                      <li>Confirm the transaction in your wallet</li>
                    </ol>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Tracking Tokens</h3>
                <p className="text-gray-600 mb-4">
                  You can track your tokens on blockchain explorers by clicking the "View on Explorer" button for each
                  token. This will take you to the token's page on the appropriate blockchain explorer, where you can
                  see:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                  <li>Transaction history</li>
                  <li>Token holders</li>
                  <li>Contract details</li>
                  <li>Token transfers</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-blue-800">Tip</h4>
                      <div className="mt-1 text-sm text-blue-700">
                        <p>
                          You can add your token to MetaMask or other wallets by using the "Copy" button to copy the
                          token address, then using the "Import Token" feature in your wallet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-between items-center border-t border-gray-200 pt-8 mt-8">
                <a href="#" className="inline-flex items-center text-customBlue hover:text-customBlue/80">
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Previous: Introduction
                </a>
                <a href="#" className="inline-flex items-center text-customBlue hover:text-customBlue/80">
                  Next: Network Guides
                  <svg
                    className="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

