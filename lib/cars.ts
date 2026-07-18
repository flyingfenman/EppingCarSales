import { unstable_cache } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"

export const getPublicCars = unstable_cache(
  async () => {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("cars")
      .select("id, slug, title, make, model, year, price, mileage, fuel_type, transmission, featured, sold, images, created_at")
      .order("created_at", { ascending: false })

    if (error) throw new Error(`Failed to fetch cars: ${error.message}`)
    return data ?? []
  },
  ["public-cars"],
  { revalidate: 300, tags: ["cars"] },
)

export const getFeaturedCars = unstable_cache(
  async () => {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("cars")
      .select("id, slug, title, year, price, mileage, fuel_type, transmission, featured, images")
      .eq("featured", true)
      .eq("sold", false)
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) throw new Error(`Failed to fetch featured cars: ${error.message}`)
    return data ?? []
  },
  ["featured-cars"],
  { revalidate: 300, tags: ["cars"] },
)

export const getCarByIdentifier = unstable_cache(
  async (identifier: string) => {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .or(`id.eq.${identifier},slug.eq.${identifier}`)
      .maybeSingle()

    if (error) throw new Error(`Failed to fetch car: ${error.message}`)
    return data
  },
  ["car-by-identifier"],
  { revalidate: 300, tags: ["cars"] },
)
