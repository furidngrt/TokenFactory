"use client"

import Link from "next/link"
import { Cookie, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="mb-6 relative w-16 h-16 bg-customBlue/10 rounded-full flex items-center justify-center">
            <Cookie className="h-8 w-8 text-customBlue" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-customBlue mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Last updated: March 20, 2025
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/25 border border-gray-200/50 rounded-xl p-6 md:p-8 shadow-sm mb-8">
            <div className="prose max-w-none text-gray-700">
              <p className="lead text-lg">
                This Cookie Policy explains how TokenFactory ("we", "us", or "our") uses cookies and similar technologies on our website and platform.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit websites. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is used.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Types of Cookies We Use</h2>
              <p>
                We use different types of cookies for various purposes:
              </p>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.
              </p>
              <table className="min-w-full border border-gray-200 rounded-lg mb-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Cookie Name</th>
                    <th className="py-2 px-4 border-b text-left">Purpose</th>
                    <th className="py-2 px-4 border-b text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">session_id</td>
                    <td className="py-2 px-4 border-b">Maintains your session state</td>
                    <td className="py-2 px-4 border-b">Session</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">csrf_token</td>
                    <td className="py-2 px-4 border-b">Prevents cross-site request forgery</td>
                    <td className="py-2 px-4 border-b">Session</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Performance Cookies</h3>
              <p>
                These cookies collect information about how you use our website, such as which pages you visit most often and if you encounter any errors. This data helps us improve how our website works.
              </p>
              <table className="min-w-full border border-gray-200 rounded-lg mb-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Cookie Name</th>
                    <th className="py-2 px-4 border-b text-left">Purpose</th>
                    <th className="py-2 px-4 border-b text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">_ga</td>
                    <td className="py-2 px-4 border-b">Google Analytics - Distinguishes users</td>
                    <td className="py-2 px-4 border-b">2 years</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">_gid</td>
                    <td className="py-2 px-4 border-b">Google Analytics - Distinguishes users</td>
                    <td className="py-2 px-4 border-b">24 hours</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">_gat</td>
                    <td className="py-2 px-4 border-b">Google Analytics - Throttles request rate</td>
                    <td className="py-2 px-4 border-b">1 minute</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Functionality Cookies</h3>
              <p>
                These cookies allow the website to remember choices you make and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages.
              </p>
              <table className="min-w-full border border-gray-200 rounded-lg mb-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Cookie Name</th>
                    <th className="py-2 px-4 border-b text-left">Purpose</th>
                    <th className="py-2 px-4 border-b text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">selected_network</td>
                    <td className="py-2 px-4 border-b">Remembers your selected blockchain network</td>
                    <td className="py-2 px-4 border-b">30 days</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">theme_preference</td>
                    <td className="py-2 px-4 border-b">Remembers your theme preference</td>
                    <td className="py-2 px-4 border-b">1 year</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Targeting/Advertising Cookies</h3>
              <p>
                These cookies are used to track visitors across websites. They are used to display ads that are relevant and engaging for individual users and thereby more valuable for publishers and third-party advertisers.
              </p>
              <table className="min-w-full border border-gray-200 rounded-lg mb-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Cookie Name</th>
                    <th className="py-2 px-4 border-b text-left">Purpose</th>
                    <th className="py-2 px-4 border-b text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">_fbp</td>
                    <td className="py-2 px-4 border-b">Facebook Pixel - Identifies browsers for ad targeting</td>
                    <td className="py-2 px-4 border-b">3 months</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Google Analytics</li>
                <li>Facebook Pixel</li>
                <li>Twitter Pixel</li>
                <li>Other analytics and advertising services</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Web3 and Blockchain-Related Storage</h2>
              <p>
                When you connect your blockchain wallet to our platform, we may store certain information in your browser's local storage to enhance your experience. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Wallet connection status</li>
                <li>Network preferences</li>
                <li>Transaction history</li>
              </ul>
              <p>
                This information is stored locally on your device and is not transmitted to our servers. It helps provide a seamless experience when interacting with blockchain networks.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Managing Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies and site data</li>
              </ul>

              <p>
                Please note that restricting cookies may impact the functionality of our website. If you disable cookies, some features of TokenFactory may not work properly.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Cookie Consent</h2>
              <p>
                When you first visit our website, you will be shown a cookie banner that allows you to accept or decline non-essential cookies. You can change your preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Changes to This Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date at the top of this policy.
              </p>
              <p>
                You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us:
              </p>
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
              This cookie policy is for informational purposes only. It does not create any contractual or legal rights.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CookiePolicyPage;