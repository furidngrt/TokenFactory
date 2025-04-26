import Link from "next/link"
import { Github, Twitter, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-customBlue/10 bg-gradient-to-b from-background to-background/90 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-customBlue">TokenFactory</h2>
            <p className="mt-2 text-muted-foreground max-w-md">
              Create and deploy your own ERC20 tokens on multiple blockchains with just a few clicks. Fast, secure, and
              decentralized.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-customBlue transition-colors" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://twitter.com/0xtokenfactory" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-customBlue transition-colors" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://scfactory.xyz" target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5 text-muted-foreground hover:text-customBlue transition-colors" />
                <span className="sr-only">Website</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/documentation" className="text-muted-foreground hover:text-customBlue transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-customBlue transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-customBlue transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-customBlue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-customBlue transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground hover:text-customBlue transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-customBlue/10 pt-8 flex justify-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TokenFactory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

