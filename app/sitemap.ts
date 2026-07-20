import type { MetadataRoute } from "next"
import { getPublicCars } from "@/lib/cars"

const BASE_URL = "https://www.eppingcarsales.com"

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/used-cars`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/finance`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ]

  try {
    const cars = await getPublicCars()
    const carRoutes: MetadataRoute.Sitemap = cars
      .filter((car) => !car.sold)
      .map((car) => ({
        url: `${BASE_URL}/used-cars/${car.slug || car.id}`,
        lastModified: car.created_at ? new Date(car.created_at) : undefined,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))

    return [...staticRoutes, ...carRoutes]
  } catch {
    return staticRoutes
  }
}
