"use client"

import { useCallback, useEffect, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe, type Stripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"

import { startReservationCheckout } from "@/app/actions/stripe"
import { trackReservationStart } from "@/lib/analytics"

export default function ReservationCheckout({
  carId,
  carTitle,
  carPrice,
}: {
  carId: string
  carTitle: string
  carPrice?: number
}) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleReserveClick = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/stripe-key")
      const data = await res.json()

      if (!res.ok || !data.publishableKey) {
        throw new Error("Stripe not configured")
      }

      setStripePromise(loadStripe(data.publishableKey))
      setShowCheckout(true)
    } catch (err) {
      setError("Unable to initialize payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const startCheckout = useCallback(async () => {
    try {
      const clientSecret = await startReservationCheckout(carId, carTitle)
      if (!clientSecret) throw new Error("Payment session could not be created")
      return clientSecret
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout")
      throw err
    }
  }, [carId, carTitle])

  useEffect(() => {
    if (showCheckout) {
      trackReservationStart(carId, carTitle, carPrice || 0)
    }
  }, [carId, carTitle, carPrice, showCheckout])

  if (!showCheckout) {
    return (
      <div className="w-full">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <Button
          onClick={handleReserveClick}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? "Loading..." : "Reserve for £99"}
        </Button>
      </div>
    )
  }

  if (!stripePromise) {
    return (
      <div className="w-full">
        <p className="text-red-500 text-sm mb-2">Unable to load payment system. Please refresh and try again.</p>
        <Button onClick={() => setShowCheckout(false)} variant="outline" className="w-full">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret: startCheckout }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
