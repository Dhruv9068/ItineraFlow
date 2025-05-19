"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, MapPin, Calendar, Users, Clock, Heart, Share2, Bookmark } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TravelMap from "@/components/travel-map"

interface Destination {
  id: number
  name: string
  location: string
  description: string
  longDescription: string
  rating: number
  price: number
  imageUrl: string
  galleryImages: string[]
  tags: string[]
  highlights: string[]
  coordinates: [number, number]
  duration: string
  groupSize: string
  bestTime: string
}

export default function DestinationDetail() {
  const params = useParams()
  const router = useRouter()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    // Simulate fetching destination data
    const fetchDestination = async () => {
      setIsLoading(true)

      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data for the destination
        const data: Destination = {
          id: Number(params.id),
          name: "Kyoto Gardens",
          location: "Japan, Asia",
          description:
            "Experience the serene beauty of traditional Japanese gardens and temples in the historic city of Kyoto.",
          longDescription:
            "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It's also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.\n\nThe gardens of Kyoto are renowned for their careful design and meticulous maintenance. The Zen gardens, or karesansui, use rocks, moss, pruned trees and sand or gravel that is raked to represent ripples in water. These gardens are meant to be a place of meditation and reflection.\n\nKyoto's temples are some of the most famous in Japan. Kinkaku-ji (Golden Pavilion) is a Zen temple whose top two floors are completely covered in gold leaf. Ginkaku-ji (Silver Pavilion) is another Zen temple with beautiful grounds including a sand garden and moss garden. Kiyomizu-dera is a Buddhist temple part of the Historic Monuments of Ancient Kyoto UNESCO World Heritage site.",
          rating: 4.8,
          price: 1200,
          imageUrl: "https://picsum.photos/id/240/800/500",
          galleryImages: [
            "https://picsum.photos/id/240/800/500",
            "https://picsum.photos/id/237/800/500",
            "https://picsum.photos/id/238/800/500",
            "https://picsum.photos/id/239/800/500",
          ],
          tags: ["Cultural", "Historic", "Peaceful", "Nature", "Photography"],
          highlights: [
            "Visit the iconic Fushimi Inari Shrine with its thousands of vermilion torii gates",
            "Experience a traditional tea ceremony in an authentic tea house",
            "Explore the bamboo groves of Arashiyama",
            "See the golden pavilion of Kinkaku-ji reflecting in the mirror pond",
            "Stroll through the rock garden at Ryoan-ji Temple",
          ],
          coordinates: [35.0116, 135.7681],
          duration: "5-7 days recommended",
          groupSize: "Solo travelers, couples, and small groups",
          bestTime: "March-May (cherry blossoms) and October-November (fall colors)",
        }

        setDestination(data)
        setIsLoading(false)
      }, 1000)
    }

    fetchDestination()
  }, [params.id])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading destination details...</p>
        </div>
      </main>
    )
  }

  if (!destination) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Destination not found</h1>
          <p className="mb-8">The destination you're looking for doesn't exist or has been removed.</p>
          <Link href="/destinations" className="btn-primary">
            <ArrowLeft className="mr-2" size={16} />
            Back to Destinations
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="destination-detail">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/destinations" className="breadcrumb-link">
              <ArrowLeft size={16} />
              <span>Back to Destinations</span>
            </Link>
          </div>

          <div className="destination-header">
            <div className="destination-title">
              <h1>{destination.name}</h1>
              <div className="destination-location">
                <MapPin size={16} />
                <span>{destination.location}</span>
              </div>
            </div>

            <div className="destination-rating">
              <Star className="star-icon" />
              <span>{destination.rating}</span>
              <span className="rating-count">(124 reviews)</span>
            </div>
          </div>

          <div className="destination-gallery">
            <div className="gallery-main">
              <Image
                src={destination.galleryImages[activeImage] || "/placeholder.svg"}
                alt={destination.name}
                width={800}
                height={500}
                className="main-image"
              />
              <div className="gallery-actions">
                <button className="action-button">
                  <Heart size={20} />
                </button>
                <button className="action-button">
                  <Share2 size={20} />
                </button>
                <button className="action-button">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>
            <div className="gallery-thumbs">
              {destination.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`gallery-thumb ${index === activeImage ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${destination.name} ${index + 1}`}
                    width={200}
                    height={120}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="destination-content">
            <div className="destination-main">
              <div className="destination-tags">
                {destination.tags.map((tag) => (
                  <span key={tag} className="destination-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="destination-description">
                <h2>Overview</h2>
                <p>{destination.longDescription}</p>
              </div>

              <div className="destination-highlights">
                <h2>Highlights</h2>
                <ul>
                  {destination.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="destination-map">
                <h2>Location</h2>
                <div className="map-container">
                  <TravelMap
                    items={[
                      {
                        id: destination.id.toString(),
                        activity: destination.name,
                        location: destination.location,
                        coordinates: destination.coordinates,
                      },
                    ]}
                    selectedLocation={destination.coordinates}
                    onMapClick={() => {}}
                  />
                </div>
              </div>
            </div>

            <div className="destination-sidebar">
              <div className="booking-card">
                <div className="booking-price">
                  <span className="price">${destination.price}</span>
                  <span className="price-note">per person</span>
                </div>

                <div className="booking-info">
                  <div className="info-item">
                    <Calendar size={16} />
                    <div>
                      <strong>Duration</strong>
                      <span>{destination.duration}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <Users size={16} />
                    <div>
                      <strong>Group Size</strong>
                      <span>{destination.groupSize}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <Clock size={16} />
                    <div>
                      <strong>Best Time to Visit</strong>
                      <span>{destination.bestTime}</span>
                    </div>
                  </div>
                </div>

                <button className="booking-button">Book This Trip</button>
                <button className="inquiry-button">Send Inquiry</button>
              </div>

              <div className="weather-card">
                <h3>Weather Forecast</h3>
                <div className="weather-forecast">
                  <div className="forecast-day">
                    <span className="day">Today</span>
                    <div className="weather-icon">☀️</div>
                    <span className="temperature">24°C</span>
                  </div>
                  <div className="forecast-day">
                    <span className="day">Tomorrow</span>
                    <div className="weather-icon">⛅</div>
                    <span className="temperature">22°C</span>
                  </div>
                  <div className="forecast-day">
                    <span className="day">Wed</span>
                    <div className="weather-icon">🌧️</div>
                    <span className="temperature">19°C</span>
                  </div>
                </div>
              </div>

              <div className="similar-destinations">
                <h3>Similar Destinations</h3>
                <div className="similar-list">
                  <Link href="/destinations/2" className="similar-item">
                    <Image src="https://picsum.photos/id/164/100/100" alt="Santorini" width={60} height={60} />
                    <div className="similar-info">
                      <h4>Santorini Sunset</h4>
                      <span>Greece, Europe</span>
                    </div>
                  </Link>
                  <Link href="/destinations/3" className="similar-item">
                    <Image src="https://picsum.photos/id/142/100/100" alt="Northern Lights" width={60} height={60} />
                    <div className="similar-info">
                      <h4>Northern Lights</h4>
                      <span>Iceland, Europe</span>
                    </div>
                  </Link>
                  <Link href="/destinations/8" className="similar-item">
                    <Image src="https://picsum.photos/id/173/100/100" alt="Bali Beaches" width={60} height={60} />
                    <div className="similar-info">
                      <h4>Bali Beaches</h4>
                      <span>Indonesia, Asia</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .destination-detail {
          padding-top: 80px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .breadcrumb {
          margin-bottom: 2rem;
        }

        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary);
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .breadcrumb-link:hover {
          color: var(--secondary);
        }

        .destination-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .destination-title h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-family: var(--font-display);
        }

        .destination-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--secondary);
        }

        .destination-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
        }

        .star-icon {
          color: var(--warning);
        }

        .rating-count {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .destination-gallery {
          margin-bottom: 3rem;
        }

        .gallery-main {
          position: relative;
          margin-bottom: 1rem;
          border-radius: var(--radius);
          overflow: hidden;
        }

        .main-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .gallery-actions {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
        }

        .action-button {
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .action-button:hover {
          background: var(--primary);
        }

        .gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .gallery-thumb {
          border-radius: var(--radius);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .gallery-thumb:hover {
          transform: translateY(-5px);
        }

        .gallery-thumb.active {
          box-shadow: 0 0 0 3px var(--primary);
        }

        .gallery-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .destination-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .destination-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .destination-tag {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
        }

        .destination-description,
        .destination-highlights,
        .destination-map {
          margin-bottom: 3rem;
        }

        .destination-description h2,
        .destination-highlights h2,
        .destination-map h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .destination-description p {
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          white-space: pre-line;
        }

        .destination-highlights ul {
          list-style-position: inside;
          color: rgba(255, 255, 255, 0.8);
        }

        .destination-highlights li {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }

        .map-container {
          height: 400px;
          border-radius: var(--radius);
          overflow: hidden;
        }

        .booking-card,
        .weather-card,
        .similar-destinations {
          background: rgba(18, 18, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .booking-price {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .price {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
        }

        .price-note {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .booking-info {
          margin-bottom: 1.5rem;
        }

        .info-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-item > div {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-item strong {
          font-weight: 600;
        }

        .info-item span {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .booking-button,
        .inquiry-button {
          width: 100%;
          padding: 1rem;
          border-radius: var(--radius);
          font-weight: 600;
          text-align: center;
          transition: background 0.3s ease, transform 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .booking-button {
          background: var(--primary);
          color: white;
          margin-bottom: 1rem;
        }

        .booking-button:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        .inquiry-button {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .inquiry-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .weather-card h3,
        .similar-destinations h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .weather-forecast {
          display: flex;
          justify-content: space-between;
        }

        .forecast-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .day {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .weather-icon {
          font-size: 2rem;
        }

        .temperature {
          font-weight: 600;
        }

        .similar-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .similar-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius);
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .similar-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .similar-item img {
          border-radius: var(--radius);
        }

        .similar-info h4 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .similar-info span {
          font-size: 0.875rem;
          color: var(--secondary);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: calc(100vh - 80px);
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          margin-bottom: 1rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 992px) {
          .destination-content {
            grid-template-columns: 1fr;
          }

          .destination-sidebar {
            order: -1;
          }

          .booking-card {
            max-width: 500px;
          }
        }

        @media (max-width: 768px) {
          .destination-title h1 {
            font-size: 2rem;
          }

          .gallery-thumbs {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .container {
            padding: 1rem;
          }

          .destination-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .destination-rating {
            align-self: flex-start;
          }
        }
      `}</style>
    </main>
  )
}
