"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, MapPin, Star, ArrowRight, ChevronDown } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "@/styles/destinations.css"

interface Destination {
  id: number
  name: string
  location: string
  description: string
  rating: number
  price: number
  imageUrl: string
  tags: string[]
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string>("All")
  const [selectedPrice, setSelectedPrice] = useState<string>("All")
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<string>("popularity")

  const regions = ["All", "Asia", "Europe", "North America", "South America", "Africa", "Oceania"]
  const priceRanges = ["All", "Budget", "Moderate", "Luxury"]

  useEffect(() => {
    // Simulate fetching destinations data
    const fetchDestinations = async () => {
      setIsLoading(true)

      // In a real app, this would be an API call
      const data: Destination[] = [
        {
          id: 1,
          name: "Kyoto Gardens",
          location: "Japan, Asia",
          description:
            "Experience the serene beauty of traditional Japanese gardens and temples in the historic city of Kyoto.",
          rating: 4.8,
          price: 1200,
          imageUrl: "https://picsum.photos/id/240/800/500",
          tags: ["Cultural", "Historic", "Peaceful"],
        },
        {
          id: 2,
          name: "Santorini Sunset",
          location: "Greece, Europe",
          description:
            "Witness breathtaking sunsets over the Aegean Sea from the white-washed buildings of this iconic Greek island.",
          rating: 4.9,
          price: 1500,
          imageUrl: "https://picsum.photos/id/164/800/500",
          tags: ["Romantic", "Beach", "Scenic"],
        },
        {
          id: 3,
          name: "Northern Lights",
          location: "Iceland, Europe",
          description:
            "Marvel at the magical aurora borealis dancing across the night sky in Iceland's pristine wilderness.",
          rating: 4.7,
          price: 1800,
          imageUrl: "https://picsum.photos/id/142/800/500",
          tags: ["Nature", "Adventure", "Winter"],
        },
        {
          id: 4,
          name: "Machu Picchu",
          location: "Peru, South America",
          description:
            "Explore the ancient Incan citadel set high in the Andes Mountains, surrounded by mist and mystery.",
          rating: 4.9,
          price: 1600,
          imageUrl: "https://picsum.photos/id/137/800/500",
          tags: ["Historic", "Adventure", "UNESCO"],
        },
        {
          id: 5,
          name: "Great Barrier Reef",
          location: "Australia, Oceania",
          description:
            "Dive into the world's largest coral reef system, home to thousands of marine species and vibrant underwater landscapes.",
          rating: 4.6,
          price: 2200,
          imageUrl: "https://picsum.photos/id/135/800/500",
          tags: ["Nature", "Adventure", "Marine"],
        },
        {
          id: 6,
          name: "Serengeti Safari",
          location: "Tanzania, Africa",
          description:
            "Witness the great migration and spot the Big Five on an unforgettable safari through the vast Serengeti plains.",
          rating: 4.8,
          price: 2500,
          imageUrl: "https://picsum.photos/id/237/800/500",
          tags: ["Wildlife", "Adventure", "Nature"],
        },
        {
          id: 7,
          name: "New York City",
          location: "USA, North America",
          description:
            "Experience the energy of the city that never sleeps, with its iconic skyline, diverse neighborhoods, and cultural attractions.",
          rating: 4.5,
          price: 1900,
          imageUrl: "https://picsum.photos/id/180/800/500",
          tags: ["Urban", "Cultural", "Shopping"],
        },
        {
          id: 8,
          name: "Bali Beaches",
          location: "Indonesia, Asia",
          description:
            "Relax on pristine beaches, explore lush rice terraces, and immerse yourself in Balinese culture and spirituality.",
          rating: 4.7,
          price: 1100,
          imageUrl: "https://picsum.photos/id/173/800/500",
          tags: ["Beach", "Cultural", "Relaxation"],
        },
        {
          id: 9,
          name: "Amazon Rainforest",
          location: "Brazil, South America",
          description:
            "Journey through the world's largest rainforest, discovering incredible biodiversity and indigenous cultures.",
          rating: 4.6,
          price: 1700,
          imageUrl: "https://picsum.photos/id/167/800/500",
          tags: ["Nature", "Adventure", "Wildlife"],
        },
        {
          id: 10,
          name: "Paris Landmarks",
          location: "France, Europe",
          description:
            "Fall in love with the City of Light, from the Eiffel Tower to charming cafés and world-class museums.",
          rating: 4.7,
          price: 1600,
          imageUrl: "https://picsum.photos/id/318/800/500",
          tags: ["Romantic", "Cultural", "Historic"],
        },
        {
          id: 11,
          name: "Dubai Skyline",
          location: "UAE, Asia",
          description:
            "Marvel at futuristic architecture, luxury shopping, and desert adventures in this ultramodern city.",
          rating: 4.5,
          price: 2300,
          imageUrl: "https://picsum.photos/id/260/800/500",
          tags: ["Luxury", "Urban", "Shopping"],
        },
        {
          id: 12,
          name: "Cape Town",
          location: "South Africa, Africa",
          description:
            "Discover the perfect blend of urban sophistication, stunning natural landscapes, and rich cultural heritage.",
          rating: 4.7,
          price: 1500,
          imageUrl: "https://picsum.photos/id/110/800/500",
          tags: ["Scenic", "Cultural", "Adventure"],
        },
      ]

      setDestinations(data)
      setFilteredDestinations(data)
      setIsLoading(false)
    }

    fetchDestinations()
  }, [])

