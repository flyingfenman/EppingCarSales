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
}

// Import the cars data directly
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
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1685%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1686%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1687%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1688%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1689%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1690%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1691%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1692%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1693%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1698%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1699%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1700%202.HEIC",
      "https://pub-f9184b8b10a6492da887a1c37e229913.r2.dev/BU15PXH/IMG_1701%202.HEIC",
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
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3",
  ],
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
]
export default function UsedCars() {
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [minPrice, setMinPrice] = useState(1000)
  const [maxPrice, setMaxPrice] = useState(30000)
  const [sortBy, setSortBy] = useState("price-asc")

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
                    src={car.image || "/placeholder.svg?height=300&width=500&query=car"}
                    alt={car.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    unoptimized={car.image?.includes(".HEIC")}
                  />
                  {car.featured && <Badge className="absolute top-2 right-2 bg-yellow-400 text-black">Featured</Badge>}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{car.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {car.year} | {car.fuel} | {car.transmission} | {car.mileage} miles
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">£{car.price.toLocaleString()}</p>
                    <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black">
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
