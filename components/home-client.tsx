"use client"

import Image from "next/image"
import Link from "next/link"
import FinanceCalculator from "@/components/finance-calculator"

interface Car {
  id: string
  title: string
  year: number
  fuel_type: string
  transmission: string
  mileage: number
  price: number
  images: string[]
  featured: boolean
}

interface HomeClientProps {
  featuredCars: Car[]
}

export default function HomeClient({ featuredCars }: HomeClientProps) {
  return (
    <>
      {/* Hero — restored to top */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Epping Car Sales</h1>
          <p>Your premier dealership for quality used cars.</p>
          <div className="hero-buttons">
            <Link href="/used-cars" className="btn">
              Browse Inventory
            </Link>
            <a href="YOUR_YOUTUBE_CHANNEL_URL" target="_blank" rel="noopener noreferrer" className="btn btn-red">
              Watch Our YouTube Channel
            </a>
          </div>
        </div>
      </section>

      <section className="main-content">
        <div className="section-title">
          <h2>Featured Vehicles</h2>
          <p>Take a look at some of our most popular vehicles currently in stock.</p>
        </div>

        <div className="featured-cars">
          {featuredCars.length > 0 ? (
            featuredCars.map((car) => (
              <div
                key={car.id}
                className="car-card"
                data-make={car.title.split(" ")[0]}
                data-model={car.title.split(" ")[1] || ""}
                data-price={car.price}
              >
                <div className="car-image-container">
                  {car.images && car.images[0] ? (
                    <Image
                      src={car.images[0] || "/placeholder.svg"}
                      alt={car.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  {car.featured && <span className="badge">Featured</span>}
                </div>
                <div className="car-card-content">
                  <h3>{car.title}</h3>
                  <p>
                    {car.year} | {car.fuel_type} | {car.transmission} | {car.mileage.toLocaleString()} miles
                  </p>
                  <p className="price">£{car.price.toLocaleString()}</p>
                  <Link href={`/used-cars/${car.id}`} className="btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 col-span-3">
              <p className="text-gray-600">No featured vehicles available at the moment.</p>
              <Link href="/used-cars" className="btn mt-4 inline-block">
                View All Vehicles
              </Link>
            </div>
          )}
        </div>

        {featuredCars.length > 0 && (
          <div className="view-all-container" style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/used-cars" className="btn">
              View All Vehicles
            </Link>
          </div>
        )}
      </section>

      {/* About + Finance Calculator side by side */}
      <section className="intro">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            {/* Left: about text */}
            <div className="lg:w-2/5">
              <h2 className="mb-3">About Epping Car Sales</h2>
              <p>
                At Epping Car Sales, we pride ourselves on providing you with the best selection of used cars at competitive
                prices. Browse our online inventory or contact us to set up a test drive. We are always here to help!
              </p>
            </div>
            {/* Right: compact finance calculator */}
            <div className="lg:w-3/5 w-full">
              <FinanceCalculator initialPrice={10000} compact />
            </div>
          </div>
        </div>
      </section>

      <section
        className="main-content"
        style={{ backgroundColor: "#f5f5f5", paddingTop: "4rem", paddingBottom: "4rem" }}
      >
        <div className="section-title">
          <h2>Why Choose Epping Car Sales?</h2>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
              </svg>
            </div>
            <h3>Quality Assurance</h3>
            <p>
              We only purchase cars directly from the previous owners and pay more when a car has been very well looked
              after. We don't buy from auctions or other traders. All our vehicles go through a thorough PDI (Pre
              Delivery Inspection) before being collected or sent out.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
              </svg>
            </div>
            <h3>Competitive Pricing</h3>
            <p>
              We regularly check the market to ensure our prices are fair and competitive, leaving you with the best
              value for your money.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3>Genuine In Person Backup</h3>
            <p>
              We understand cars have thousands of moving parts. As a proud member of the Independent Motor Dealers
              Association (IMDA), whether you're nearby or from afar and encounter any issues with your purchase, we'll
              get it sorted at a reputable garage near you.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
