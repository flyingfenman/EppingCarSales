"use client"

import { useCallback, useEffect } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { startReservationCheckout } from "@/app/actions/stripe"
import { trackReservationStart } from "@/lib/analytics"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function ReservationCheckout({
  carId,
  carTitle,
  price,
}: {
  carId: string
  carTitle: string
  price?: number
}) {
  const startCheckout = useCallback(() => startReservationCheckout(carId, carTitle), [carId, carTitle])

  useEffect(() => {
    trackReservationStart(carId, carTitle, price || 0)
  }, [carId, carTitle, price])

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret: startCheckout }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
