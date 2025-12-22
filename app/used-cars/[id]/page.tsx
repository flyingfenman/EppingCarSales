"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Calendar, Fuel, Gauge, Share2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ReservationCheckout from "@/components/reservation-checkout"
import { trackCarView } from "@/lib/analytics"

interface Car {
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
  image: string
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
  images: string[]
  youtubeUrl?: string // Added youtubeUrl field
}

const cars: Car[] = [
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
    featured: false,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1630.jpg",
    description: "Mini Clubman 2.0 Diesel just been serviced has a full mot, drives excellently",
    features: [
      "Warranty included",
      "Service history",
      "35 road tax",
      "2 keys",
      "Air Conditioning",
      "Rear parking sensors",
      "6 speed",
      "Heated seats",
      "Bluetooth Hands Free Function with USB Audio",
      "Cruise Control with Brake Function",
      "MINI Navigation System",
      "DAB Tuner",
      "16in Alloy Wheels - Revolite",
      "3-Spoke Sport Leather Steering Wheel",
      "Airbags - Front Passenger with Deactivation Switch",
      "Start-Stop Button with Keyless Start",
      "Central Locking - Remote",
      "Daytime Running Lights",
      "Door Mirrors - Electrically Adjustable and Heated",
      "Electric Windows - Front - One Touch Up and Down",
      "Electronic Parking Brake",
      "Front Fog Lights",
      "Headlights - Automatic Lights-On",
      "Hill Assist",
      "Interior Lighting Integrated into Centre Front Headliner",
      "Interior Mirror - Mechanical Anti-Dazzle",
      "MINI Central Display with LED Ring",
      "Multifunction Controls for Steering Wheel",
      "Rear Passenger ISOFIX",
      "TPWS - Tyre Pressure Warning System",
      "HPI clear",
    ],
    specs: {
      engine: "2.0L Turbo",
      power: "170 bhp",
      acceleration: "8.4 seconds (0-60 mph)",
      topSpeed: "132 mph",
      fuelEconomy: "31.4 mpg",
      co2: "199 g/km",
      roadTax: "£35 per year",
      insurance: "Group 15",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1630.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1631.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1632.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1633.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1634.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1635.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1636.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1637.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1638.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1639.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1640.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1641.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1642.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1643.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1644.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1645.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1646.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1647.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1648.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1649.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1650.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1651.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1652.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PK65XXD%20JPG/IMG_1653.jpg",
    ],
  },
  {
    id: 2,
    title: "Ford Fiesta",
    make: "Ford",
    model: "Fiesta",
    year: 2015,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "51,000",
    price: 4200,
    featured: true,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1685%202.jpg",
    description: "Ford Fiesta 1.0",
    features: [
      "Warranty included",
      "Full Service history",
      "20 road tax",
      "2 keys",
      "Air Conditioning",
      "5 speed manual",
      "Bluetooth Hands Free Function with USB Audio",
      "DAB Tuner",
      "Central Locking - Remote",
      "Daytime Running Lights",
      "Electric Windows - Front - One Touch Up and Down",
      "Front Fog Lights",
      "Headlights - Automatic Lights-On",
      "HPI clear",
    ],
    specs: {
      engine: "1.0L",
      power: "99 bhp",
      acceleration: "8.4 seconds (0-60 mph)",
      topSpeed: "132 mph",
      fuelEconomy: "57 mpg",
      co2: "199 g/km",
      roadTax: "£20 per year",
      insurance: "Group 15",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1685%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1686%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1687%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1688%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1689%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1690%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1691%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1692%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1693%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1698%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1699%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1700%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1701%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1702%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1703%202.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH%20JPG/IMG_1704%202.jpg",
    ],
  },
  {
    id: 3,
    title: "Volkswagen Golf",
    make: "Volkswagen",
    model: "Golf",
    year: 2018,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "68,000",
    price: 9200,
    featured: true,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1877.jpg",
    description: "Volkswagen Golf with Apple Car Play. A perfect example of a well-looked-after car.",
    features: [
      "Warranty included",
      "Service history",
      "2 keys",
      "Air Conditioning",
      "6 speed manual",
      "Apple Car Play",
      "DAB Tuner",
      "HPI clear",
    ],
    specs: {
      engine: "1.0L",
      power: "99 bhp",
      acceleration: "6.4 seconds (0-60 mph)",
      topSpeed: "132 mph",
      fuelEconomy: "57 mpg",
      co2: "199 g/km",
      roadTax: "£280 per year",
      insurance: "Group 13",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1877.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1878.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1880.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1882.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1883.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1884.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1885.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1889.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1890.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1891.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1892.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1893.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/GL18AXR%20JPG/IMG_1894.jpg",
    ],
  },
  {
    id: 4,
    title: "Volvo V40",
    make: "Volvo",
    model: "V40",
    year: 2018,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "81,000",
    price: 10250,
    featured: true,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2054.jpg",
    description:
      "A reliable and stylish Volvo V40 with a full service history. Great for city driving and long journeys.",
    features: ["Full Service History", "Low Mileage", "Heated Seats", "Parking Sensors", "Bluetooth", "Cruise Control"],
    specs: {
      engine: "2.0L D3",
      power: "150 bhp",
      acceleration: "8.4s (0-60 mph)",
      topSpeed: "130 mph",
      fuelEconomy: "72.8 mpg",
      co2: "102 g/km",
      roadTax: "£20 per year",
      insurance: "Group 18",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2054.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2055.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2056.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2057.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2058.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2059.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2060.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2061.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2062.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2063.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2064.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2065.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2066.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2067.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2068.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2069.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2072.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2073.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2074.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KL18NAO%20JPG/IMG_2075.jpg",
    ],
  },
  {
    id: 6,
    title: "Audi A3 1.6TDI",
    make: "Audi",
    model: "A3",
    year: 2015,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "82,000",
    price: 5250,
    featured: false,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1952.jpg", // Main listing image
    description: "Description of the car...",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    specs: {
      engine: "1.6L",
      power: "130 bhp",
      acceleration: "7.5 seconds (0-60 mph)",
      topSpeed: "140 mph",
      fuelEconomy: "45 mpg",
      co2: "150 g/km",
      roadTax: "£165 per year",
      insurance: "Group 20",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1952.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1953.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1954.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1955.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1956.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1957.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1958.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1959.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1960.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1961.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1962.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1963.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1964.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1965.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1966.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1967.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1968.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1969.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1970.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1972.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1956.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/MJ15LEF%20JPG/IMG_1974.jpg",
    ],
  },
  {
    id: 7,
    title: "Mini Cooper S",
    make: "Mini",
    model: "Cooper",
    year: 2017,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "54,000",
    price: 8995,
    featured: false,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2803.jpg",
    description: "Mini Clubman 2.0 Diesel just been serviced has a full mot, drives excellently",
    features: [
      "Warranty included",
      "Service history",
      "35 road tax",
      "2 keys",
      "Air Conditioning",
      "Rear parking sensors",
      "6 speed",
      "Heated seats",
      "Bluetooth Hands Free Function with USB Audio",
      "Cruise Control with Brake Function",
      "MINI Navigation System",
      "DAB Tuner",
      "16in Alloy Wheels - Revolite",
      "3-Spoke Sport Leather Steering Wheel",
      "Airbags - Front Passenger with Deactivation Switch",
      "Start-Stop Button with Keyless Start",
      "Central Locking - Remote",
      "Daytime Running Lights",
      "Door Mirrors - Electrically Adjustable and Heated",
      "Electric Windows - Front - One Touch Up and Down",
      "Electronic Parking Brake",
      "Front Fog Lights",
      "Headlights - Automatic Lights-On",
      "Hill Assist",
      "Interior Lighting Integrated into Centre Front Headliner",
      "Interior Mirror - Mechanical Anti-Dazzle",
      "MINI Central Display with LED Ring",
      "Multifunction Controls for Steering Wheel",
      "Rear Passenger ISOFIX",
      "TPWS - Tyre Pressure Warning System",
      "HPI clear",
    ],
    specs: {
      engine: "2.0L Turbo",
      power: "170 bhp",
      acceleration: "8.4 seconds (0-60 mph)",
      topSpeed: "132 mph",
      fuelEconomy: "31.4 mpg",
      co2: "199 g/km",
      roadTax: "£35 per year",
      insurance: "Group 15",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2803.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2804.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2805.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2806.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2807.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2808.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2812.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2813.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2814.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2819.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2820.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2821.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2822.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2823.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2824.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2830.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2831.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2834.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2835.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2837.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2838.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2840.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2842.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2843.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/FE67EBG%20JPG/IMG_2848.jpg",
    ],
  },
  {
    id: 8,
    title: "Jeep Renegade 1.6",
    make: "Jeep",
    model: "Renegade",
    year: 2016,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "84,000",
    price: 4600,
    featured: false,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2785.jpg", // Main listing image
    description: "Description of the car...",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    specs: {
      engine: "1.6L",
      power: "130 bhp",
      acceleration: "7.5 seconds (0-60 mph)",
      topSpeed: "140 mph",
      fuelEconomy: "45 mpg",
      co2: "150 g/km",
      roadTax: "£165 per year",
      insurance: "Group 20",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2785.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2786.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2787.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2788.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2790.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2791.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2792.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2793.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2794.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2795.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2796.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2797.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2798.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2799.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2800.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2801.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2802.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2803.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2804.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2805.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2806.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2807.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2808.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2809.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2810.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2811.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2812.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/LG65KFP%20JPG/IMG_2814.jpg",
    ],
  },
  {
    id: 9,
    title: "Mitsubishi L200",
    make: "Mitsubishi",
    model: "L200",
    year: 2019,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "57,500",
    price: 16995,
    featured: true,
    youtubeUrl: "https://youtu.be/6iHSVAL3qKc",
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_2999.jpg", // Main listing image
    description: "Description of the car...",
    features: ["Reverse Camera", "Heated Seats", "Full Service History"],
    specs: {
      engine: "2.2L",
      power: "150 bhp",
      acceleration: "10.5 seconds (0-60 mph)",
      topSpeed: "108 mph",
      fuelEconomy: "32 mpg",
      co2: "231 g/km",
      roadTax: "£335 per year",
      insurance: "Group 42",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_2999.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3001.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3002.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3003.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3004.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3005.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3006.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3007.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3008.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3009.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3010.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3011.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3012.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3013.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_30132.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3014.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3015.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3016.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3017.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3018.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3019.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3020.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3021.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3023.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3024.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3025.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/DX19XJH%20JPG/IMG_3028.jpg",
    ],
  },
  {
    id: 10,
    title: "Lexus CT200h",
    make: "Lexus",
    model: "CT200h",
    year: 2019,
    fuel: "Hybrid",
    transmission: "Automatic",
    mileage: "81000",
    price: 11950,
    featured: false,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO1.jpg", // Main listing image
    description: "Description of the car...",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    specs: {
      engine: "1.8L",
      power: "130 bhp",
      acceleration: "7.5 seconds (0-60 mph)",
      topSpeed: "140 mph",
      fuelEconomy: "45 mpg",
      co2: "150 g/km",
      roadTax: "£0 per year",
      insurance: "Group 11",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO1.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO2.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO3.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO4.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO5.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO6.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO7.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO8.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CPO9.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP10.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP11.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP12.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP13.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP14.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP15.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP16.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP17.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP18.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP19.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP20.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP21.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP22.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP23.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP24.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP25.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP26.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP27.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP28.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP29.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY69CPO/PY69CP30.jpg",
    ],
  },
  {
    id: 11,
    title: "Honda Jazz",
    make: "Honda",
    model: "Jazz",
    year: 2018,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "71000",
    price: 9950,
    featured: true,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ1.jpg", // Main listing image
    description: "Description of the car...",
    features: ["Garmin Sat Nav", "Automatic", "Low Insurance"],
    specs: {
      engine: "1.8L",
      power: "130 bhp",
      acceleration: "7.5 seconds (0-60 mph)",
      topSpeed: "140 mph",
      fuelEconomy: "45 mpg",
      co2: "150 g/km",
      roadTax: "£0 per year",
      insurance: "Group 11",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ1.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ2.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ3.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ4.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ5.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ6.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ7.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ8.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ9.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ10.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ11.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ12.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ13.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ14.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ15.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ16.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ17.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ18.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ19.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ20.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ21.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WS22.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ23.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ24.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ25.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ26.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ27.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ28.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ29.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ30.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SM68WSJ%20JPG/SM68WSJ31.jpg",
    ],
  },
  {
    id: 12,
    title: "Toyota Yaris",
    make: "Toyota",
    model: "Yaris",
    year: 2018,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "27,200",
    price: 9850,
    featured: true,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK1.jpg", // Main listing image
    description:
      "2018 Toyota Yaris – the perfect small car with big reliability.\n" +
      "Powered by a smooth and efficient 1.5L petrol engine, this Yaris delivers excellent fuel economy, low running costs, and that unbeatable Toyota dependability.\n" +
      "\n" +
      "This one comes with a great spec including touchscreen infotainment, Bluetooth, reversing camera, air conditioning, and alloy wheels. Compact, easy to park, and lovely to drive – ideal for town or motorway use.\n" +
      "\n" +
      "Covered just 27,237 miles with full Toyota main dealer service history.\n" +
      "Comes with 1 year Toyota main dealer warranty for total peace of mind.\n" +
      "\n" +
      "Priced at just £9,850 – fantastic value for a low-mileage, main dealer-approved Yaris.\n",
    features: ["Reversing Camera", "Full Main Dealer Service History", "Very low mileage"],
    specs: {
      engine: "1.8L",
      power: "130 bhp",
      acceleration: "7.5 seconds (0-60 mph)",
      topSpeed: "140 mph",
      fuelEconomy: "45 mpg",
      co2: "150 g/km",
      roadTax: "£0 per year",
      insurance: "Group 11",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK1.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK2.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK3.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK4.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK5.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK6.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK7.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK8.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK9.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK10.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK11.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK12.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK13.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK14.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK15.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK16.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK17.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK18.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK19.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK20.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK21.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK22.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK23.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK24.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK25.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK26.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK27.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK28.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK29.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/KO18KLK%20JPG/KO18KLK30.jpg",
    ],
  },
  {
    id: 13,
    title: "Volvo V60 CrossCountry",
    make: "Volvo",
    model: "V60",
    year: 2017,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "92,200",
    price: 9350,
    featured: true,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX1.jpg", // Main listing image
    description:
      "2017 Volvo V60 Cross Country with 92,000 miles and full service history. The timing belt has been replaced recently, and the bodywork is in excellent condition throughout. It features full leather seats, satellite navigation, and a very comfortable driving experience. This car has been well cared for, coming from a pet-free and smoke-free home, and is finished in a lovely colour combination that really sets it apart.",
    features: ["Full Service History", "Recently Done Timing Belt", "Full Leather & Excellent Condition"],
    specs: {
      engine: "2.0L",
      power: "187 bhp",
      acceleration: "5.5 seconds (0-60 mph)",
      topSpeed: "140 mph",
      fuelEconomy: "45 mpg",
      co2: "150 g/km",
      roadTax: "£250 per year",
      insurance: "Group 31",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX1.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX2.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX3.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX4.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX5.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX6.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX7.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX8.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX9.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX10.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX11.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX12.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX13.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX14.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX15.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX16.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX17.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX18.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX19.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX20.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/PY67CFX%20JPG/PY67CFX21.jpg",
    ],
  },
  {
    id: 14,
    title: "Skoda Fabia",
    make: "Skoda",
    model: "Fabia",
    year: 2015,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "69,300",
    price: 4995,
    featured: false,
    image: "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS1.jpg", // Main listing image
    description:
      "2015 Skoda Fabia, in very good condition. Runs and drives excellently, very low insurance group and only £20 a year tax. Recently serviced will come with 12 months MOT.",
    features: ["Service History", "Recently Done Timing Belt", "Full Leather & Excellent Condition"],
    specs: {
      engine: "1.2L",
      power: "87 bhp",
      acceleration: "5.5 seconds (0-60 mph)",
      topSpeed: "140 mph",
      fuelEconomy: "45 mpg",
      co2: "150 g/km",
      roadTax: "£20 per year",
      insurance: "Group 6",
    },
    images: [
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS1.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS2.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS3.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS4.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS5.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS6.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS7.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS8.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS9.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS10.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS11.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS12.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS13.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS14.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS15.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS16.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS17.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS18.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS19.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS20.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS21.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS22.jpg",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/SC65WWS%20JPG/SC65WWS23.jpg",
    ],
  },
]

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [inquirySent, setInquirySent] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  const car = cars.find((c) => c.id === Number.parseInt(id))

  if (!car) {
    notFound()
  }

  useEffect(() => {
    trackCarView(car.id.toString(), car.title, car.price)
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

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      handleNextImage()
    }
    if (touchEnd - touchStart > 50) {
      handlePrevImage()
    }
  }

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeButton = thumbnailContainerRef.current.querySelector('[data-active="true"]') as HTMLElement
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }
    }
  }, [activeImageIndex])

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    setInquirySent(true)
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="mb-6">
        <Link href="/used-cars" className="text-primary hover:underline inline-flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all cars
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div
            className="relative rounded-lg overflow-hidden mb-4 bg-gray-100"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full overflow-hidden">
              <Image
                src={car.images[activeImageIndex] || "/placeholder.svg?height=600&width=800&query=car"}
                alt={`${car.title} - Image ${activeImageIndex + 1}`}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-opacity duration-300"
                unoptimized={car.images[activeImageIndex]?.includes(".HEIC")}
                priority
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background transition-all duration-200"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background transition-all duration-200"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {activeImageIndex + 1} / {car.images.length}
            </div>
          </div>

          <div
            ref={thumbnailContainerRef}
            className="flex gap-2 mb-8 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {car.images.map((image, index) => (
              <button
                key={index}
                data-active={activeImageIndex === index}
                onClick={() => setActiveImageIndex(index)}
                className={`flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 snap-center ${
                  activeImageIndex === index
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg?height=100&width=100&query=car-thumbnail"}
                  alt={`${car.title} - Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover hover:opacity-80 transition-opacity"
                  unoptimized={image?.includes(".HEIC")}
                />
              </button>
            ))}
          </div>

          <Tabs defaultValue="description" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 bg-muted/30 rounded-md mt-2">
              <h3 className="text-xl font-bold mb-4">
                About this {car.make} {car.model}
              </h3>
              <p className="text-muted-foreground">{car.description}</p>
            </TabsContent>
            <TabsContent value="features" className="p-4 bg-muted/30 rounded-md mt-2">
              <h3 className="text-xl font-bold mb-4">Features & Equipment</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mr-2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specs" className="p-4 bg-muted/30 rounded-md mt-2">
              <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engine:</span>
                    <span className="font-medium">{car.specs.engine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Power:</span>
                    <span className="font-medium">{car.specs.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">0-60 mph:</span>
                    <span className="font-medium">{car.specs.acceleration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Top Speed:</span>
                    <span className="font-medium">{car.specs.topSpeed}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fuel Economy:</span>
                    <span className="font-medium">{car.specs.fuelEconomy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CO2 Emissions:</span>
                    <span className="font-medium">{car.specs.co2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Road Tax:</span>
                    <span className="font-medium">{car.specs.roadTax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance Group:</span>
                    <span className="font-medium">{car.specs.insurance}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="mb-6 sticky top-6">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-2">{car.title}</h1>
              <p className="text-3xl font-bold text-primary mb-6">£{car.price.toLocaleString()}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Fuel className="h-5 w-5 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fuel</p>
                    <p className="font-medium">{car.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground mr-2"
                  >
                    <rect width="18" height="12" x="3" y="8" rx="2" />
                    <path d="M7 8v4" />
                    <path d="M17 8v4" />
                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                    <path d="M5 12v4" />
                    <path d="M19 12v4" />
                  </svg>
                  <div>
                    <p className="text-sm text-muted-foreground">Transmission</p>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Gauge className="h-5 w-5 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p className="font-medium">{car.mileage} miles</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-600 text-white hover:bg-green-700">Reserve for £99</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Reserve {car.title}</DialogTitle>
                      <DialogDescription>Secure this vehicle with a £99 reservation deposit</DialogDescription>
                    </DialogHeader>
                    <ReservationCheckout carId={car.id} carTitle={car.title} />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                      Inquire About This Car
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Inquire About {car.title}</DialogTitle>
                      <DialogDescription>
                        Fill out the form below and our team will get back to you as soon as possible.
                      </DialogDescription>
                    </DialogHeader>
                    {inquirySent ? (
                      <div className="text-center py-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary mx-auto mb-4"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 className="text-xl font-bold mb-2">Inquiry Sent!</h3>
                        <p className="text-muted-foreground mb-4">
                          Thank you for your interest. Our team will contact you shortly.
                        </p>
                        <Button variant="outline" onClick={() => setInquirySent(false)}>
                          Send Another Inquiry
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitInquiry} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="I'm interested in this car and would like more information..."
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                          Send Inquiry
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full flex items-center gap-2 bg-transparent"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: car.title,
                          text: `Check out this ${car.title}!`,
                          url: window.location.href,
                        })
                        .catch((error) => console.log("Error sharing", error))
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert("Link copied to clipboard!")
                    }
                  }}
                >
                  <Share2 className="h-5 w-5" />
                  Share This Car
                </Button>

                {car.youtubeUrl && (
                  <Card className="mt-4">
                    <CardContent className="p-4">
                      <h3 className="text-sm font-semibold mb-3">Watch Our Video</h3>
                      <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <iframe
                          src={car.youtubeUrl.replace("youtu.be/", "youtube.com/embed/").replace("watch?v=", "embed/")}
                          className="absolute top-0 left-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
