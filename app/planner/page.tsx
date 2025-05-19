"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Calendar, Clock, MapPin, Plus, Trash2, GripVertical, Save, Download, Share2, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "@/styles/planner.css"

// Dynamically import the TravelMap component with SSR disabled
const TravelMap = dynamic(() => import("@/components/travel-map"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <div className="loading-spinner"></div>
      <p>Loading map...</p>
    </div>
  ),
})

interface ItineraryItem {
  id: string
  day: number
  time: string
  activity: string
  location: string
  coordinates?: [number, number]
}

interface TripDetails {
  title: string
  startDate: string
  endDate: string
  travelers: number
  budget: number
}

export default function PlannerPage() {
  const [items, setItems] = useState<ItineraryItem[]>([])
  const [newItem, setNewItem] = useState<Omit<ItineraryItem, "id">>({
    day: 1,
    time: "",
    activity: "",
    location: "",
  })
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    title: "Tokyo Adventure",
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    travelers: 2,
    budget: 3000,
  })
  const [draggedItem, setDraggedItem] = useState<ItineraryItem | null>(null)
  const [activeDay, setActiveDay] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const [isSaved, setIsSaved] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const plannerRef = useRef<HTMLDivElement>(null)

  // Initialize default items after component mounts
  useEffect(() => {
    setIsClient(true)

    // Initialize with default items
    setItems([
      {
        id: "1",
        day: 1,
        time: "09:00",
        activity: "Breakfast at Café Lumière",
        location: "Downtown",
        coordinates: [35.6812, 139.7671],
      },
      {
        id: "2",
        day: 1,
        time: "11:00",
        activity: "Visit Modern Art Museum",
        location: "Arts District",
        coordinates: [35.6897, 139.7756],
      },
      {
        id: "3",
        day: 1,
        time: "14:00",
        activity: "Lunch at Seaside Restaurant",
        location: "Harbor",
        coordinates: [35.6585, 139.7454],
      },
      {
        id: "4",
        day: 1,
        time: "16:00",
        activity: "Shopping at Local Market",
        location: "Old Town",
        coordinates: [35.6735, 139.7532],
      },
      {
        id: "5",
        day: 1,
        time: "19:00",
        activity: "Dinner & Live Music",
        location: "Jazz Quarter",
        coordinates: [35.665, 139.7649],
      },
      {
        id: "6",
        day: 2,
        time: "08:00",
        activity: "Morning Hike",
        location: "Mountain Trail",
        coordinates: [35.6892, 139.6917],
      },
      {
        id: "7",
        day: 2,
        time: "12:00",
        activity: "Picnic in the Park",
        location: "Central Park",
        coordinates: [35.6717, 139.7219],
      },
      {
        id: "8",
        day: 2,
        time: "15:00",
        activity: "Visit Historical Museum",
        location: "Heritage District",
        coordinates: [35.6586, 139.7454],
      },
    ])
  }, [])

  const filteredItems = items.filter((item) => item.day === activeDay)

  const handleDragStart = (item: ItineraryItem) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (!draggedItem) return

    const newItems = [...items]
    const draggedIndex = items.findIndex((item) => item.id === draggedItem.id)

    if (draggedIndex === index) return

    // Remove the dragged item
    newItems.splice(draggedIndex, 1)

    // Add it at the new position
    newItems.splice(index, 0, draggedItem)

    setItems(newItems)
    setIsSaved(false)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleAddItem = () => {
    if (!newItem.time || !newItem.activity || !newItem.location) return

    const newId = Math.random().toString(36).substr(2, 9)
    setItems([...items, { ...newItem, id: newId }])
    setNewItem({
      day: activeDay,
      time: "",
      activity: "",
      location: "",
    })
    setIsSaved(false)
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    setIsSaved(false)
  }

  const handleSave = () => {
    // In a real app, this would save to a database or local storage
    console.log("Saving itinerary:", { tripDetails, items })
    setIsSaved(true)

    // Show save confirmation
    const saveConfirmation = document.getElementById("save-confirmation")
    if (saveConfirmation) {
      saveConfirmation.classList.add("show")
      setTimeout(() => {
        saveConfirmation.classList.remove("show")
      }, 3000)
    }
  }

  const handleExport = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,"

    // Add headers
    csvContent += "Day,Time,Activity,Location\n"

    // Add data rows
    items.forEach((item) => {
      csvContent += `${item.day},${item.time},"${item.activity}","${item.location}"\n`
    })

    // Create download link
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${tripDetails.title.replace(/\s+/g, "_")}_itinerary.csv`)
    document.body.appendChild(link)

    // Trigger download
    link.click()

    // Clean up
    document.body.removeChild(link)

    // Show export confirmation
    const exportConfirmation = document.createElement("div")
    exportConfirmation.className = "export-confirmation"
    exportConfirmation.innerHTML = `
      <div class="export-confirmation-content">
        <div class="export-icon">✓</div>
        <p>Your itinerary has been exported successfully!</p>
      </div>
    `
    document.body.appendChild(exportConfirmation)

    setTimeout(() => {
      exportConfirmation.classList.add("show")
    }, 100)

    setTimeout(() => {
      exportConfirmation.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(exportConfirmation)
      }, 300)
    }, 3000)
  }

  const handleShare = async () => {
    // Create a shareable text
    const shareText =
      `Check out my trip plan: ${tripDetails.title}\n` +
      `From ${tripDetails.startDate} to ${tripDetails.endDate}\n` +
      `${tripDetails.travelers} travelers, Budget: $${tripDetails.budget}\n\n` +
      `Itinerary Highlights:\n` +
      items
        .slice(0, 3)
        .map((item) => `- Day ${item.day}: ${item.activity} at ${item.location}`)
        .join("\n")

    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${tripDetails.title} - ItineraFlow Trip Plan`,
          text: shareText,
          url: window.location.href,
        })

        // Show share success message
        const shareConfirmation = document.createElement("div")
        shareConfirmation.className = "share-confirmation"
        shareConfirmation.innerHTML = `
          <div class="share-confirmation-content">
            <div class="share-icon">✓</div>
            <p>Your itinerary has been shared successfully!</p>
          </div>
        `
        document.body.appendChild(shareConfirmation)

        setTimeout(() => {
          shareConfirmation.classList.add("show")
        }, 100)

        setTimeout(() => {
          shareConfirmation.classList.remove("show")
          setTimeout(() => {
            document.body.removeChild(shareConfirmation)
          }, 300)
        }, 3000)
      } catch (error) {
        console.error("Error sharing:", error)
        alert("Could not share the itinerary. Please try again.")
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      // Copy to clipboard
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          alert("Itinerary copied to clipboard! You can now paste and share it.")
        })
        .catch((err) => {
          console.error("Could not copy text: ", err)
          alert("Could not copy the itinerary. Please try again.")
        })
    }
  }

  const handleTripDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTripDetails({
      ...tripDetails,
      [name]: name === "travelers" || name === "budget" ? Number(value) : value,
    })
    setIsSaved(false)
  }

  // Calculate days from items
  const days = Array.from(new Set(items.map((item) => item.day))).sort((a, b) => a - b)

  // Set active day if current active day doesn't exist
  useEffect(() => {
    if (days.length > 0 && !days.includes(activeDay)) {
      setActiveDay(days[0])
    }
  }, [days, activeDay])

  // Calculate trip duration
  const calculateDuration = () => {
    if (!tripDetails.startDate || !tripDetails.endDate) return 0
    const start = new Date(tripDetails.startDate)
    const end = new Date(tripDetails.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const tripDuration = calculateDuration()

  // Handle map location selection
  const handleMapClick = (coordinates: [number, number]) => {
    setSelectedLocation(coordinates)
    // Update the new item with the selected coordinates
    setNewItem({
      ...newItem,
      coordinates,
    })
  }

  // Focus on selected item on the map
  const handleItemFocus = (coordinates?: [number, number]) => {
    if (coordinates) {
      setSelectedLocation(coordinates)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="planner-hero">
        <div className="planner-hero-content">
          <h1 className="hero-title">Plan Your Perfect Journey</h1>
          <p className="hero-subtitle">Create a detailed day-by-day itinerary for your dream trip</p>
        </div>
      </div>

      <section className="planner-section">
        <div className="container">
          <div className="planner-header">
            <div className="trip-details">
              <div className="trip-detail-item">
                <label htmlFor="title">Trip Name</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={tripDetails.title}
                  onChange={handleTripDetailsChange}
                  placeholder="Enter trip name"
                />
              </div>

              <div className="trip-dates">
                <div className="trip-detail-item">
                  <label htmlFor="startDate">Start Date</label>
                  <div className="date-input-wrapper">
                    <Calendar size={16} />
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={tripDetails.startDate}
                      onChange={handleTripDetailsChange}
                    />
                  </div>
                </div>

                <div className="trip-detail-item">
                  <label htmlFor="endDate">End Date</label>
                  <div className="date-input-wrapper">
                    <Calendar size={16} />
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={tripDetails.endDate}
                      onChange={handleTripDetailsChange}
                    />
                  </div>
                </div>
              </div>

              <div className="trip-detail-item">
                <label htmlFor="travelers">Travelers</label>
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  value={tripDetails.travelers}
                  onChange={handleTripDetailsChange}
                  min="1"
                  max="20"
                />
              </div>

              <div className="trip-detail-item">
                <label htmlFor="budget">Budget ($)</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={tripDetails.budget}
                  onChange={handleTripDetailsChange}
                  min="0"
                  step="100"
                />
              </div>
            </div>

            <div className="trip-actions">
              <button className={`save-button ${!isSaved ? "unsaved" : ""}`} onClick={handleSave}>
                <Save size={16} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>

              <button className="action-button" onClick={handleExport}>
                <Download size={16} />
                <span>Export</span>
              </button>

              <button className="action-button" onClick={handleShare}>
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="planner-content">
            <div className="planner-sidebar">
              <div className="trip-summary">
                <h3>Trip Summary</h3>
                <div className="summary-item">
                  <span>Duration:</span>
                  <span>{tripDuration} days</span>
                </div>
                <div className="summary-item">
                  <span>Activities:</span>
                  <span>{items.length}</span>
                </div>
                <div className="summary-item">
                  <span>Budget per person:</span>
                  <span>${Math.round(tripDetails.budget / tripDetails.travelers)}</span>
                </div>
                <div className="summary-item">
                  <span>Budget per day:</span>
                  <span>${Math.round(tripDetails.budget / tripDuration)}</span>
                </div>
              </div>

              <div className="days-tabs">
                <h3>Days</h3>
                <div className="days-list">
                  {days.map((day) => (
                    <button
                      key={day}
                      className={`day-tab ${day === activeDay ? "active" : ""}`}
                      onClick={() => setActiveDay(day)}
                    >
                      Day {day}
                    </button>
                  ))}
                  <button
                    className="day-tab add-day"
                    onClick={() => {
                      const newDay = Math.max(...days, 0) + 1
                      setItems([
                        ...items,
                        {
                          id: Math.random().toString(36).substr(2, 9),
                          day: newDay,
                          time: "09:00",
                          activity: "New Activity",
                          location: "Location",
                        },
                      ])
                      setActiveDay(newDay)
                      setIsSaved(false)
                    }}
                  >
                    <Plus size={16} /> Add Day
                  </button>
                </div>
              </div>

              <div className="suggested-activities">
                <h3>Suggested Activities</h3>
                <div className="suggestion-list">
                  <div
                    className="suggestion-item"
                    onClick={() => {
                      setNewItem({
                        day: activeDay,
                        time: "10:00",
                        activity: "Visit Tokyo Tower",
                        location: "Minato City",
                        coordinates: [35.6586, 139.7454],
                      })
                    }}
                  >
                    <div className="suggestion-icon">🗼</div>
                    <div className="suggestion-content">
                      <h4>Tokyo Tower</h4>
                      <p>Iconic landmark with observation decks</p>
                    </div>
                    <button className="add-suggestion">+</button>
                  </div>

                  <div
                    className="suggestion-item"
                    onClick={() => {
                      setNewItem({
                        day: activeDay,
                        time: "14:00",
                        activity: "Explore Meiji Shrine",
                        location: "Shibuya",
                        coordinates: [35.6763, 139.6993],
                      })
                    }}
                  >
                    <div className="suggestion-icon">⛩️</div>
                    <div className="suggestion-content">
                      <h4>Meiji Shrine</h4>
                      <p>Serene Shinto shrine in a forest</p>
                    </div>
                    <button className="add-suggestion">+</button>
                  </div>

                  <div
                    className="suggestion-item"
                    onClick={() => {
                      setNewItem({
                        day: activeDay,
                        time: "19:00",
                        activity: "Dinner in Shinjuku",
                        location: "Shinjuku",
                        coordinates: [35.6938, 139.7034],
                      })
                    }}
                  >
                    <div className="suggestion-icon">🍜</div>
                    <div className="suggestion-content">
                      <h4>Shinjuku Dining</h4>
                      <p>Vibrant district with countless restaurants</p>
                    </div>
                    <button className="add-suggestion">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="planner-main">
              <div className="itinerary-map">
                {isClient && (
                  <TravelMap items={filteredItems} selectedLocation={selectedLocation} onMapClick={handleMapClick} />
                )}
              </div>

              <div ref={plannerRef} className="itinerary-planner">
                <h3>Day {activeDay} Itinerary</h3>

                <div className="itinerary-timeline">
                  {filteredItems.length === 0 ? (
                    <div className="empty-itinerary">
                      <p>No activities planned for this day yet.</p>
                      <p>Add activities using the form below or select from suggestions.</p>
                    </div>
                  ) : (
                    filteredItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`itinerary-item ${draggedItem?.id === item.id ? "dragging" : ""}`}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        onMouseEnter={() => handleItemFocus(item.coordinates)}
                      >
                        <div className="item-drag-handle">
                          <GripVertical size={16} />
                        </div>
                        <div className="item-time">
                          <Clock size={16} />
                          <span>{item.time}</span>
                        </div>
                        <div className="item-content">
                          <h4 className="item-activity">{item.activity}</h4>
                          <p className="item-location">
                            <MapPin size={14} />
                            <span>{item.location}</span>
                          </p>
                        </div>
                        <button className="item-delete" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="add-itinerary-item">
                  <h4>Add New Activity</h4>
                  <div className="add-item-inputs">
                    <div className="input-group">
                      <Clock size={16} />
                      <input
                        type="time"
                        value={newItem.time}
                        onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                        placeholder="Time"
                      />
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        value={newItem.activity}
                        onChange={(e) => setNewItem({ ...newItem, activity: e.target.value })}
                        placeholder="Activity"
                      />
                    </div>
                    <div className="input-group">
                      <MapPin size={16} />
                      <input
                        type="text"
                        value={newItem.location}
                        onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <p className="map-instruction">You can also click on the map to set a location</p>
                  <button className="add-item-button" onClick={handleAddItem}>
                    <Plus size={16} /> Add Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="planner-tips">
        <div className="container">
          <h2 className="section-title">Travel Planning Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🗓️</div>
              <h3>Balance Your Schedule</h3>
              <p>Don't overpack your days. Leave room for spontaneous discoveries and rest.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">🧳</div>
              <h3>Group Activities by Area</h3>
              <p>Plan activities in the same neighborhood to minimize travel time between locations.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">💰</div>
              <h3>Budget Buffer</h3>
              <p>Add a 15-20% buffer to your budget for unexpected expenses and spontaneous opportunities.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">🌦️</div>
              <h3>Weather Contingencies</h3>
              <p>Have indoor backup plans for outdoor activities in case of bad weather.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-section">
        <div className="container">
          <h2>Ready to make your dream trip a reality?</h2>
          <p>Explore our curated destinations and start planning your next adventure</p>
          <Link href="/destinations" className="cta-button">
            Browse Destinations <ArrowRight className="icon" />
          </Link>
        </div>
      </div>

      <div id="save-confirmation" className="save-confirmation">
        <div className="save-confirmation-content">
          <div className="save-icon">✓</div>
          <p>Your itinerary has been saved successfully!</p>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .map-loading {
          height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(18, 18, 42, 0.5);
          border-radius: var(--radius);
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          margin-bottom: 1rem;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .export-confirmation,
        .share-confirmation {
          position: fixed;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--success);
          color: black;
          padding: 1rem 2rem;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          transition: bottom 0.3s ease;
          z-index: 1000;
        }

        .export-confirmation.show,
        .share-confirmation.show {
          bottom: 2rem;
        }

        .export-confirmation-content,
        .share-confirmation-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .export-icon,
        .share-icon {
          font-size: 1.5rem;
          font-weight: bold;
        }
      `}</style>
    </main>
  )
}
