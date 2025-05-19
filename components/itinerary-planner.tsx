"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Plus, Minus } from "lucide-react"

interface ItineraryDay {
  id: number
  activities: string[]
}

export default function ItineraryPlanner() {
  const [days, setDays] = useState<ItineraryDay[]>([
    { id: 1, activities: ["Check-in to hotel", "Explore local neighborhood", "Welcome dinner"] },
    { id: 2, activities: ["Visit historical sites", "Lunch at local restaurant", "Afternoon museum tour"] },
    { id: 3, activities: ["Day trip to nearby attractions", "Sunset boat cruise", "Dinner at waterfront"] },
  ])

  const [activeDay, setActiveDay] = useState(1)
  const [newActivity, setNewActivity] = useState("")

  const addActivity = () => {
    if (!newActivity.trim()) return

    setDays(
      days.map((day) => {
        if (day.id === activeDay) {
          return {
            ...day,
            activities: [...day.activities, newActivity],
          }
        }
        return day
      }),
    )

    setNewActivity("")
  }

  const removeActivity = (dayId: number, index: number) => {
    setDays(
      days.map((day) => {
        if (day.id === dayId) {
          const newActivities = [...day.activities]
          newActivities.splice(index, 1)
          return {
            ...day,
            activities: newActivities,
          }
        }
        return day
      }),
    )
  }

  const addDay = () => {
    const newId = Math.max(...days.map((d) => d.id)) + 1
    setDays([...days, { id: newId, activities: ["Explore new location"] }])
    setActiveDay(newId)
  }

  const removeDay = (id: number) => {
    if (days.length <= 1) return
    setDays(days.filter((day) => day.id !== id))
    if (activeDay === id) {
      setActiveDay(days[0].id)
    }
  }

  return (
    <section className="itinerary-planner-section">
      <div className="container">
        <h2 className="section-title">Plan Your Perfect Itinerary</h2>
        <p className="section-description">Organize your trip day by day with our interactive planner</p>

        <div className="planner-container">
          <div className="days-sidebar">
            <div className="days-header">
              <h3>Trip Days</h3>
              <button className="add-day-button" onClick={addDay}>
                <Plus size={16} />
                Add Day
              </button>
            </div>

            <div className="days-list">
              {days.map((day) => (
                <div
                  key={day.id}
                  className={`day-item ${activeDay === day.id ? "active" : ""}`}
                  onClick={() => setActiveDay(day.id)}
                >
                  <div className="day-info">
                    <Calendar size={16} />
                    <span>Day {day.id}</span>
                  </div>
                  {days.length > 1 && (
                    <button className="remove-day-button" onClick={() => removeDay(day.id)}>
                      <Minus size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="day-activities">
            <div className="day-header">
              <h3>Day {activeDay} Activities</h3>
              <div className="day-date">
                <Clock size={16} />
                <span>June {14 + activeDay}, 2025</span>
              </div>
            </div>

            <div className="activities-list">
              {days
                .find((day) => day.id === activeDay)
                ?.activities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-time">
                      {index === 0 ? "09:00" : index === 1 ? "13:00" : index === 2 ? "18:00" : "20:00"}
                    </div>
                    <div className="activity-content">
                      <div className="activity-text">{activity}</div>
                      <button className="remove-activity-button" onClick={() => removeActivity(activeDay, index)}>
                        <Minus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="add-activity">
              <input
                type="text"
                placeholder="Add a new activity..."
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addActivity()
                }}
              />
              <button className="add-activity-button" onClick={addActivity}>
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>

          <div className="day-map">
            <div className="map-header">
              <h3>Location</h3>
              <div className="location-info">
                <MapPin size={16} />
                <span>Tokyo, Japan</span>
              </div>
            </div>
            <div className="map-placeholder" style={{ backgroundImage: "url(https://picsum.photos/id/87/600/400)" }}>
              <div className="map-overlay">
                <div className="map-point" style={{ top: "30%", left: "40%" }}>
                  <div className="point-pulse"></div>
                  <div className="point-label">Hotel</div>
                </div>
                <div className="map-point" style={{ top: "50%", left: "60%" }}>
                  <div className="point-pulse"></div>
                  <div className="point-label">Restaurant</div>
                </div>
                <div className="map-point" style={{ top: "70%", left: "30%" }}>
                  <div className="point-pulse"></div>
                  <div className="point-label">Museum</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .itinerary-planner-section {
          padding: 6rem 2rem;
          background: var(--card);
        }

        .planner-container {
          display: grid;
          grid-template-columns: 250px 1fr 300px;
          gap: 2rem;
          margin-top: 3rem;
          background: rgba(18, 18, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          overflow: hidden;
        }

        .days-sidebar {
          background: rgba(10, 10, 26, 0.5);
          padding: 1.5rem;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .days-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .days-header h3 {
          font-size: 1.25rem;
          color: var(--primary);
        }

        .add-day-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          padding: 0.5rem;
          border-radius: var(--radius);
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .add-day-button:hover {
          background: var(--primary);
        }

        .days-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .day-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius);
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .day-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .day-item.active {
          background: var(--primary);
        }

        .day-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .remove-day-button {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .remove-day-button:hover {
          background: var(--error);
        }

        .day-activities {
          padding: 1.5rem;
        }

        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .day-header h3 {
          font-size: 1.25rem;
          color: var(--primary);
        }

        .day-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius);
          overflow: hidden;
        }

        .activity-time {
          background: rgba(153, 69, 255, 0.2);
          padding: 1rem;
          min-width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: var(--primary);
        }

        .activity-content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
        }

        .remove-activity-button {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .remove-activity-button:hover {
          background: var(--error);
        }

        .add-activity {
          display: flex;
          gap: 0.5rem;
        }

        .add-activity input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 0.75rem 1rem;
          color: white;
          outline: none;
        }

        .add-activity-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: var(--radius);
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .add-activity-button:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        .day-map {
          background: rgba(10, 10, 26, 0.5);
          padding: 1.5rem;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .map-header h3 {
          font-size: 1.25rem;
          color: var(--primary);
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .map-placeholder {
          height: 400px;
          background-size: cover;
          background-position: center;
          border-radius: var(--radius);
          position: relative;
          overflow: hidden;
        }

        .map-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 26, 0.3);
        }

        .map-point {
          position: absolute;
          width: 20px;
          height: 20px;
        }

        .point-pulse {
          position: absolute;
          width: 20px;
          height: 20px;
          background: var(--primary);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .point-label {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10, 10, 26, 0.8);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @media (max-width: 1200px) {
          .planner-container {
            grid-template-columns: 200px 1fr 250px;
          }
        }

        @media (max-width: 992px) {
          .planner-container {
            grid-template-columns: 1fr;
          }

          .days-sidebar {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .day-map {
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </section>
  )
}
