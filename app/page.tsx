import { TokenCreator } from "@/components/token-creator"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="mb-6 relative w-24 h-24">
            <Image
              src="https://raw.githubusercontent.com/furidngrt/TokenFactory/refs/heads/master/public/favicon.svg"
              alt="TokenFactory Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-customBlue mb-6">Create Your Own Token</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Deploy ERC20 tokens on multiple blockchains with just a few clicks. Fast, secure, and decentralized.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#create">
              <Button size="lg" className="bg-customBlue hover:bg-customBlue/90 text-white">
                Create Token
              </Button>
            </Link>
            <Link href="/tokens">
              <Button size="lg" variant="outline" className="border-customBlue/20 hover:bg-customBlue/10">
                View My Tokens
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#3b6bce] flex items-center justify-center mb-4">
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
                className="text-white"
              >
                <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"></path>
                <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"></path>
                <line x1="12" y1="22" x2="12" y2="13"></line>
                <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Multiple Networks</h3>
            <p className="text-gray-600">
              Deploy your tokens on various blockchain networks including Berachain, Soneium, Ink, and more.
            </p>
          </div>

          <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#3b6bce] flex items-center justify-center mb-4">
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
                className="text-white"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Secure & Reliable</h3>
            <p className="text-gray-600">
              Our smart contracts are audited and secure. Your tokens are deployed directly to the blockchain with no
              intermediaries.
            </p>
          </div>

          <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#3b6bce] flex items-center justify-center mb-4">
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
                className="text-white"
              >
                <path d="M12 2v4"></path>
                <path d="M12 18v4"></path>
                <path d="M4.93 4.93l2.83 2.83"></path>
                <path d="M16.24 16.24l2.83 2.83"></path>
                <path d="M2 12h4"></path>
                <path d="M18 12h4"></path>
                <path d="M4.93 19.07l2.83-2.83"></path>
                <path d="M16.24 7.76l2.83-2.83"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Easy to Use</h3>
            <p className="text-gray-600">
              No coding required. Simply fill in the details, connect your wallet, and deploy your token in minutes.
            </p>
          </div>
        </div>

        <div id="create" className="max-w-xl mx-auto">
          <TokenCreator />
        </div>
      </div>
    </main>
  )
}

