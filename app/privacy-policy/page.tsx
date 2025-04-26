import type { Metadata } from "next"
import { PrivacyPolicyPage } from "@/components/privacy-policy-page"

export const metadata: Metadata = {
  title: "Privacy Policy | TokenFactory - Create and Deploy ERC20 Tokens",
  description: "TokenFactory's Privacy Policy. Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />
}

