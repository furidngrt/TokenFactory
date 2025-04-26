import type { Metadata } from "next"
import { TermsOfServicePage } from "@/components/terms-of-service-page"

export const metadata: Metadata = {
  title: "Terms of Service | TokenFactory - Create and Deploy ERC20 Tokens",
  description: "TokenFactory's Terms of Service. Understand the rules and guidelines for using our platform.",
}

export default function TermsOfService() {
  return <TermsOfServicePage />
}

