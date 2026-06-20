"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export type CarFormData = {
  title: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuel_type: string
  transmission: string
  body_type?: string
  engine_size?: string
  color?: string
  doors?: number
  seats?: number
  description?: string
  features?: string[]
  images: string[]
  youtube_url?: string
  sold?: boolean
  featured?: boolean
}

export async function createCar(data: CarFormData) {
  const supabase = createAdminClient()

  const { data: car, error } = await supabase.from("cars").insert([data]).select().single()

  if (error) {
    throw new Error(`Failed to create car: ${error.message}`)
  }

  revalidatePath("/used-cars")
  revalidatePath("/admin/dashboard")

  return car
}

export async function updateCar(id: string, data: Partial<CarFormData>) {
  const supabase = createAdminClient()

  const { data: car, error } = await supabase.from("cars").update(data).eq("id", id).select().single()

  if (error) {
    throw new Error(`Failed to update car: ${error.message}`)
  }

  revalidatePath("/used-cars")
  revalidatePath(`/used-cars/${id}`)
  revalidatePath("/admin/dashboard")

  return car
}

export async function deleteCar(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase.from("cars").delete().eq("id", id)

  if (error) {
    throw new Error(`Failed to delete car: ${error.message}`)
  }

  revalidatePath("/used-cars")
  revalidatePath("/admin/dashboard")

  return { success: true }
}

export async function toggleCarSold(id: string, sold: boolean) {
  return updateCar(id, { sold })
}

export async function toggleCarFeatured(id: string, featured: boolean) {
  return updateCar(id, { featured })
}

export async function getCars() {
  const supabase = await createClient()

  const { data: cars, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch cars: ${error.message}`)
  }

  return cars
}

export async function getCar(id: string) {
  const supabase = await createClient()

  const { data: car, error } = await supabase.from("cars").select("*").eq("id", id).single()

  if (error) {
    throw new Error(`Failed to fetch car: ${error.message}`)
  }

  return car
}
