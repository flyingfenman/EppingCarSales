"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react"
import ReservationCheckout from "@/components/reservation-checkout"
import { trackCarView, trackInquiry } from "@/lib/analytics"
import { useEffect } from "react"

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
  description?: string
  features?: string[]
  images: string[]
  youtube_url?: string
  sold: boolean
  featured: boolean
  body_type?: string
  engine_size?: string
  color?: string
  doors?: number
  seats?: number
}

interface CarDetailsClientProps {
  car: Car
}

export default function CarDetailsClient({ car }: CarDetailsClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    trackCarView(car.id, car.title, car.price)
  }, [car.id, car.title, car.price])

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const swipeThreshold = 50

    if (distance > swipeThreshold) {
      handleNextImage()
    }

    if (distance < -swipeThreshold) {
      handlePrevImage()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index)
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current
      const thumbnail = container.children[index] as HTMLElement
      if (thumbnail) {
        const containerWidth = container.offsetWidth
        const thumbnailLeft = thumbnail.offsetLeft
        const thumbnailWidth = thumbnail.offsetWidth
        const scrollPosition = thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2
        container.scrollTo({ left: scrollPosition, behavior: "smooth" })
      }
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: car.title,
          text: `Check out this ${car.year} ${car.title} at GJC500`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleInquiry = () => {
    trackInquiry(car.id, car.title, "inquiry_button")
    window.location.href = "/contact"
  }

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null
    const videoId = url.split("youtu.be/")[1]?.split("?")[0] || url.split("v=")[1]?.split("&")[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/used-cars" className="inline-flex items-center text-gjc-yellow hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div
              className="relative h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {car.images && car.images[activeImageIndex] && (
                <Image
                  src={car.images[activeImageIndex] || "/placeholder.svg"}
                  alt={`${car.title} - Image ${activeImageIndex + 1}`}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                />
              )}

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {activeImageIndex + 1} / {car.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div
              ref={thumbnailContainerRef}
              className="flex gap-2 overflow-x-auto scroll-smooth pb-2"
              style={{ scrollbarWidth: "thin" }}
            >
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
                    index === activeImageIndex ? "ring-4 ring-gjc-yellow" : "hover:ring-2 hover:ring-gray-400"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Description & Features */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 mb-6">{car.description || "No description available."}</p>

                {car.features && car.features.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold mb-3">Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {car.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="text-gjc-yellow mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
                <p className="text-4xl font-bold text-gjc-yellow mb-6">£{car.price.toLocaleString()}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Year</span>
                    <span className="font-semibold">{car.year}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Mileage</span>
                    <span className="font-semibold">{car.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Fuel Type</span>
                    <span className="font-semibold">{car.fuel_type}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Transmission</span>
                    <span className="font-semibold">{car.transmission}</span>
                  </div>
                  {car.body_type && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Body Type</span>
                      <span className="font-semibold">{car.body_type}</span>
                    </div>
                  )}
                  {car.engine_size && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Engine</span>
                      <span className="font-semibold">{car.engine_size}</span>
                    </div>
                  )}
                  {car.color && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Color</span>
                      <span className="font-semibold">{car.color}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <ReservationCheckout carId={car.id} carTitle={car.title} carPrice={car.price} />
                  <Button onClick={handleInquiry} className="w-full bg-gjc-yellow hover:bg-gjc-yellow-hover text-black">
                    Inquire About This Car
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share This Car
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* YouTube Video */}
            {car.youtube_url && getYouTubeEmbedUrl(car.youtube_url) && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-sm">Watch Our Video</h3>
                  <div className="relative w-full h-48 bg-gray-200 rounded overflow-hidden">
                    <iframe
                      src={getYouTubeEmbedUrl(car.youtube_url) || ""}
                      title="Car video"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
