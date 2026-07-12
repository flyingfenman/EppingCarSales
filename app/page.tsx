import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import HomeClient from "@/components/home-client"
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
