export interface Car {
  id: number
  title: string
  make: string
  model: string
  year: number
  fuel: "Diesel" | "Petrol" | "Electric" | "Hybrid"
  transmission: "Manual" | "Automatic"
  mileage: string
  price: number
  featured: boolean
  sold?: boolean
  youtubeUrl?: string
  image: string // Main image for listing page
  description: string
  features: string[]
  specs: {
    engine: string
    power: string
    acceleration: string
    topSpeed: string
    fuelEconomy: string
    co2: string
    roadTax: string
    insurance: string
  }
  images: string[] // Array of images for detail page
}
