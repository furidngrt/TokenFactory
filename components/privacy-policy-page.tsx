"use client"

import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="mb-6 relative w-16 h-16 bg-customBlue/10 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-customBlue" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-customBlue mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">Last updated: March 20, 2025</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 md:p-8 shadow-sm mb-8">
            <div className="prose max-w-none text-gray-700">
              <p className="lead text-lg">
                This Privacy Policy describes how TokenFactory ("we", "us", or "our") collects, uses, and discloses your
                personal information when you visit or use our website and services.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Information We Collect</h2>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Personal Information</h3>
              <p>
                When you use TokenFactory, we may collect certain personally identifiable information, including but not
                limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Blockchain wallet addresses</li>
                <li>Transaction data</li>
                <li>IP addresses</li>
                <li>Device information</li>
                <li>Usage data</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Non-Personal Information</h3>
              <p>We also collect non-personal information that does not directly identify you. This may include:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Time and date of your visit</li>
                <li>Pages of our website that you visit</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Providing and maintaining our services</li>
                <li>Improving and personalizing your experience</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Communicating with you about updates or changes</li>
                <li>Ensuring the security and integrity of our platform</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Blockchain Data</h2>
              <p>
                Please note that blockchain technology is inherently transparent and public. When you create or interact
                with tokens on a blockchain through our platform, certain information such as your wallet address and
                transaction details are publicly visible on the blockchain. This information is not controlled by us and
                cannot be removed or modified once recorded on the blockchain.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
              <p>
                For more information about the cookies we use, please see our{" "}
                <Link href="/cookie-policy" className="text-customBlue hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Data Sharing and Disclosure</h2>
              <p>We may share your personal information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>With Service Providers:</strong> We may share your information with third-party vendors,
                  service providers, and other partners who help us deliver our services.
                </li>
                <li>
                  <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in
                  response to valid requests by public authorities.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing,
                  or acquisition of all or a portion of our business.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your information for any other purpose with your
                  consent.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Data Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the
                Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your personal information, we cannot guarantee its absolute security.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>The right to access the personal information we have about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to or restrict processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section
                below.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Children's Privacy</h2>
              <p>
                Our service is not intended for use by children under the age of 18. We do not knowingly collect
                personally identifiable information from children under 18. If you are a parent or guardian and you are
                aware that your child has provided us with personal information, please contact us.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy. You
                are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>By email: privacy@scfactory.xyz</li>
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
              This privacy policy is for informational purposes only. It does not create any contractual or legal
              rights.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

