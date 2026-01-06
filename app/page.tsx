import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import HomeClient from "@/components/home-client"

async function getFeaturedCars() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    },
  )

  const { data: cars } = await supabase.from("cars").select("*").eq("featured", true).eq("sold", false).limit(3)

  return cars || []
}

export default async function Home() {
  const featuredCars = await getFeaturedCars()
  return <HomeClient featuredCars={featuredCars} />
}
