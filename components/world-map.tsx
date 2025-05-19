"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface Destination {
  id: number
  name: string
  location: string
  description: string
  coordinates: { x: number; y: number }
  image: string
}

export default function WorldMap() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [hoveredDestination, setHoveredDestination] = useState<number | null>(null)

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Tokyo",
      location: "Japan",
      description: "Experience the perfect blend of traditional culture and futuristic technology",
      coordinates: { x: 82, y: 42 },
      image: "https://picsum.photos/id/240/400/300",
    },
    {
      id: 2,
      name: "Paris",
      location: "France",
      description: "Explore the city of lights, art, and culinary excellence",
      coordinates: { x: 48, y: 38 },
      image: "https://picsum.photos/id/318/400/300",
    },
    {
      id: 3,
      name: "New York",
      location: "USA",
      description: "Discover the vibrant metropolis that never sleeps",
      coordinates: { x: 25, y: 40 },
      image: "https://picsum.photos/id/180/400/300",
    },
    {
      id: 4,
      name: "Sydney",
      location: "Australia",
      description: "Enjoy stunning beaches and iconic architecture in this harbor city",
      coordinates: { x: 88, y: 75 },
      image: "https://picsum.photos/id/260/400/300",
    },
    {
      id: 5,
      name: "Cape Town",
      location: "South Africa",
      description: "Experience breathtaking landscapes where mountains meet the ocean",
      coordinates: { x: 52, y: 78 },
      image: "https://picsum.photos/id/110/400/300",
    },
    {
      id: 6,
      name: "Rio de Janeiro",
      location: "Brazil",
      description: "Feel the rhythm of this vibrant coastal city with stunning views",
      coordinates: { x: 33, y: 68 },
      image: "https://picsum.photos/id/167/400/300",
    },
  ]

  return (
    <section className="world-map-section">
      <div className="container">
        <h2 className="section-title">Explore the World</h2>
        <p className="section-description">Discover amazing destinations across the globe</p>

        <div className="map-container">
          <div className="map-wrapper">
            <div className="map-background"></div>
            <div className="map-grid">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`h-${i}`} className="grid-line horizontal"></div>
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`v-${i}`} className="grid-line vertical"></div>
              ))}
            </div>

            {destinations.map((destination) => (
              <div
                key={destination.id}
                className={`map-pin ${hoveredDestination === destination.id ? "hovered" : ""} ${
                  selectedDestination?.id === destination.id ? "selected" : ""
                }`}
                style={{ left: `${destination.coordinates.x}%`, top: `${destination.coordinates.y}%` }}
                onClick={() => setSelectedDestination(destination)}
                onMouseEnter={() => setHoveredDestination(destination.id)}
                onMouseLeave={() => setHoveredDestination(null)}
              >
                <MapPin size={hoveredDestination === destination.id ? 24 : 20} />
                <div className="pin-pulse"></div>
                <div className="pin-label">{destination.name}</div>
              </div>
            ))}
          </div>

          {selectedDestination && (
            <div className="destination-info">
              <div className="destination-image" style={{ backgroundImage: `url(${selectedDestination.image})` }}></div>
              <div className="destination-content">
                <h3>{selectedDestination.name}</h3>
                <h4>{selectedDestination.location}</h4>
                <p>{selectedDestination.description}</p>
                <button className="explore-button">Explore Destination</button>
              </div>
              <button className="close-button" onClick={() => setSelectedDestination(null)}>
                ×
              </button>
            </div>
          )}
        </div>

        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-icon continent"></div>
            <span>Continents</span>
          </div>
          <div className="legend-item">
            <div className="legend-icon ocean"></div>
            <span>Oceans</span>
          </div>
          <div className="legend-item">
            <div className="legend-icon pin">
              <MapPin size={14} />
            </div>
            <span>Featured Destinations</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .world-map-section {
          padding: 6rem 2rem;
          background: var(--background);
        }

        .map-container {
          margin-top: 3rem;
          position: relative;
        }

        .map-wrapper {
          position: relative;
          width: 100%;
          padding-top: 50%; /* 2:1 aspect ratio */
          background: var(--card);
          border-radius: var(--radius);
          overflow: hidden;
        }

        .map-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("https://picsum.photos/id/87/1200/600");
          background-size: cover;
          background-position: center;
          opacity: 0.3;
        }

        .map-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .grid-line {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
        }

        .grid-line.horizontal {
          width: 100%;
          height: 1px;
        }

        .grid-line.vertical {
          width: 1px;
          height: 100%;
        }

        .grid-line.horizontal:nth-child(1) { top: 10%; }
        .grid-line.horizontal:nth-child(2) { top: 20%; }
        .grid-line.horizontal:nth-child(3) { top: 30%; }
        .grid-line.horizontal:nth-child(4) { top: 40%; }
        .grid-line.horizontal:nth-child(5) { top: 50%; }
        .grid-line.horizontal:nth-child(6) { top: 60%; }
        .grid-line.horizontal:nth-child(7) { top: 70%; }
        .grid-line.horizontal:nth-child(8) { top: 80%; }
        .grid-line.horizontal:nth-child(9) { top: 90%; }
        .grid-line.horizontal:nth-child(10) { top: 100%; }

        .grid-line.vertical:nth-child(11) { left: 10%; }
        .grid-line.vertical:nth-child(12) { left: 20%; }
        .grid-line.vertical:nth-child(13) { left: 30%; }
        .grid-line.vertical:nth-child(14) { left: 40%; }
        .grid-line.vertical:nth-child(15) { left: 50%; }
        .grid-line.vertical:nth-child(16) { left: 60%; }
        .grid-line.vertical:nth-child(17) { left: 70%; }
        .grid-line.vertical:nth-child(18) { left: 80%; }
        .grid-line.vertical:nth-child(19) { left: 90%; }
        .grid-line.vertical:nth-child(20) { left: 100%; }

        .map-pin {
          position: absolute;
          transform: translate(-50%, -100%);
          color: var(--primary);
          cursor: pointer;
          transition: transform 0.3s ease, color 0.3s ease;
          z-index: 2;
        }

        .map-pin.hovered {
          color: var(--accent);
          transform: translate(-50%, -100%) scale(1.2);
          z-index: 3;
        }

        .map-pin.selected {
          color: var(--secondary);
          transform: translate(-50%, -100%) scale(1.2);
          z-index: 3;
        }

        .pin-pulse {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: var(--primary);
          border-radius: 50%;
          opacity: 0.5;
          animation: pulse 2s infinite;
        }

        .map-pin.hovered .pin-pulse {
          background: var(--accent);
        }

        .map-pin.selected .pin-pulse {
          background: var(--secondary);
        }

        @keyframes pulse {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 0.5;
          }
          70% {
            transform: translateX(-50%) scale(2);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%) scale(1);
            opacity: 0;
          }
        }

        .pin-label {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10, 10, 26, 0.8);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
        }

        .map-pin.hovered .pin-label,
        .map-pin.selected .pin-label {
          opacity: 1;
          transform: translateX(-50%) translateY(-5px);
        }

        .destination-info {
          position: absolute;
          bottom: 20px;
          left: 20px;
          width: calc(100% - 40px);
          max-width: 500px;
          background: rgba(18, 18, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          overflow: hidden;
          display: flex;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .destination-image {
          width: 150px;
          background-size: cover;
          background-position: center;
        }

        .destination-content {
          flex: 1;
          padding: 1.5rem;
        }

        .destination-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .destination-content h4 {
          font-size: 1rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .destination-content p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .explore-button {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .explore-button:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 24px;
          height: 24px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .close-button:hover {
          background: var(--error);
        }

        .map-legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .legend-icon {
          width: 20px;
          height: 20px;
          border-radius: 4px;
        }

        .legend-icon.continent {
          background: rgba(255, 255, 255, 0.2);
        }

        .legend-icon.ocean {
          background: rgba(69, 166, 255, 0.2);
        }

        .legend-icon.pin {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .destination-info {
            flex-direction: column;
            max-width: none;
          }

          .destination-image {
            width: 100%;
            height: 150px;
          }

          .map-legend {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
