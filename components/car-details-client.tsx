"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Share2, Phone } from "lucide-react"
import ReservationCheckout from "@/components/reservation-checkout"
import { trackCarView, trackInquiry } from "@/lib/analytics"
import FinanceCalculator from "@/components/finance-calculator"

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
  const [isImageLoading, setIsImageLoading] = useState(true)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    trackCarView(car.id, car.title, car.price)
  }, [car.id, car.title, car.price])

  const handlePrevImage = useCallback(() => {
    setIsImageLoading(true)
    setActiveImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1))
  }, [car.images.length])

  const handleNextImage = useCallback(() => {
    setIsImageLoading(true)
    setActiveImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1))
  }, [car.images.length])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
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
  }, [touchStart, touchEnd, handleNextImage, handlePrevImage])

  const handleThumbnailClick = useCallback(
    (index: number) => {
      if (index !== activeImageIndex) {
        setIsImageLoading(true)
        setActiveImageIndex(index)
      }
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
    },
    [activeImageIndex],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevImage()
      if (e.key === "ArrowRight") handleNextImage()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handlePrevImage, handleNextImage])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: car.title,
          text: `Check out this ${car.year} ${car.title} at Epping Car Sales`,
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

  const scrollToReserve = useCallback(() => {
    document.getElementById("reserve-section")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const youtubeEmbedUrl = useMemo(() => {
    if (!car.youtube_url) return null
    const videoId =
      car.youtube_url.split("youtu.be/")[1]?.split("?")[0] || car.youtube_url.split("v=")[1]?.split("&")[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }, [car.youtube_url])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8 pb-28 lg:pb-8">
        <Link href="/used-cars" className="inline-flex items-center text-black hover:underline mb-4 md:mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div
              className="relative h-[260px] sm:h-[400px] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden mb-3 md:mb-4 select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {car.images && car.images[activeImageIndex] && (
                <>
                  {/* Loading skeleton */}
                  {isImageLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />}
                  <Image
                    src={car.images[activeImageIndex] || "/placeholder.svg"}
                    alt={`${car.title} - Image ${activeImageIndex + 1}`}
                    fill
                    className={`object-contain md:object-cover transition-opacity duration-200 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                    priority={activeImageIndex === 0}
                    quality={80}
                    sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1199px) calc(66vw - 32px), 800px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAIRAAAgICAQUAAAAAAAAAAAAAAQIDEQQSITFBUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Az9LqKtFQsWt1xWN+Vy5xl3+sXbf3LRRRBn//2Q=="
                    onLoad={() => setIsImageLoading(false)}
                  />
                </>
              )}

              {/* Navigation Arrows - improved styling */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full transition-all shadow-lg hover:scale-110 z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full transition-all shadow-lg hover:scale-110 z-20"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-20">
                {activeImageIndex + 1} / {car.images.length}
              </div>
            </div>

            <div
              ref={thumbnailContainerRef}
              className="flex gap-2 overflow-x-auto scroll-smooth pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              style={{
                scrollbarWidth: "thin",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-200 ${
                    index === activeImageIndex
                      ? "ring-4 ring-gjc-yellow scale-105"
                      : "hover:ring-2 hover:ring-gray-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                    quality={40}
                    loading={index < 3 ? "eager" : "lazy"}
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
          <div className="space-y-6" id="reserve-section">
            <Card>
              <CardContent className="p-5 md:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-balance">{car.title}</h1>
                <p className="text-3xl sm:text-4xl font-bold text-gjc-yellow mb-6">£{car.price.toLocaleString()}</p>

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
            {youtubeEmbedUrl && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-sm">Watch Our Video</h3>
                  <div className="relative w-full h-48 bg-gray-200 rounded overflow-hidden">
                    <iframe
                      src={youtubeEmbedUrl}
                      title="Car video"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Finance calculator — full width below the main content */}
      <div className="border-t border-gray-200 bg-white mt-2">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Finance this {car.title}</h2>
          <FinanceCalculator initialPrice={car.price} vehicleName={car.title} />
        </div>
      </div>

      {/* Sticky mobile action bar */}
      {!car.sold && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">
          <div className="flex-shrink-0">
            <p className="text-[11px] text-gray-500 leading-none mb-1">Price</p>
            <p className="text-xl font-bold text-black leading-none">£{car.price.toLocaleString()}</p>
          </div>
          <a
            href="tel:+441992367909"
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg border-2 border-black text-black font-semibold text-sm active:scale-95 transition-transform"
            aria-label="Call Epping Car Sales"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <button
            onClick={scrollToReserve}
            className="flex-1 flex items-center justify-center h-12 rounded-lg bg-green-600 text-white font-semibold text-sm active:scale-95 transition-transform"
          >
            Reserve £99
          </button>
        </div>
      )}
    </div>
  )
}
