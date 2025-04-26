"use client"

import { useEffect, useState, useCallback } from "react"
import { ExternalLink, Loader2, Search, Copy, CheckCircle, Flame, SendHorizontal, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNetworkStore } from "@/lib/stores/network-store"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { getAllTokens, type TokenInfo, burnTokens, sendTokens, getTokenBalance } from "@/lib/token-service"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const burnFormSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Must be greater than 0"),
})

const sendFormSchema = z.object({
  recipient: z
    .string()
    .min(1, "Recipient address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Must be a valid Ethereum address"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Must be greater than 0"),
})

type BurnFormValues = z.infer<typeof burnFormSchema>
type SendFormValues = z.infer<typeof sendFormSchema>

export function TokenList() {
  const [tokens, setTokens] = useState<TokenInfo[]>([])
  const [filteredTokens, setFilteredTokens] = useState<TokenInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [burnDialogOpen, setBurnDialogOpen] = useState(false)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { selectedNetwork } = useNetworkStore()
  const { address, isConnected } = useWalletStore()
  const { toast } = useToast()
  const [userTokenBalance, setUserTokenBalance] = useState<string>("")
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)

  const burnForm = useForm<BurnFormValues>({
    resolver: zodResolver(burnFormSchema),
    defaultValues: {
      amount: "",
    },
  })

  const sendForm = useForm<SendFormValues>({
    resolver: zodResolver(sendFormSchema),
    defaultValues: {
      recipient: "",
      amount: "",
    },
  })

  useEffect(() => {
    async function fetchTokens() {
      if (!selectedNetwork || !isConnected) {
        setTokens([])
        setFilteredTokens([])
        return
      }

      try {
        setIsLoading(true)
        const tokenList = await getAllTokens(selectedNetwork)
        // Filter tokens owned by the connected wallet
        const myTokens = tokenList.filter((token) => token.owner.toLowerCase() === address?.toLowerCase())
        setTokens(myTokens)
        setFilteredTokens(myTokens)
      } catch (error) {
        console.error("Error fetching tokens:", error)
        setTokens([])
        setFilteredTokens([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokens()
  }, [selectedNetwork, address, isConnected])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTokens(tokens)
    } else {
      const filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredTokens(filtered)
    }
  }, [searchQuery, tokens])

  function formatAddress(address: string) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  function formatSupply(supply: string) {
    const num = Number.parseFloat(supply)
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return num.toString()
  }

  const copyToClipboard = (tokenAddress: string) => {
    navigator.clipboard.writeText(tokenAddress)
    setCopiedAddress(tokenAddress)
    toast({
      title: "Address Copied",
      description: "Token address copied to clipboard",
    })
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const fetchTokenBalance = useCallback(
    async (tokenAddress: string) => {
      if (!selectedNetwork || !address) return "0"

      try {
        setIsLoadingBalance(true)
        const balance = await getTokenBalance({
          tokenAddress,
          owner: address,
          network: selectedNetwork,
        })
        setUserTokenBalance(balance)
        return balance
      } catch (error) {
        console.error("Error fetching token balance:", error)
        setUserTokenBalance("0")
        return "0"
      } finally {
        setIsLoadingBalance(false)
      }
    },
    [selectedNetwork, address],
  )

  const openBurnDialog = async (token: TokenInfo) => {
    setSelectedToken(token)
    burnForm.reset()
    setBurnDialogOpen(true)

    // Fetch the user's token balance
    const balance = await fetchTokenBalance(token.tokenAddress)
    setUserTokenBalance(balance)
  }

  const openSendDialog = (token: TokenInfo) => {
    setSelectedToken(token)
    sendForm.reset()
    setSendDialogOpen(true)
  }

  const handleBurnSubmit = async (values: BurnFormValues) => {
    if (!selectedToken || !selectedNetwork) return

    try {
      setIsProcessing(true)
      await burnTokens({
        tokenAddress: selectedToken.tokenAddress,
        amount: values.amount,
        network: selectedNetwork,
      })

      toast({
        title: "Tokens Burned",
        description: `Successfully burned ${values.amount} ${selectedToken.symbol} tokens`,
      })

      // Refresh token list after burning
      const tokenList = await getAllTokens(selectedNetwork)
      const myTokens = tokenList.filter((token) => token.owner.toLowerCase() === address?.toLowerCase())
      setTokens(myTokens)
      setFilteredTokens(myTokens)

      setBurnDialogOpen(false)
    } catch (error: any) {
      console.error("Error burning tokens:", error)
      toast({
        title: "Burn Failed",
        description: error.message || "Failed to burn tokens",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSendSubmit = async (values: SendFormValues) => {
    if (!selectedToken || !selectedNetwork) return

    try {
      setIsProcessing(true)
      await sendTokens({
        tokenAddress: selectedToken.tokenAddress,
        recipient: values.recipient,
        amount: values.amount,
        network: selectedNetwork,
      })

      toast({
        title: "Tokens Sent",
        description: `Successfully sent ${values.amount} ${selectedToken.symbol} tokens to ${formatAddress(values.recipient)}`,
      })

      // Refresh token list after sending
      const tokenList = await getAllTokens(selectedNetwork)
      const myTokens = tokenList.filter((token) => token.owner.toLowerCase() === address?.toLowerCase())
      setTokens(myTokens)
      setFilteredTokens(myTokens)

      setSendDialogOpen(false)
    } catch (error: any) {
      console.error("Error sending tokens:", error)
      toast({
        title: "Send Failed",
        description: error.message || "Failed to send tokens",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="h-full border-customBlue/20 shadow-md bg-white/25">
        <CardContent className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-customBlue" />
        </CardContent>
      </Card>
    )
  }

  if (!isConnected) {
    return (
      <Card className="h-full bg-white/25 border-customBlue/20 shadow-md">
        <CardContent className="flex flex-col justify-center items-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-customBlue/10 flex items-center justify-center mb-4">
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
              className="text-customBlue"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Wallet Not Connected</h3>
          <p className="text-muted-foreground max-w-md">Connect your wallet to view your tokens</p>
        </CardContent>
      </Card>
    )
  }

  if (!selectedNetwork) {
    return (
      <Card className="h-full bg-white/25 border-customBlue/20 shadow-md">
        <CardContent className="flex flex-col justify-center items-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-customBlue/10 flex items-center justify-center mb-4">
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
              className="text-customBlue"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">No Network Selected</h3>
          <p className="text-muted-foreground max-w-md">Select a network to view your tokens</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="h-full bg-white/25 border-gray-200 shadow-sm">
        <CardHeader className="pb-2 border-b border-gray-200">
          <CardTitle className="text-2xl text-[#3b6bce]">Your Tokens</CardTitle>
          <CardDescription>Tokens you've created on {selectedNetwork?.name}</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or symbol..."
              className="pl-10 bg-white/25 border-gray-200 focus-visible:ring-[#3b6bce]/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {filteredTokens.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-white/25 rounded-lg border border-gray-200/50">
              {tokens.length === 0 ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-customBlue/10 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-customBlue"
                    >
                      <circle cx="8" cy="21" r="1"></circle>
                      <circle cx="19" cy="21" r="1"></circle>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                  </div>
                  <p className="font-medium text-gray-700">You haven't created any tokens on this network yet</p>
                  <p className="text-sm mt-1">Create your first token to see it here</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-customBlue/10 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-customBlue"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                  <p className="font-medium text-gray-700">No tokens match your search</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredTokens.map((token) => (
                <div
                  key={token.tokenAddress}
                  className="group relative overflow-hidden rounded-lg bg-white/25 border border-gray-200 shadow-sm"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-customBlue"></div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{token.name}</h3>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/25 text-gray-600 border border-gray-200 mt-1">
                          {token.symbol}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-gray-200 hover:bg-white/40 hover:border-gray-300"
                        onClick={() =>
                          window.open(`${selectedNetwork.explorer}/address/${token.tokenAddress}`, "_blank")
                        }
                      >
                        <ExternalLink className="h-4 w-4 text-gray-500" />
                        <span className="sr-only">View on Explorer</span>
                      </Button>
                    </div>

                    <div className="mt-4 space-y-2 bg-white/25 p-3 rounded-lg border border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Supply:</span>
                        <span className="font-medium text-gray-800">{formatSupply(token.totalSupply)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-gray-800">{formatAddress(token.tokenAddress)}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-gray-200 bg-[#f0e7db] hover:bg-[#f0e7db]/80 hover:text-gray-700 hover:border-gray-300 flex items-center justify-center"
                          onClick={() => copyToClipboard(token.tokenAddress)}
                        >
                          {copiedAddress === token.tokenAddress ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-gray-500" />
                          )}
                          <span className="ml-1.5 hidden sm:inline">Copy</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-gray-200 bg-[#f0e7db] hover:bg-[#f0e7db]/80 hover:text-gray-700 hover:border-gray-300 flex items-center justify-center"
                          onClick={() => openBurnDialog(token)}
                        >
                          <Flame className="h-3.5 w-3.5 text-gray-500" />
                          <span className="ml-1.5 hidden sm:inline">Burn</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-gray-200 bg-[#f0e7db] hover:bg-[#f0e7db]/80 hover:text-gray-700 hover:border-gray-300 flex items-center justify-center"
                          onClick={() => openSendDialog(token)}
                        >
                          <SendHorizontal className="h-3.5 w-3.5 text-gray-500" />
                          <span className="ml-1.5 hidden sm:inline">Send</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Burn Dialog */}
      <Dialog open={burnDialogOpen} onOpenChange={setBurnDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-xl">
          <DialogTitle className="flex items-center gap-2 text-gray-800 text-xl font-bold">
            <Flame className="h-6 w-6 text-red-500" />
            Burn {selectedToken?.symbol} Tokens
          </DialogTitle>

          <DialogDescription className="text-gray-500 mt-2">
            Burning tokens will permanently remove them from circulation. This action cannot be undone.
          </DialogDescription>

          <Form {...burnForm}>
            <form onSubmit={burnForm.handleSubmit(handleBurnSubmit)} className="space-y-6 mt-6">
              <FormField
                control={burnForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-lg font-medium">Amount to Burn</FormLabel>
                    <div className="flex space-x-2 mt-2">
                      <FormControl>
                        <Input
                          placeholder="Enter amount"
                          {...field}
                          className="bg-[#f0e7db]/50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-12 text-base rounded-lg"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => burnForm.setValue("amount", userTokenBalance)}
                        disabled={isLoadingBalance}
                        className="border-gray-200 bg-[#f0e7db] hover:bg-[#f0e7db]/80 text-gray-800 h-12 px-6 rounded-lg"
                      >
                        {isLoadingBalance ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Max
                          </>
                        )}
                      </Button>
                    </div>
                    <FormDescription className="text-gray-500 mt-2">
                      {isLoadingBalance ? (
                        <span className="text-sm flex items-center">
                          <Loader2 className="h-3 w-3 animate-spin mr-1" /> Loading balance...
                        </span>
                      ) : (
                        <span className="text-sm">
                          Your balance: {userTokenBalance} {selectedToken?.symbol}
                        </span>
                      )}
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setBurnDialogOpen(false)}
                  className="flex-1 border-gray-200 bg-[#f0e7db] hover:bg-[#f0e7db]/80 text-gray-800 h-12 rounded-lg"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white h-12 rounded-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Flame className="mr-2 h-5 w-5" />
                      Burn Tokens
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Send Dialog */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-xl">
          <DialogTitle className="flex items-center gap-2 text-gray-800 text-xl font-bold">
            <SendHorizontal className="h-6 w-6 text-blue-500" />
            Send {selectedToken?.symbol} Tokens
          </DialogTitle>

          <DialogDescription className="text-gray-500 mt-2">
            Transfer tokens to another wallet address.
          </DialogDescription>

          <Form {...sendForm}>
            <form onSubmit={sendForm.handleSubmit(handleSendSubmit)} className="space-y-6 mt-6">
              <FormField
                control={sendForm.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-lg font-medium">Recipient Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0x..."
                        {...field}
                        className="bg-[#f0e7db]/50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-12 text-base rounded-lg mt-2"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 mt-2">
                      Enter the wallet address to send tokens to
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={sendForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-lg font-medium">Amount to Send</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount"
                        {...field}
                        className="bg-[#f0e7db]/50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-12 text-base rounded-lg mt-2"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 mt-2">
                      Enter the number of tokens you want to send
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSendDialogOpen(false)}
                  className="flex-1 border-gray-200 bg-[#f0e7db] hover:bg-[#f0e7db]/80 text-gray-800 h-12 rounded-lg"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white h-12 rounded-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <SendHorizontal className="mr-2 h-5 w-5" />
                      Send Tokens
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

