"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [featuredCars] = useState([
    {
      id: 13,
      title: "Volvo V40",
      year: 2017,
      fuel: "Diesel",
      transmission: "Manual",
      mileage: "92,000",
      price: "£9,350",
      image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX1.jpg",
      featured: true,
    },
    {
      id: 12,
      title: "Toyota Yaris",
      year: 2018,
      fuel: "Petrol",
      transmission: "Manual",
      mileage: "27,200",
      price: "£9,850",
      image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK1.jpg",
      featured: true,
    },

    {
      id: 11,
      title: "Honda Jazz",
      year: 2019,
      fuel: "Petrol",
      transmission: "Automatic",
      mileage: "71,500",
      price: "£8,750",
      image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ1.jpg",
      featured: true,
    },
  ])

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-logo-container">
            <div className="relative w-[400px] h-[100px] mx-auto">
              <Image
                src="https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/gjc500.jpg"
                alt="GJC500 Dealership - Quality Used Cars"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  transform: "scale(1)",
                  mixBlendMode: "multiply",
                }}
                className="rounded-xl"
                priority
              />
            </div>
          </div>
          <h1>Welcome to GJC500</h1>
          <p>Your premier dealership for quality used cars.</p>
          <div className="hero-buttons">
            <Link href="/used-cars" className="btn">
              Browse Inventory
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Book a Test Drive
            </Link>
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="container">
          <h2>About GJC500</h2>
          <p>
            At GJC500, we pride ourselves on providing you with the best selection of used cars at competitive prices.
            Browse our online inventory or contact us to set up a test drive. Our friendly staff is here to help!
          </p>
        </div>
      </section>

      <section className="main-content">
        <div className="section-title">
          <h2>Featured Vehicles</h2>
          <p>Take a look at some of our most popular vehicles currently in stock.</p>
        </div>

        <div className="featured-cars">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="car-card"
              data-make={car.title.split(" ")[0]}
              data-model={car.title.split(" ")[1] || ""}
              data-price={car.price.replace("£", "")}
            >
              <div className="car-image-container">
                <Image
                  src={car.image || "/placeholder.svg?height=500&width=300&query=car"}
                  alt={car.title}
                  fill
                  className="object-cover"
                  unoptimized={car.image?.includes(".HEIC")}
                />
                {car.featured && <span className="badge">Featured</span>}
              </div>
              <div className="car-card-content">
                <h3>{car.title}</h3>
                <p>
                  {car.year} | {car.fuel} | {car.transmission} | {car.mileage} miles
                </p>
                <p className="price">{car.price}</p>
                <Link href={`/used-cars/${car.id}`} className="btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container" style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/used-cars" className="btn">
            View All Vehicles
          </Link>
        </div>
      </section>

      <section
        className="main-content"
        style={{ backgroundColor: "#f5f5f5", paddingTop: "4rem", paddingBottom: "4rem" }}
      >
        <div className="section-title">
          <h2>Why Choose GJC500?</h2>
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
            <p>All our vehicles undergo a comprehensive inspection before being offered for sale.</p>
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
            <p>We regularly check the market to ensure our prices are fair and competitive.</p>
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
            <h3>Expert Support</h3>
            <p>Our team of automotive experts is always ready to assist with your questions.</p>
          </div>
        </div>
      </section>
    </>
  )
}
