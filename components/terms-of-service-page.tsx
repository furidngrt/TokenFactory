"use client"

import Link from "next/link"
import { FileText, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="mb-6 relative w-16 h-16 bg-customBlue/10 rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-customBlue" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-customBlue mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">Last updated: March 20, 2025</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 md:p-8 shadow-sm mb-8">
            <div className="prose max-w-none text-gray-700">
              <p className="lead text-lg">
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the TokenFactory
                website and platform.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using TokenFactory, you agree to be bound by these Terms and our Privacy Policy. If you
                disagree with any part of the terms, you may not access or use our services.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Description of Service</h2>
              <p>
                TokenFactory is a platform that allows users to create and deploy ERC20 tokens on various blockchain
                networks. Our services include token creation, management, and related functionalities.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. User Accounts and Wallet Connection</h2>
              <p>
                To use certain features of our platform, you may need to connect a blockchain wallet. You are
                responsible for maintaining the security of your wallet and any activities that occur through your
                wallet connection.
              </p>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide accurate and complete information when connecting your wallet</li>
                <li>Maintain the security of your wallet and private keys</li>
                <li>Accept all risks associated with using blockchain technology and cryptocurrency</li>
                <li>Promptly notify us of any unauthorized use of your wallet or any other breach of security</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. User Responsibilities</h2>
              <p>When using TokenFactory, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Create tokens that infringe on intellectual property rights</li>
                <li>Create tokens that constitute securities without proper registration or exemption</li>
                <li>Attempt to interfere with, compromise, or disrupt our services</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Use our services to engage in fraudulent activities</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Intellectual Property</h2>
              <p>
                The TokenFactory platform, including its content, features, and functionality, is owned by us and is
                protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Reproduce, distribute, modify, or create derivative works of our platform</li>
                <li>Remove any copyright or other proprietary notices</li>
                <li>Use our trademarks, logos, or service marks without our prior written consent</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Token Creation and Ownership</h2>
              <p>When you create a token using TokenFactory:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>You are the owner of the token and its smart contract</li>
                <li>You are responsible for the token's name, symbol, and other parameters</li>
                <li>You are responsible for complying with all applicable laws and regulations</li>
                <li>You assume all risks associated with creating and distributing tokens</li>
              </ul>
              <p>
                We do not claim ownership of the tokens you create, but we reserve the right to remove tokens from our
                interface that violate these Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Fees and Payments</h2>
              <p>
                Using TokenFactory may require payment of blockchain network fees (gas fees) to execute transactions.
                These fees are not paid to us but to the network validators. You are responsible for all gas fees
                incurred when using our services.
              </p>
              <p>
                We may introduce service fees in the future. If we do, we will provide notice and update these Terms
                accordingly.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Disclaimer of Warranties</h2>
              <p>
                TokenFactory is provided "as is" and "as available" without any warranties of any kind, either express
                or implied. We do not warrant that our services will be uninterrupted, secure, or error-free.
              </p>
              <p>
                We do not guarantee the accuracy, completeness, or reliability of any tokens created through our
                platform. You acknowledge that you use our services at your own risk.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising
                out of or in connection with your use of our services.
              </p>
              <p>
                Our liability is limited to the maximum extent permitted by law, regardless of the cause of action,
                whether in contract, tort, or otherwise.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless TokenFactory, its affiliates, officers, directors,
                employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including
                reasonable attorneys' fees, arising out of or in any way connected with your access to or use of our
                services, your violation of these Terms, or your violation of any rights of another.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">11. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by
                posting the updated Terms on this page and updating the "Last updated" date. Your continued use of our
                services after any such changes constitutes your acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">12. Termination</h2>
              <p>
                We may terminate or suspend your access to our services immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use our services will immediately cease. All provisions of these Terms
                which by their nature should survive termination shall survive termination.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction],
                without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">14. Dispute Resolution</h2>
              <p>
                Any disputes arising out of or relating to these Terms or our services shall be resolved through binding
                arbitration in accordance with the rules of [Arbitration Association] in [Your Jurisdiction].
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">15. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>By email: legal@scfactory.xyz</li>
                <li>By visiting the contact page on our website</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center mb-12">
            <Link href="/">
              <Button variant="outline" className="border-customBlue/20 text-customBlue hover:bg-customBlue/5">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-gray-500 mb-8">
            <p>
              By using TokenFactory, you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

