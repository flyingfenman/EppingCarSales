"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddCarPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    make: "",
    model: "",
    year: "",
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "",
    price: "",
    featured: false,
    sold: false,
    mainImage: "",
    description: "",
    features: "",
    engine: "",
    power: "",
    acceleration: "",
    topSpeed: "",
    fuelEconomy: "",
    co2: "",
    roadTax: "",
    insurance: "",
    images: "",
    youtubeUrl: "",
  })

  const [generatedCode, setGeneratedCode] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "henry" && password === "henry") {
      setIsAuthenticated(true)
      setLoginError("")
    } else {
      setLoginError("Invalid username or password")
    }
  }

  const generateCarCode = () => {
    // Get the highest ID from existing cars (you'll need to update this manually)
    const newId = Date.now() // Using timestamp as unique ID

    const featuresArray = formData.features
      .split("\n")
      .filter((f) => f.trim())
      .map((f) => `    "${f.trim()}"`)
      .join(",\n")

    const imagesArray = formData.images
      .split("\n")
      .filter((i) => i.trim())
      .map((i) => `    "${i.trim()}"`)
      .join(",\n")

    const code = `{
  id: ${newId},
  title: "${formData.title}",
  make: "${formData.make}",
  model: "${formData.model}",
  year: ${formData.year},
  fuel: "${formData.fuel}",
  transmission: "${formData.transmission}",
  mileage: "${formData.mileage}",
  price: ${formData.price},
  featured: ${formData.featured},
  sold: ${formData.sold},
  image: "${formData.mainImage}",
  description: "${formData.description}",
  features: [
${featuresArray}
  ],
  specs: {
    engine: "${formData.engine}",
    power: "${formData.power}",
    acceleration: "${formData.acceleration}",
    topSpeed: "${formData.topSpeed}",
    fuelEconomy: "${formData.fuelEconomy}",
    co2: "${formData.co2}",
    roadTax: "${formData.roadTax}",
    insurance: "${formData.insurance}",
  },
  images: [
${imagesArray}
  ],${formData.youtubeUrl ? `\n  youtubeUrl: "${formData.youtubeUrl}",` : ""}
},`

    setGeneratedCode(code)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    alert("Code copied to clipboard!")
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && <p className="text-sm text-red-600">{loginError}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Add New Car Listing</CardTitle>
          <CardDescription>Fill out the form below to generate car listing code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., 2020 BMW 3 Series"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  placeholder="e.g., BMW"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="e.g., 3 Series"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g., 2020"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel Type</Label>
                <Select value={formData.fuel} onValueChange={(value) => setFormData({ ...formData, fuel: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  placeholder="e.g., 45,000"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (£)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 15000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.sold}
                  onChange={(e) => setFormData({ ...formData, sold: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Sold</span>
              </label>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Images</h3>
            <div className="space-y-2">
              <Label htmlFor="mainImage">Main Image URL (from Cloudflare)</Label>
              <Input
                id="mainImage"
                placeholder="https://your-cloudflare-url.com/image.jpg"
                value={formData.mainImage}
                onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Additional Images (one URL per line)</Label>
              <Textarea
                id="images"
                placeholder="https://your-cloudflare-url.com/image1.jpg&#10;https://your-cloudflare-url.com/image2.jpg&#10;https://your-cloudflare-url.com/image3.jpg"
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">YouTube Video URL (optional)</Label>
              <Input
                id="youtubeUrl"
                placeholder="https://youtu.be/6iHSVAL3qKc or https://www.youtube.com/watch?v=6iHSVAL3qKc"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Add a YouTube link to show a video on the car detail page</p>
            </div>
          </div>

          {/* Description and Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Description & Features</h3>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter car description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                placeholder="Air Conditioning&#10;Cruise Control&#10;Bluetooth&#10;Parking Sensors"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={6}
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="engine">Engine</Label>
                <Input
                  id="engine"
                  placeholder="e.g., 2.0L 4-cylinder"
                  value={formData.engine}
                  onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="power">Power</Label>
                <Input
                  id="power"
                  placeholder="e.g., 184 PS"
                  value={formData.power}
                  onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acceleration">0-60 mph</Label>
                <Input
                  id="acceleration"
                  placeholder="e.g., 7.3 seconds"
                  value={formData.acceleration}
                  onChange={(e) => setFormData({ ...formData, acceleration: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topSpeed">Top Speed</Label>
                <Input
                  id="topSpeed"
                  placeholder="e.g., 144 mph"
                  value={formData.topSpeed}
                  onChange={(e) => setFormData({ ...formData, topSpeed: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuelEconomy">Fuel Economy</Label>
                <Input
                  id="fuelEconomy"
                  placeholder="e.g., 47.9 mpg"
                  value={formData.fuelEconomy}
                  onChange={(e) => setFormData({ ...formData, fuelEconomy: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co2">CO2 Emissions</Label>
                <Input
                  id="co2"
                  placeholder="e.g., 134 g/km"
                  value={formData.co2}
                  onChange={(e) => setFormData({ ...formData, co2: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roadTax">Road Tax</Label>
                <Input
                  id="roadTax"
                  placeholder="e.g., £190/year"
                  value={formData.roadTax}
                  onChange={(e) => setFormData({ ...formData, roadTax: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance Group</Label>
                <Input
                  id="insurance"
                  placeholder="e.g., 18E"
                  value={formData.insurance}
                  onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button onClick={generateCarCode} className="w-full" size="lg">
            Generate Car Code
          </Button>

          {/* Generated Code */}
          {generatedCode && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated Code (Copy and paste into app/used-cars/page.tsx)</Label>
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  Copy to Clipboard
                </Button>
              </div>
              <Textarea value={generatedCode} readOnly rows={20} className="font-mono text-sm" />
              <p className="text-sm text-muted-foreground">
                Copy this code and paste it into the cars array in app/used-cars/page.tsx (after the last car object,
                before the closing bracket)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
