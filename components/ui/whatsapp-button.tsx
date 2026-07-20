"use client"

import { MessageCircle } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/analytics"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export function WhatsAppButton({
  phoneNumber,
  message = "Hello! I'm interested in your services.",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    trackWhatsAppClick()
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-30 flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500/50"
      aria-label="Contact us on WhatsApp Business"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}
