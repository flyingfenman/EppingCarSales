import { createClient } from "@/lib/supabase/server"
import UsedCarsClient from "@/components/used-cars-client"

export const metadata = {
  title: "Used Cars for Sale | Epping Car Sales",
  description: "Browse our selection of quality used cars at competitive prices.",
}

export default async function UsedCarsPage() {
  const supabase = await createClient()
  const { data: cars, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching cars:", error)
  }

  return <UsedCarsClient initialCars={cars || []} />
}

// The rest of the existing code is now moved to the UsedCarsClient component.
// This page component will now be responsible for fetching data and passing it to the client component.
