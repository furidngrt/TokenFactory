"use client"

import { useEffect, useState } from "react"
import { TokenList } from "@/components/token-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useWalletStore } from "@/lib/stores/wallet-store"

export default function TokensPageClient() {
  const { isConnected } = useWalletStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-customBlue">Your Tokens</h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Manage all your created tokens across different blockchain networks.
            </p>
          </div>
          <Link href="/#create">
            <Button className="bg-customBlue hover:bg-customBlue/90 text-white shadow-md hover:shadow-lg transition-all">
              <Plus className="mr-2 h-4 w-4" />
              Create New Token
            </Button>
          </Link>
        </div>

        <TokenList />
      </div>
    </main>
  )
}