  useEffect(() => {
    // Filter destinations based on search query, region, and price
    let filtered = [...destinations]

    if (searchQuery) {
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedRegion !== "All") {
      filtered = filtered.filter((dest) => dest.location.includes(selectedRegion))
    }

    if (selectedPrice !== "All") {
      switch (selectedPrice) {
        case "Budget":
          filtered = filtered.filter((dest) => dest.price < 1300)
          break
        case "Moderate":
          filtered = filtered.filter((dest) => dest.price >= 1300 && dest.price < 2000)
          break
        case "Luxury":
          filtered = filtered.filter((dest) => dest.price >= 2000)
          break
      }
    }

    // Sort destinations
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default: // popularity (default)
        // No sorting needed as the data is already sorted by popularity
        break
    }

    setFilteredDestinations(filtered)
  }, [searchQuery, selectedRegion, selectedPrice, sortBy, destinations])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="destinations-hero">
        <div className="destinations-hero-content">
          <h1 className="hero-title">Discover Your Next Adventure</h1>
          <p className="hero-subtitle">Explore our curated collection of breathtaking destinations around the world</p>

          <div className="search-container">
            <div className="search-input-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search destinations, regions, or experiences..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-container">
              <div className="filter-item">
                <label>Region</label>
                <div className="select-wrapper">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="filter-select"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
              </div>

              <div className="filter-item">
                <label>Price Range</label>
                <div className="select-wrapper">
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="filter-select"
                  >
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
              </div>

              <button className="filter-button">
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="destinations-grid-section">
        <div className="container">
          <div className="results-header">
            <h2>
              {filteredDestinations.length} {filteredDestinations.length === 1 ? "Destination" : "Destinations"} Found
            </h2>
            <div className="sort-container">
              <label>Sort by:</label>
              <div className="select-wrapper">
                <select className="sort-select" value={sortBy} onChange={handleSortChange}>
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="select-icon" />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading amazing destinations...</p>
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="no-results">
              <h3>No destinations found</h3>
              <p>Try adjusting your search criteria or explore our suggestions below</p>
              <button
                className="reset-button"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedRegion("All")
                  setSelectedPrice("All")
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="destinations-grid">
              {filteredDestinations.map((destination) => (
                <Link href={`/destinations/${destination.id}`} key={destination.id} className="destination-card">
                  <div className="destination-image" style={{ backgroundImage: `url(${destination.imageUrl})` }}>
                    <div className="destination-price">${destination.price}</div>
                  </div>
                  <div className="destination-content">
                    <div className="destination-location">
                      <MapPin size={14} />
                      <span>{destination.location}</span>
                    </div>
                    <h3 className="destination-name">{destination.name}</h3>
                    <p className="destination-description">{destination.description}</p>
                    <div className="destination-footer">
                      <div className="destination-rating">
                        <Star className="star-icon" />
                        <span>{destination.rating}</span>
                      </div>
                      <div className="destination-tags">
                        {destination.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="destination-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="destination-button">
                      Explore <ArrowRight className="icon" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="pagination">
            <button className="pagination-button active">1</button>
            <button className="pagination-button">2</button>
            <button className="pagination-button">3</button>
            <button className="pagination-button">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="featured-experiences">
        <div className="container">
          <h2 className="section-title">Featured Experiences</h2>
          <p className="section-description">Unique activities curated by travel experts</p>

          <div className="experiences-grid">
            <div className="experience-card">
              <div
                className="experience-image"
                style={{ backgroundImage: `url(https://picsum.photos/id/29/800/500)` }}
              ></div>
              <div className="experience-content">
                <h3>Northern Lights Photography Tour</h3>
                <p>Capture the magic of the aurora borealis with expert guidance</p>
                <button className="experience-button">Learn More</button>
              </div>
            </div>

            <div className="experience-card">
              <div
                className="experience-image"
                style={{ backgroundImage: `url(https://picsum.photos/id/42/800/500)` }}
              ></div>
              <div className="experience-content">
                <h3>Culinary Journey Through Tokyo</h3>
                <p>Discover hidden gems and local favorites with a food expert</p>
                <button className="experience-button">Learn More</button>
              </div>
            </div>

            <div className="experience-card">
              <div
                className="experience-image"
                style={{ backgroundImage: `url(https://picsum.photos/id/87/800/500)` }}
              ></div>
              <div className="experience-content">
                <h3>Sahara Desert Stargazing</h3>
                <p>Experience the clearest night skies with an astronomy guide</p>
                <button className="experience-button">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
