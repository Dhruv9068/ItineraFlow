"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Globe, Map, Calendar, CreditCard } from "lucide-react"
import HeroSection from "@/components/hero-section"
import DestinationGallery from "@/components/destination-gallery"
import ItineraryPlanner from "@/components/itinerary-planner"
import BudgetCalculator from "@/components/budget-calculator"
import LanguageCards from "@/components/language-cards"
import WorldMap from "@/components/world-map"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import ContactForm from "@/components/contact-form"
import ScrollProgress from "@/components/scroll-progress"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "@/styles/home.css"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main ref={mainRef} className="relative overflow-hidden">
      <ScrollProgress />
      <Navbar />
      <HeroSection scrollY={scrollY} />

      <section className="intro-section">
        <div className="intro-content">
          <h2 className="section-title">Reimagine Travel Planning</h2>
          <p className="section-description">
            ItineraFlow transforms your travel dreams into immersive journeys with cutting-edge planning tools and
            personalized recommendations.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <Globe className="feature-icon" />
              <h3>Global Destinations</h3>
              <p>Explore thousands of curated destinations worldwide</p>
            </div>
            <div className="feature-card">
              <Map className="feature-icon" />
              <h3>Interactive Maps</h3>
              <p>Interactive route mapping with real-time updates</p>
            </div>
            <div className="feature-card">
              <Calendar className="feature-icon" />
              <h3>Smart Scheduling</h3>
              <p>Smart scheduling that optimizes your time</p>
            </div>
            <div className="feature-card">
              <CreditCard className="feature-icon" />
              <h3>Budget Tracking</h3>
              <p>Budget tracking with price prediction</p>
            </div>
          </div>
        </div>
      </section>

      <DestinationGallery />
      <ItineraryPlanner />
      <BudgetCalculator />
      <LanguageCards />
      <WorldMap />

      <section className="compass-section">
        <div className="compass-container">
          <div className="compass-ring outer"></div>
          <div className="compass-ring inner"></div>
          <div className="compass-face">
            <div className="compass-needle"></div>
            <div className="compass-center"></div>
            <div className="compass-cardinal n">N</div>
            <div className="compass-cardinal e">E</div>
            <div className="compass-cardinal s">S</div>
            <div className="compass-cardinal w">W</div>
          </div>
        </div>
        <div className="compass-content">
          <h2 className="section-title">Find Your Direction</h2>
          <p className="section-description">
            Let your wanderlust guide you to unexplored territories and hidden gems. Our compass points to adventures
            tailored just for you.
          </p>
          <button className="cta-button">
            Discover Your Path <ArrowRight className="icon" />
          </button>
        </div>
      </section>

      <TestimonialsCarousel />
      <ContactForm />
      <Footer />
    </main>
  )
}
