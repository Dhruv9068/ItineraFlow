"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowUp } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const updateGridLines = () => {
      const gridContainer = footerRef.current?.querySelector(".grid-container")
      if (!gridContainer) return

      const width = gridContainer.clientWidth
      const height = gridContainer.clientHeight

      // Update grid lines CSS variables
      document.documentElement.style.setProperty("--grid-width", `${width}px`)
      document.documentElement.style.setProperty("--grid-height", `${height}px`)
    }

    updateGridLines()
    window.addEventListener("resize", updateGridLines)

    return () => window.removeEventListener("resize", updateGridLines)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer ref={footerRef} className="footer">
      <div className="grid-container">
        <div className="grid-lines horizontal">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`h-${i}`} className="grid-line"></div>
          ))}
        </div>
        <div className="grid-lines vertical">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`v-${i}`} className="grid-line"></div>
          ))}
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo">
            <h2>ItineraFlow</h2>
            <p>Journey Beyond Boundaries</p>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Explore</h3>
              <ul>
                <li>
                  <Link href="/destinations">Destinations</Link>
                </li>
                <li>
                  <Link href="/experiences">Experiences</Link>
                </li>
                <li>
                  <Link href="/guides">Travel Guides</Link>
                </li>
                <li>
                  <Link href="/deals">Deals & Offers</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Company</h3>
              <ul>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/press">Press</Link>
                </li>
                <li>
                  <Link href="/sustainability">Sustainability</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Support</h3>
              <ul>
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/faq">FAQs</Link>
                </li>
                <li>
                  <Link href="/accessibility">Accessibility</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h3>Stay Inspired</h3>
            <p>Subscribe to our newsletter for travel tips and destination insights</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="#" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-icon">
              <Youtube size={20} />
            </a>
          </div>

          <div className="footer-legal">
            <p>&copy; {new Date().getFullYear()} ItineraFlow. All rights reserved.</p>
            <div className="legal-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/cookies">Cookie Policy</Link>
            </div>
          </div>

          <button className="scroll-top" onClick={scrollToTop}>
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      <div className="train-container">
        <div className="train">
          <div className="train-engine"></div>
          <div className="train-car"></div>
          <div className="train-car"></div>
          <div className="train-car"></div>
        </div>
        <div className="train-track"></div>
      </div>
    </footer>
  )
}
