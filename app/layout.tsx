import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GJC500 - Premier Car Dealership",
  description:
    "GJC500 - Premier dealership for quality used cars at competitive prices. Browse our inventory or schedule a test drive today!",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton
            phoneNumber="+447376624097"
            message="Hello! I'm interested in learning more about your cars at GJC500."
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
