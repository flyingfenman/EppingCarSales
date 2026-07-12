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

const BASE_URL = "https://www.eppingcarsales.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Epping Car Sales | Used Cars in Epping, Essex",
    template: "%s | Epping Car Sales",
  },
  description:
    "Epping Car Sales — your local used car dealership in Epping, Essex. Quality second-hand cars at great prices. Browse our stock, reserve online or visit us today.",
  keywords: [
    "Epping Car Sales",
    "used cars Epping",
    "second hand cars Epping",
    "used cars Essex",
    "car dealership Epping",
    "cheap used cars Essex",
    "buy used car Epping",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BASE_URL,
    siteName: "Epping Car Sales",
    title: "Epping Car Sales | Used Cars in Epping, Essex",
    description:
      "Your local used car dealership in Epping, Essex. Quality second-hand cars at great prices. Browse our stock online.",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Epping Car Sales",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Epping Car Sales | Used Cars in Epping, Essex",
    description: "Your local used car dealership in Epping, Essex. Quality second-hand cars at great prices.",
    images: ["/web-app-manifest-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Epping Car Sales",
              url: "https://www.eppingcarsales.com",
              logo: "https://www.eppingcarsales.com/web-app-manifest-512x512.png",
              image: "https://www.eppingcarsales.com/web-app-manifest-512x512.png",
              description: "Quality used car dealership in Epping, Essex.",
              telephone: "+441992367909",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Epping",
                addressRegion: "Essex",
                addressCountry: "GB",
              },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "17:00" },
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
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
