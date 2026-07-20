import UsedCarsClient from "@/components/used-cars-client"
import { getPublicCars } from "@/lib/cars"

export const metadata = {
  title: "Used Cars for Sale in Epping, Essex",
  description: "Browse quality used cars for sale at Epping Car Sales in Epping, Essex. View prices, mileage and photos, then reserve your chosen car online.",
  alternates: { canonical: "https://www.eppingcarsales.com/used-cars" },
  openGraph: {
    url: "https://www.eppingcarsales.com/used-cars",
    title: "Used Cars for Sale in Epping, Essex",
    description: "Browse quality used cars for sale at Epping Car Sales in Epping, Essex.",
  },
}

export const revalidate = 300

export default async function UsedCarsPage() {
  const cars = await getPublicCars()
  return <UsedCarsClient initialCars={cars} />
}
