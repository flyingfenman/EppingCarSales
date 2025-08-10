"use client"

import type React from "react"
import { useState } from "react"
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

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [inquirySent, setInquirySent] = useState(false)

  const car = cars.find((c) => c.id === Number.parseInt(id))

  if (!car) {
    notFound()
  }

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1))
  }

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
          <div className="relative rounded-lg overflow-hidden mb-4">
            <Image
              src={car.images[activeImageIndex] || "/placeholder.svg?height=600&width=800&query=car"}
              alt={`${car.title} - Image ${activeImageIndex + 1}`}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              unoptimized={car.images[activeImageIndex]?.includes(".HEIC")}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-8">
            {car.images.slice(0, 8).map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`rounded-md overflow-hidden border-2 ${
                  activeImageIndex === index ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg?height=150&width=200&query=car-thumbnail"}
                  alt={`${car.title} - Thumbnail ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-auto object-cover"
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

                <Button variant="outline" className="w-full bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share This Car
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
