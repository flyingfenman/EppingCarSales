import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import CarDetailsClient from "@/components/car-details-client"
import { getCarByIdentifier, getPublicCars } from "@/lib/cars"

const BASE_URL = "https://www.eppingcarsales.com"

export const revalidate = 300

interface PageProps {
  params: Promise<{ id: string }>
}

function carDescription(car: Record<string, any>) {
  const details = [
    car.year,
    car.make,
    car.model,
    car.fuel_type,
    car.transmission,
    car.mileage ? `${Number(car.mileage).toLocaleString("en-GB")} miles` : null,
    car.price ? `£${Number(car.price).toLocaleString("en-GB")}` : null,
  ].filter(Boolean)

  return `${details.join(" · ")} for sale at Epping Car Sales in Epping, Essex.`
}

export async function generateStaticParams() {
  const cars = await getPublicCars()
  return cars.filter((car) => !car.sold && car.slug).map((car) => ({ id: car.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const car = await getCarByIdentifier(id)

  if (!car) {
    return { title: "Car Not Found", robots: { index: false, follow: false } }
  }

  const canonicalIdentifier = car.slug || car.id
  const url = `${BASE_URL}/used-cars/${canonicalIdentifier}`
  const title = `${car.title} for Sale in Epping, Essex`
  const description = carDescription(car)
  const image = car.images?.[0] || "/web-app-manifest-512x512.png"

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: image, alt: `${car.title} for sale` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { id } = await params
  const car = await getCarByIdentifier(id)

  if (!car) notFound()
  if (car.slug && id !== car.slug) permanentRedirect(`/used-cars/${car.slug}`)

  const url = `${BASE_URL}/used-cars/${car.slug || car.id}`
  const image = car.images?.[0]
  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: car.title,
    url,
    image: car.images || [],
    description: carDescription(car),
    vehicleModelDate: car.year?.toString(),
    manufacturer: { "@type": "Organization", name: car.make },
    model: car.model,
    mileageFromOdometer: car.mileage
      ? { "@type": "QuantitativeValue", value: car.mileage, unitCode: "SMI" }
      : undefined,
    fuelType: car.fuel_type,
    vehicleTransmission: car.transmission,
    color: car.color,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: car.price,
      availability: car.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url,
      itemCondition: "https://schema.org/UsedCondition",
      seller: { "@type": "AutoDealer", name: "Epping Car Sales" },
    },
  }
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Used Cars", item: `${BASE_URL}/used-cars` },
      { "@type": "ListItem", position: 3, name: car.title, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CarDetailsClient car={car} />
    </>
  )
}
