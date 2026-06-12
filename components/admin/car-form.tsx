"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createCar, updateCar, type CarFormData } from "@/app/actions/cars"
import { useRouter } from "next/navigation"

type CarFormProps = {
  car?: any
  mode: "create" | "edit"
}

export function CarForm({ car, mode }: CarFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(car?.images || [""])
  const [features, setFeatures] = useState<string[]>(car?.features || [""])

  const [bulkBaseUrl, setBulkBaseUrl] = useState("")
  const [bulkFilePrefix, setBulkFilePrefix] = useState("")
  const [bulkStartNumber, setBulkStartNumber] = useState(1)
  const [bulkEndNumber, setBulkEndNumber] = useState(1)
  const [bulkExtension, setBulkExtension] = useState(".jpg")

  const generateBulkImages = () => {
    if (!bulkBaseUrl || !bulkFilePrefix) {
      alert("Please enter both the Base URL and File Prefix")
      return
    }

    const newUrls: string[] = []
    for (let i = bulkStartNumber; i <= bulkEndNumber; i++) {
      newUrls.push(`${bulkBaseUrl}${bulkFilePrefix}${i}${bulkExtension}`)
    }

    // Add to existing images (filter out empty ones first)
    const existingUrls = imageUrls.filter((url) => url.trim() !== "")
    setImageUrls([...existingUrls, ...newUrls])

    // Clear the bulk form
    setBulkBaseUrl("")
    setBulkFilePrefix("")
    setBulkStartNumber(1)
    setBulkEndNumber(1)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      const data: CarFormData = {
        title: formData.get("title") as string,
        make: formData.get("make") as string,
        model: formData.get("model") as string,
        year: Number.parseInt(formData.get("year") as string),
        price: Number.parseInt(formData.get("price") as string),
        mileage: Number.parseInt(formData.get("mileage") as string),
        fuel_type: formData.get("fuel_type") as string,
        transmission: formData.get("transmission") as string,
        body_type: (formData.get("body_type") as string) || undefined,
        engine_size: (formData.get("engine_size") as string) || undefined,
        color: (formData.get("color") as string) || undefined,
        doors: Number.parseInt(formData.get("doors") as string) || undefined,
        seats: Number.parseInt(formData.get("seats") as string) || undefined,
        description: (formData.get("description") as string) || undefined,
        features: features.filter((f) => f.trim() !== ""),
        images: imageUrls.filter((url) => url.trim() !== ""),
        youtube_url: (formData.get("youtube_url") as string) || undefined,
        sold: formData.get("sold") === "true",
        featured: formData.get("featured") === "true",
      }

      if (mode === "create") {
        await createCar(data)
      } else if (car) {
        await updateCar(car.id, data)
      }

      router.push("/admin/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error saving car:", error)
      alert("Failed to save car. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" defaultValue={car?.title} required />
            </div>
            <div>
              <Label htmlFor="make">Make *</Label>
              <Input id="make" name="make" defaultValue={car?.make} required />
            </div>
            <div>
              <Label htmlFor="model">Model *</Label>
              <Input id="model" name="model" defaultValue={car?.model} required />
            </div>
            <div>
              <Label htmlFor="year">Year *</Label>
              <Input id="year" name="year" type="number" defaultValue={car?.year} required />
            </div>
            <div>
              <Label htmlFor="price">Price (£) *</Label>
              <Input id="price" name="price" type="number" defaultValue={car?.price} required />
            </div>
            <div>
              <Label htmlFor="mileage">Mileage *</Label>
              <Input id="mileage" name="mileage" type="number" defaultValue={car?.mileage} required />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fuel_type">Fuel Type *</Label>
              <Select name="fuel_type" defaultValue={car?.fuel_type || "Petrol"}>
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
            <div>
              <Label htmlFor="transmission">Transmission *</Label>
              <Select name="transmission" defaultValue={car?.transmission || "Manual"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="body_type">Body Type</Label>
              <Input id="body_type" name="body_type" defaultValue={car?.body_type} />
            </div>
            <div>
              <Label htmlFor="engine_size">Engine Size</Label>
              <Input id="engine_size" name="engine_size" defaultValue={car?.engine_size} placeholder="e.g., 1.6L" />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input id="color" name="color" defaultValue={car?.color} />
            </div>
            <div>
              <Label htmlFor="doors">Doors</Label>
              <Input id="doors" name="doors" type="number" defaultValue={car?.doors} />
            </div>
            <div>
              <Label htmlFor="seats">Seats</Label>
              <Input id="seats" name="seats" type="number" defaultValue={car?.seats} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description & Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={car?.description} rows={4} />
          </div>
          <div>
            <Label>Features</Label>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...features]
                    newFeatures[index] = e.target.value
                    setFeatures(newFeatures)
                  }}
                  placeholder="e.g., Bluetooth, Parking Sensors"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFeatures(features.filter((_, i) => i !== index))}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-2 bg-transparent"
              onClick={() => setFeatures([...features, ""])}
            >
              Add Feature
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg border border-dashed space-y-4">
            <h4 className="font-medium text-sm">Bulk Image Generator</h4>
            <p className="text-xs text-muted-foreground">
              Quickly add multiple images with numbered filenames (e.g., SM68WSJ1.jpg to SM68WSJ31.jpg)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Base URL (folder path)</Label>
                <Input
                  value={bulkBaseUrl}
                  onChange={(e) => setBulkBaseUrl(e.target.value)}
                  placeholder="https://pub-xxx.r2.dev/SM68WSJ%20JPG/"
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">File Prefix (before number)</Label>
                <Input
                  value={bulkFilePrefix}
                  onChange={(e) => setBulkFilePrefix(e.target.value)}
                  placeholder="SM68WSJ"
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">Start Number</Label>
                <Input
                  type="number"
                  value={bulkStartNumber}
                  onChange={(e) => setBulkStartNumber(Number(e.target.value))}
                  min={1}
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">End Number</Label>
                <Input
                  type="number"
                  value={bulkEndNumber}
                  onChange={(e) => setBulkEndNumber(Number(e.target.value))}
                  min={1}
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">File Extension</Label>
                <Select value={bulkExtension} onValueChange={setBulkExtension}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=".jpg">.jpg</SelectItem>
                    <SelectItem value=".jpeg">.jpeg</SelectItem>
                    <SelectItem value=".png">.png</SelectItem>
                    <SelectItem value=".webp">.webp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={generateBulkImages}
                  className="bg-brand hover:bg-brand-hover text-white w-full"
                >
                  Generate {bulkEndNumber - bulkStartNumber + 1} Images
                </Button>
              </div>
            </div>
            {bulkBaseUrl && bulkFilePrefix && (
              <p className="text-xs text-muted-foreground">
                Preview: {bulkBaseUrl}
                {bulkFilePrefix}
                {bulkStartNumber}
                {bulkExtension}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {imageUrls.filter((url) => url.trim() !== "").length} image(s) added
            </span>
            {imageUrls.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setImageUrls([""])}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </div>

          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => {
                  const newUrls = [...imageUrls]
                  newUrls[index] = e.target.value
                  setImageUrls(newUrls)
                }}
                placeholder="https://your-cloudflare-r2-url.com/image.jpg"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== index))}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => setImageUrls([...imageUrls, ""])}>
            Add Image
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="youtube_url">YouTube URL (optional)</Label>
            <Input
              id="youtube_url"
              name="youtube_url"
              defaultValue={car?.youtube_url}
              placeholder="https://youtu.be/..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sold">Sold Status</Label>
              <Select name="sold" defaultValue={car?.sold ? "true" : "false"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Available</SelectItem>
                  <SelectItem value="true">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="featured">Featured</Label>
              <Select name="featured" defaultValue={car?.featured ? "true" : "false"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="bg-brand hover:bg-brand-hover text-white">
          {loading ? "Saving..." : mode === "create" ? "Create Car" : "Update Car"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
