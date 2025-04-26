"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NetworkSelector } from "@/components/network-selector-dropdown"
import { WalletConnect } from "@/components/wallet-connect"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "My Tokens", href: "/tokens" },
    { name: "MONAD DEX", href: "https://swap.scfactory.xyz/" },

  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#f0e7db]/70 backdrop-blur-lg border-b border-customBlue/20 shadow-[0_0_15px_rgba(39,100,193,0.15)]"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-customBlue">TokenFactory</span>
            </Link>

            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === link.href
                      ? "text-customBlue bg-customBlue/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-customBlue/5",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <NetworkSelector />
            <WalletConnect />
          </div>

          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2 bg-[#f0e7db]/95 backdrop-blur-lg border-b border-customBlue/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md",
                  pathname === link.href
                    ? "text-customBlue bg-customBlue/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-customBlue/5",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <div className="flex flex-col space-y-3">
                <NetworkSelector />
                <WalletConnect />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

