"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface Destination {
  id: number
  name: string
  location: string
  image: string
}

export default function DestinationGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Kyoto Gardens",
      location: "Japan",
      image: "https://picsum.photos/id/240/800/500",
    },
    {
      id: 2,
      name: "Santorini Sunset",
      location: "Greece",
      image: "https://picsum.photos/id/164/800/500",
    },
    {
      id: 3,
      name: "Northern Lights",
      location: "Iceland",
      image: "https://picsum.photos/id/142/800/500",
    },
    {
      id: 4,
      name: "Machu Picchu",
      location: "Peru",
      image: "https://picsum.photos/id/137/800/500",
    },
    {
      id: 5,
      name: "Great Barrier Reef",
      location: "Australia",
      image: "https://picsum.photos/id/135/800/500",
    },
  ]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, isAnimating])

  return (
    <section className="destination-gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-description">Explore our most sought-after travel experiences</p>
        </div>

        <div className="gallery-content">
          <div className="gallery-main">
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`gallery-slide ${index === activeIndex ? "active" : ""}`}
                style={{ backgroundImage: `url(${destination.image})` }}
              >
                <div className="slide-content">
                  <h3>{destination.name}</h3>
                  <p>{destination.location}</p>
                </div>
              </div>
            ))}

            <button className="gallery-nav prev" onClick={prevSlide}>
              <ArrowLeft size={24} />
            </button>
            <button className="gallery-nav next" onClick={nextSlide}>
              <ArrowRight size={24} />
            </button>
          </div>

          <div className="gallery-thumbs">
            {destinations.map((destination, index) => (
              <div
                key={`thumb-${destination.id}`}
                className={`gallery-thumb ${index === activeIndex ? "active" : ""}`}
                onClick={() => {
                  if (isAnimating) return
                  setIsAnimating(true)
                  setActiveIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }}
              >
                <div className="thumb-image" style={{ backgroundImage: `url(${destination.image})` }}></div>
                <div className="thumb-content">
                  <h4>{destination.name}</h4>
                  <p>{destination.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .destination-gallery {
          padding: 6rem 2rem;
          background: var(--background);
        }

        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .gallery-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .gallery-main {
          position: relative;
          height: 500px;
          border-radius: var(--radius);
          overflow: hidden;
        }

        .gallery-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .gallery-slide.active {
          opacity: 1;
          z-index: 1;
        }

        .slide-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
          color: white;
        }

        .slide-content h3 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-display);
        }

        .gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          z-index: 2;
          transition: background 0.3s ease;
        }

        .gallery-nav:hover {
          background: var(--primary);
        }

        .gallery-nav.prev {
          left: 20px;
        }

        .gallery-nav.next {
          right: 20px;
        }

        .gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }

        .gallery-thumb {
          border-radius: var(--radius);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          height: 100px;
          transition: transform 0.3s ease;
        }

        .gallery-thumb:hover {
          transform: translateY(-5px);
        }

        .gallery-thumb.active {
          box-shadow: 0 0 0 3px var(--primary);
        }

        .thumb-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }

        .thumb-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 0.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
          color: white;
        }

        .thumb-content h4 {
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .thumb-content p {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        @media (max-width: 992px) {
          .gallery-main {
            height: 400px;
          }

          .gallery-thumbs {
            grid-template-columns: repeat(3, 1fr);
          }

          .gallery-thumb {
            height: 80px;
          }
        }

        @media (max-width: 768px) {
          .gallery-thumbs {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .gallery-main {
            height: 300px;
          }

          .slide-content h3 {  {
          .gallery-main {
            height: 300px;
          }

          .slide-content h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
