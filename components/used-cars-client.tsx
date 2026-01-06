"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface Car {
  id: string
  title: string
  make: string
  model: string
  year: number
  fuel_type: string
  transmission: string
  mileage: number
  price: number
  featured: boolean
  sold: boolean
  images: string[]
}

interface UsedCarsClientProps {
  initialCars: Car[]
}

export default function UsedCarsClient({ initialCars }: UsedCarsClientProps) {
  const [cars] = useState(initialCars)
  const [filteredCars, setFilteredCars] = useState(initialCars.filter((car) => !car.sold))
  const [filters, setFilters] = useState({
    make: "all",
    model: "all",
    priceRange: [1000, 30000],
    sortBy: "price-low",
    showSold: false,
  })

  // Extract unique makes and models from cars
  const makes = Array.from(new Set(cars.map((car) => car.make))).sort()
  const models =
    filters.make !== "all"
      ? Array.from(new Set(cars.filter((car) => car.make === filters.make).map((car) => car.model))).sort()
      : []

  // Apply filters whenever they change
  const applyFilters = (newFilters: typeof filters) => {
    let filtered = cars

    if (!newFilters.showSold) {
      filtered = filtered.filter((car) => !car.sold)
    }

    if (newFilters.make !== "all") {
      filtered = filtered.filter((car) => car.make === newFilters.make)
    }

    if (newFilters.model !== "all") {
      filtered = filtered.filter((car) => car.model === newFilters.model)
    }

    filtered = filtered.filter((car) => car.price >= newFilters.priceRange[0] && car.price <= newFilters.priceRange[1])

    // Sort
    if (newFilters.sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (newFilters.sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    } else if (newFilters.sortBy === "year-new") {
      filtered = [...filtered].sort((a, b) => b.year - a.year)
    } else if (newFilters.sortBy === "year-old") {
      filtered = [...filtered].sort((a, b) => a.year - b.year)
    } else if (newFilters.sortBy === "mileage-low") {
      filtered = [...filtered].sort((a, b) => a.mileage - b.mileage)
    }

    setFilteredCars(filtered)
  }

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    if (key === "make") {
      newFilters.model = "all"
    }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters = {
      make: "all",
      model: "all",
      priceRange: [1000, 30000],
      sortBy: "price-low",
      showSold: false,
    }
    setFilters(defaultFilters)
    applyFilters(defaultFilters)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Used Cars Inventory</h1>
        <p className="text-gray-600 mb-8">
          Browse through our collection of quality used cars. Use the filters to find your perfect match.
        </p>

        {/* Filter Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div>
                <Label className="mb-2 block">Make</Label>
                <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Makes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Makes</SelectItem>
                    {makes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Model</Label>
                <Select
                  value={filters.model}
                  onValueChange={(value) => handleFilterChange("model", value)}
                  disabled={filters.make === "all"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={filters.make === "all" ? "Select Make First" : "All Models"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Models</SelectItem>
                    {models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">
                  Price Range: £{filters.priceRange[0].toLocaleString()} - £{filters.priceRange[1].toLocaleString()}
                </Label>
                <Slider
                  min={0}
                  max={30000}
                  step={500}
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange("priceRange", value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="mb-2 block">Sort By</Label>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="year-new">Year (Newest First)</SelectItem>
                    <SelectItem value="year-old">Year (Oldest First)</SelectItem>
                    <SelectItem value="mileage-low">Mileage (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-600">Showing {filteredCars.length} vehicles</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showSold"
                    checked={filters.showSold}
                    onCheckedChange={(checked) => handleFilterChange("showSold", checked)}
                  />
                  <Label htmlFor="showSold" className="cursor-pointer">
                    Show Sold Cars
                  </Label>
                </div>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cars Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No vehicles match your filters. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-56 bg-gray-200">
                  {car.images && car.images[0] ? (
                    <Image
                      src={car.images[0] || "/placeholder.svg"}
                      alt={car.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  {car.sold && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-4 py-1.5 rounded-md font-semibold text-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      SOLD
                    </div>
                  )}
                  {car.featured && !car.sold && (
                    <div className="absolute top-3 right-3 bg-gjc-yellow text-black px-4 py-1.5 rounded-md font-semibold text-sm shadow-md">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-1">{car.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {car.year} | {car.fuel_type} | {car.transmission} | {car.mileage.toLocaleString()} miles
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold">£{car.price.toLocaleString()}</p>
                    <Link href={`/used-cars/${car.id}`}>
                      <Button className="bg-gjc-yellow hover:bg-gjc-yellow-hover text-black">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
