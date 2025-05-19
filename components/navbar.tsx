"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`nav-container ${isScrolled ? "scrolled" : ""}`}>
      <Link href="/" className="nav-logo">
        ItineraFlow
      </Link>

      <div className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <Link href="/destinations" className="nav-link">
          Destinations
        </Link>
        <Link href="/planner" className="nav-link">
          Planner
        </Link>
        <Link href="/about" className="nav-link">
          About
        </Link>
        <Link href="/contact" className="nav-link">
          Contact
        </Link>

        <Link href="/planner" className="nav-cta mobile-only">
          Get Started
        </Link>

        <button className="mobile-close-button" onClick={() => setIsMobileMenuOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <Link href="/planner" className="nav-cta desktop-only">
        Get Started
      </Link>

      <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(true)}>
        <Menu size={24} />
      </button>
    </nav>
  )
}
