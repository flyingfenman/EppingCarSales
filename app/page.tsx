import HomeClient from "@/components/home-client"
import { getFeaturedCars } from "@/lib/cars"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Epping Car Sales | Used Cars in Epping, Essex",
  description:
    "Welcome to Epping Car Sales — your local used car dealership in Epping, Essex. Browse quality second-hand cars at great prices and reserve online today.",
  alternates: {
    canonical: "https://www.eppingcarsales.com",
  },
  openGraph: {
    url: "https://www.eppingcarsales.com",
    title: "Epping Car Sales | Used Cars in Epping, Essex",
    description: "Your local used car dealership in Epping, Essex. Quality second-hand cars at great prices.",
  },
}

export const revalidate = 300

export default async function Home() {
  const featuredCars = await getFeaturedCars()
  return <HomeClient featuredCars={featuredCars} />
}
