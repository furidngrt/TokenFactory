import type React from "react"
import type { Metadata } from "next"
import { M_PLUS_Rounded_1c } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const mplusRounded = M_PLUS_Rounded_1c({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mplus-rounded",
})

export const metadata: Metadata = {
  title: "TokenFactory | Create and Deploy ERC20 Tokens on Multiple Blockchains",
  description:
    "Create your own ERC20 tokens on multiple blockchains including Berachain, Soneium, Ink, and more with just a few clicks. Fast, secure, and decentralized token creation platform.",
  keywords:
    "token creator, ERC20, blockchain, crypto tokens, token factory, token generator, create token, deploy token, cryptocurrency, web3",
  authors: [{ name: "TokenFactory Team" }],
  openGraph: {
    title: "TokenFactory | Create and Deploy ERC20 Tokens on Multiple Blockchains",
    description:
      "Create your own ERC20 tokens on multiple blockchains including Berachain, Soneium, Ink, and more with just a few clicks.",
    url: "https://tokenfactory.com",
    siteName: "TokenFactory",
    images: [
      {
        url: "https://raw.githubusercontent.com/furidngrt/TokenFactory/refs/heads/master/public/favicon.svg",
        width: 800,
        height: 600,
        alt: "TokenFactory Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokenFactory | Create and Deploy ERC20 Tokens on Multiple Blockchains",
    description:
      "Create your own ERC20 tokens on multiple blockchains including Berachain, Soneium, Ink, and more with just a few clicks.",
    images: ["https://raw.githubusercontent.com/furidngrt/TokenFactory/refs/heads/master/public/favicon.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-icon.png" },
    other: [{ rel: "icon", url: "/icon1.png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${mplusRounded.className} bg-[#f0e7db]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          <div className="pt-16">{children}</div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

