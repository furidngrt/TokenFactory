import type { Metadata } from "next"
import { DocumentationPage } from "@/components/documentation-page"

export const metadata: Metadata = {
  title: "Documentation | TokenFactory - Create and Deploy ERC20 Tokens",
  description:
    "Comprehensive documentation for TokenFactory. Learn how to create, deploy, and manage your ERC20 tokens across multiple blockchains.",
}

export default function Documentation() {
  return <DocumentationPage />
}

