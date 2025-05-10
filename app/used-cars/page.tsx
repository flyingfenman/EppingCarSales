"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function UsedCars() {
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [minPrice, setMinPrice] = useState(1000)
  const [maxPrice, setMaxPrice] = useState(30000)
  const [sortBy, setSortBy] = useState("price-asc")

  const cars = [
    {
      id: 1,
      title: "Mini Clubman",
      make: "Mini",
      model: "Clubman",
      year: 2015,
      fuel: "Diesel",
      transmission: "Manual",
      mileage: "74,000",
      price: 6995,
      image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD/IMG_1630%202.HEIC",
      featured: true,
    },
    {
      id: 2,
      title: "Ford Fiesta",
      make: "Ford",
      model: "Fiesta",
      year: 2015,
      fuel: "Petrol",
      transmission: "Manual",
      mileage: "48,000",
      price: 4995,
      image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/IMG_1685.jpeg",
      featured: true,
    },
  ]

  const makes = [...new Set(cars.map((car) => car.make))].sort()

  const models = make ? [...new Set(cars.filter((car) => car.make === make).map((car) => car.model))].sort() : []

  const filteredCars = cars
    .filter((car) => !make || car.make === make)
    .filter((car) => !model || car.model === model)
    .filter((car) => {
      const carPrice = typeof car.price === "string" ? Number.parseFloat(car.price) : car.price
      return carPrice >= minPrice && carPrice <= maxPrice
    })

  // Sort the filtered cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    const priceA = typeof a.price === "string" ? Number.parseFloat(a.price) : a.price
    const priceB = typeof b.price === "string" ? Number.parseFloat(b.price) : b.price

    if (sortBy === "price-asc") return priceA - priceB
    if (sortBy === "price-desc") return priceB - priceA
    if (sortBy === "year-desc") return b.year - a.year
    if (sortBy === "year-asc") return a.year - b.year
    if (sortBy === "mileage-asc")
      return Number.parseInt(a.mileage.replace(/,/g, "")) - Number.parseInt(b.mileage.replace(/,/g, ""))
    if (sortBy === "mileage-desc")
      return Number.parseInt(b.mileage.replace(/,/g, "")) - Number.parseInt(a.mileage.replace(/,/g, ""))
    return 0
  })

  return (
    <div className="container py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Used Cars Inventory</h1>
      <p className="text-muted-foreground mb-8">
        Browse through our collection of quality used cars. Use the filters to find your perfect match.
      </p>

      <div className="bg-muted/50 rounded-lg p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="make">Make</Label>
            <Select
              value={make}
              onValueChange={(value) => {
                setMake(value === "all" ? "" : value)
                setModel("")
              }}
            >
              <SelectTrigger id="make">
                <SelectValue placeholder="All Makes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {makes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={model} onValueChange={(value) => setModel(value === "all" ? "" : value)} disabled={!make}>
              <SelectTrigger id="model">
                <SelectValue placeholder={make ? "All Models" : "Select Make First"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                {models.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="price-range">Price Range</Label>
              <span className="text-sm text-muted-foreground">
                £{minPrice.toLocaleString()} - £{maxPrice.toLocaleString()}
              </span>
            </div>
            <div className="pt-4">
              <Slider
                id="price-range"
                defaultValue={[minPrice, maxPrice]}
                min={1000}
                max={50000}
                step={1000}
                onValueChange={(values) => {
                  setMinPrice(values[0])
                  setMaxPrice(values[1])
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="year-desc">Year (Newest First)</SelectItem>
                <SelectItem value="year-asc">Year (Oldest First)</SelectItem>
                <SelectItem value="mileage-asc">Mileage (Low to High)</SelectItem>
                <SelectItem value="mileage-desc">Mileage (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {sortedCars.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">No cars match your criteria</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results.</p>
          <Button
            onClick={() => {
              setMake("")
              setModel("")
              setMinPrice(1000)
              setMaxPrice(30000)
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <>
          <p className="mb-6 text-muted-foreground">Showing {sortedCars.length} vehicles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {sortedCars.map((car) => (
              <Card key={car.id} className="overflow-hidden group">
                <div className="relative h-48">
                  <Image
                    src={car.image || "/placeholder.svg?height=500&width=300&query=car"}
                    alt={car.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    unoptimized={car.image?.includes(".HEIC")}
                  />
                  {car.featured && <Badge className="absolute top-2 right-2 bg-gjc-yellow text-black">Featured</Badge>}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{car.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {car.year} | {car.fuel} | {car.transmission} | {car.mileage} miles
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">£{car.price.toLocaleString()}</p>
                    <Button asChild className="bg-gjc-yellow hover:bg-gjc-yellow-hover text-black">
                      <Link href={`/used-cars/${car.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
