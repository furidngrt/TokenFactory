"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useNetworkStore } from "@/lib/stores/network-store"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { createToken } from "@/lib/token-service"

const formSchema = z.object({
  name: z.string().min(1, "Token name is required"),
  symbol: z
    .string()
    .min(1, "Token symbol is required")
    .max(8, "Symbol should be 8 characters or less")
    .regex(/^[A-Z0-9]+$/, "Symbol must be uppercase letters and numbers only"),
  totalSupply: z
    .string()
    .min(1, "Total supply is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Must be greater than 0"),
})

type FormValues = z.infer<typeof formSchema>

export function TokenCreator() {
  const [isCreating, setIsCreating] = useState(false)
  const { selectedNetwork } = useNetworkStore()
  const { address, isConnected } = useWalletStore()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      totalSupply: "",
    },
  })

  async function onSubmit(values: FormValues) {
    if (!selectedNetwork) {
      toast({
        title: "Network Required",
        description: "Please select a network first",
        variant: "destructive",
      })
      return
    }

    if (!isConnected || !address) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    try {
      setIsCreating(true)

      const result = await createToken({
        name: values.name,
        symbol: values.symbol,
        totalSupply: values.totalSupply,
        owner: address,
        network: selectedNetwork,
      })

      // Format the explorer URL correctly
      const getExplorerUrl = (txOrAddress: string) => {
        const baseUrl = selectedNetwork.explorer.endsWith("/")
          ? selectedNetwork.explorer.slice(0, -1)
          : selectedNetwork.explorer

        // Check if it's a transaction hash or token address
        const path = txOrAddress.length === 66 ? "tx" : "address"
        return `${baseUrl}/${path}/${txOrAddress}`
      }

      // For all networks, show the clickable explorer link
      toast({
        title: "Token Created!",
        description: (
          <>
            Your token {values.symbol} has been created successfully.{" "}
            <a
              href={getExplorerUrl(result)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on explorer
            </a>
          </>
        ),
      })

      form.reset()
    } catch (error) {
      console.error("Error creating token:", error)
      toast({
        title: "Creation Failed",
        description: error instanceof Error ? error.message : "Failed to create token",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Card className="bg-white/25 border border-gray-200/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Create Token</CardTitle>
        <CardDescription>Deploy your own ERC20 token with custom parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Awesome Token"
                      {...field}
                      className="bg-white/25 border-customBlue/20 focus-visible:ring-customBlue/30"
                    />
                  </FormControl>
                  <FormDescription>The full name of your token</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Symbol</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MAT"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      className="bg-white/25 border-customBlue/20 focus-visible:ring-customBlue/30"
                    />
                  </FormControl>
                  <FormDescription>A short identifier (usually 3-5 characters)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalSupply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Supply</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1000000"
                      {...field}
                      className="bg-white/25 border-customBlue/20 focus-visible:ring-customBlue/30"
                    />
                  </FormControl>
                  <FormDescription>The total number of tokens to create</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-customBlue hover:bg-customBlue/90 text-white"
              disabled={isCreating || !isConnected || !selectedNetwork}
            >
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isCreating ? "Creating..." : "Create Token"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Network: {selectedNetwork?.name || "Not selected"}</p>
        <p>Gas fees will apply</p>
      </CardFooter>
    </Card>
  )
}

