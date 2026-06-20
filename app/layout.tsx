import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { MetaPixel } from "@/components/analytics/meta-pixel"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Epping Car Sales - Quality Used Cars",
  description:
    "Epping Car Sales - Trusted dealership for quality used cars at competitive prices. Browse our inventory or schedule a test drive today!",
  generator: "v0.dev",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}

        {process.env.NEXT_PUBLIC_META_PIXEL_ID && <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />}

        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton
            phoneNumber="+441992367909"
            message="Hello! I'm interested in learning more about your cars at Epping Car Sales."
          />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
