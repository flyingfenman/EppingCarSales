// Helper functions to track conversions and events

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", eventName, params)
  }

  // Meta Pixel
  if (typeof window !== "undefined" && (window as any).fbq) {
    ;(window as any).fbq("track", eventName, params)
  }
}

// Track car view
export const trackCarView = (carId: string, carTitle: string, price: number) => {
  trackEvent("ViewContent", {
    content_type: "vehicle",
    content_ids: [carId],
    content_name: carTitle,
    value: price,
    currency: "GBP",
  })
}

// Track reservation start
export const trackReservationStart = (carId: string, carTitle: string, price: number) => {
  trackEvent("InitiateCheckout", {
    content_type: "vehicle",
    content_ids: [carId],
    content_name: carTitle,
    value: 99,
    currency: "GBP",
  })
}

// Track successful reservation
export const trackReservationComplete = (carId: string, carTitle: string) => {
  trackEvent("Purchase", {
    content_type: "vehicle_reservation",
    content_ids: [carId],
    content_name: carTitle,
    value: 99,
    currency: "GBP",
  })
}

// Track contact form submission
export const trackContactForm = (inquiryType: string) => {
  trackEvent("Contact", {
    method: "contact_form",
    inquiry_type: inquiryType,
  })
}

// Track phone call clicks
export const trackPhoneClick = (phoneNumber: string) => {
  trackEvent("Contact", {
    method: "phone",
    phone_number: phoneNumber,
  })
}

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  trackEvent("Contact", {
    method: "whatsapp",
  })
}

// Track search
export const trackSearch = (searchTerm: string) => {
  trackEvent("search", {
    search_term: searchTerm,
  })
}
