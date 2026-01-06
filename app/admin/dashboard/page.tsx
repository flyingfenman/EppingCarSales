import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default async function DashboardPage() {
  // Check if admin is logged in
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get("admin_logged_in")?.value === "true"

  if (!isLoggedIn) {
    redirect("/admin")
  }

  // Fetch all cars from database
  const supabase = await createClient()
  const { data: cars, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching cars:", error)
  }

  return <AdminDashboard initialCars={cars || []} />
}
