"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface TravelMapProps {
  items: {
    id: string
    activity: string
    location: string
    coordinates?: [number, number]
  }[]
  selectedLocation: [number, number] | null
  onMapClick: (coordinates: [number, number]) => void
}

export default function TravelMap({ items, selectedLocation, onMapClick }: TravelMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === "undefined") return
    if (!mapRef.current) return

    // Initialize map if it doesn't exist
    if (!leafletMapRef.current) {
      // Default to Tokyo if no coordinates are provided
      const defaultCenter: [number, number] = [35.6762, 139.6503]

      // Create map
      const map = L.map(mapRef.current).setView(defaultCenter, 12)
      map.setLanguage("en")

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        language: "en",
      }).addTo(map)

      // Add click handler
      map.on("click", (e) => {
        const { lat, lng } = e.latlng
        onMapClick([lat, lng])
      })

      leafletMapRef.current = map
    }

    // Clean up previous markers
    markersRef.current.forEach((marker) => {
      marker.remove()
    })
    markersRef.current = []

    // Add markers for items with coordinates
    items.forEach((item) => {
      if (item.coordinates) {
        const marker = L.marker(item.coordinates)
          .addTo(leafletMapRef.current!)
          .bindPopup(`<strong>${item.activity}</strong><br>${item.location}`)

        markersRef.current.push(marker)
      }
    })

    // If there are markers, fit the map to show all of them
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current)
      leafletMapRef.current!.fitBounds(group.getBounds(), { padding: [50, 50] })
    }

    // If there's a selected location, highlight it
    if (selectedLocation) {
      // Check if there's already a marker at this location
      const existingMarker = markersRef.current.find((marker) => {
        const latLng = marker.getLatLng()
        return latLng.lat === selectedLocation[0] && latLng.lng === selectedLocation[1]
      })

      if (!existingMarker) {
        const marker = L.marker(selectedLocation, {
          icon: L.divIcon({
            className: "selected-location-marker",
            html: '<div class="pulse"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          }),
        }).addTo(leafletMapRef.current!)

        markersRef.current.push(marker)
      }

      leafletMapRef.current!.setView(selectedLocation, 14)
    }

    return () => {
      // No need to destroy the map on component unmount
      // We'll keep it for reuse
    }
  }, [items, selectedLocation, onMapClick])

  return (
    <div ref={mapRef} className="map-container" style={{ height: "400px", width: "100%" }}>
      {/* Map will be rendered here */}
    </div>
  )
}
