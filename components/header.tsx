"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/used-cars", label: "Used Cars" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#333333] text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="rounded-xl overflow-hidden bg-white">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-3333.jpg-YnvySvQbVVBjVJf8beedckI5jtF4Wo.jpeg"
              alt="GJC500 - Premier Car Dealership Logo"
              width={180}
              height={60}
              priority
              className="rounded-xl"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg hover:text-yellow-400 transition-colors ${
                    pathname === link.href ? "font-bold text-yellow-400" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-[#333333] py-4">
          <ul className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg hover:text-yellow-400 transition-colors ${
                    pathname === link.href ? "font-bold text-yellow-400" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
