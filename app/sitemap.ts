import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

const BASE_URL = "https://www.eppingcarsales.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/used-cars`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/finance`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Dynamic car listing pages
  try {
    const supabase = await createClient()
    const { data: cars } = await supabase
      .from("cars")
      .select("id, updated_at")
      .eq("sold", false)

    const carRoutes: MetadataRoute.Sitemap = (cars || []).map((car) => ({
      url: `${BASE_URL}/used-cars/${car.id}`,
      lastModified: car.updated_at ? new Date(car.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

    return [...staticRoutes, ...carRoutes]
  } catch {
    return staticRoutes
  }
}
