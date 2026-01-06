"use server"

import { stripe } from "@/lib/stripe"

export async function startReservationCheckout(carId: string, carTitle: string) {
  if (!stripe) {
    throw new Error("Stripe is not configured. Please add your Stripe API keys.")
  }

  // £99 reservation fee (in pence)
  const reservationPriceInPence = 9900

  // Create Checkout Sessions
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: `Car Reservation - ${carTitle}`,
            description: `Reserve this vehicle with a £99 deposit. Car ID: ${carId}`,
          },
          unit_amount: reservationPriceInPence,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      carId: carId,
      carTitle: carTitle,
      reservationType: "car-reservation",
    },
  })

  return session.client_secret
}
