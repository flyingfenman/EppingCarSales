"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, LogOut, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { deleteCar, toggleCarSold, toggleCarFeatured } from "@/app/actions/cars"

interface Car {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuel_type: string
  transmission: string
  images: string[]
  sold: boolean
  featured: boolean
}

export default function AdminDashboard({ initialCars }: { initialCars: Car[] }) {
  const [cars, setCars] = useState(initialCars)
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = "admin_logged_in=; path=/; max-age=0"
    router.push("/admin")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return

    try {
      await deleteCar(id)
      setCars(cars.filter((car) => car.id !== id))
      router.refresh()
    } catch (error: any) {
      alert("Error deleting car: " + error.message)
    }
  }

  const handleToggleSold = async (id: string, currentStatus: boolean) => {
    try {
      await toggleCarSold(id, !currentStatus)
      setCars(cars.map((car) => (car.id === id ? { ...car, sold: !currentStatus } : car)))
      router.refresh()
    } catch (error: any) {
      alert("Error updating car: " + error.message)
    }
  }

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await toggleCarFeatured(id, !currentStatus)
      setCars(cars.map((car) => (car.id === id ? { ...car, featured: !currentStatus } : car)))
      router.refresh()
    } catch (error: any) {
      alert("Error updating car: " + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your car inventory</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/dashboard/add">
              <Button className="bg-gjc-yellow hover:bg-gjc-yellow-hover text-black">
                <Plus className="mr-2 h-4 w-4" />
                Add New Car
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Cars</CardDescription>
              <CardTitle className="text-3xl">{cars.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Available</CardDescription>
              <CardTitle className="text-3xl">{cars.filter((car) => !car.sold).length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Sold</CardDescription>
              <CardTitle className="text-3xl">{cars.filter((car) => car.sold).length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Featured</CardDescription>
              <CardTitle className="text-3xl">{cars.filter((car) => car.featured).length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Cars List */}
        <Card>
          <CardHeader>
            <CardTitle>All Vehicles</CardTitle>
            <CardDescription>View and manage all your car listings</CardDescription>
          </CardHeader>
          <CardContent>
            {cars.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No cars in inventory. Click "Add New Car" to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {/* Car Image */}
                    <div className="w-32 h-24 relative flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                      {car.images && car.images[0] ? (
                        <Image
                          src={car.images[0] || "/placeholder.svg"}
                          alt={car.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                      )}
                    </div>

                    {/* Car Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{car.title}</h3>
                        {car.sold && (
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            SOLD
                          </Badge>
                        )}
                        {car.featured && <Badge className="bg-gjc-yellow text-black">FEATURED</Badge>}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {car.year} | {car.fuel_type} | {car.transmission} | {car.mileage.toLocaleString()} miles
                      </p>
                      <p className="text-lg font-bold mt-1">£{car.price.toLocaleString()}</p>
                    </div>

                    {/* Actions - Added featured toggle button */}
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleToggleSold(car.id, car.sold)}>
                        {car.sold ? "Mark Available" : "Mark Sold"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleFeatured(car.id, car.featured)}
                        className={car.featured ? "bg-gjc-yellow text-black hover:bg-gjc-yellow-hover" : ""}
                      >
                        <Star className={`h-4 w-4 ${car.featured ? "fill-current" : ""}`} />
                      </Button>
                      <Link href={`/admin/dashboard/edit/${car.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(car.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
