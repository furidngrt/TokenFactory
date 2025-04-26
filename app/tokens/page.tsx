import type { Metadata } from "next"
import TokensPageClient from "./TokenPageClient"

export const metadata: Metadata = {
  title: "Your Tokens | TokenFactory - Manage Your ERC20 Tokens",
  description:
    "View and manage all your created ERC20 tokens across different blockchain networks. TokenFactory makes it easy to track and manage your tokens.",
}

export default function TokensPage() {
  return <TokensPageClient />
}

