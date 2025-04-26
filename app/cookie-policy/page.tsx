import type { Metadata } from "next"
import { CookiePolicyPage } from "@/components/cookie-policy-page"

export const metadata: Metadata = {
  title: "Cookie Policy | TokenFactory - Create and Deploy ERC20 Tokens",
  description: "TokenFactory's Cookie Policy. Learn how we use cookies and similar technologies on our platform.",
}

export default function CookiePolicy() {
  return <CookiePolicyPage />
}

