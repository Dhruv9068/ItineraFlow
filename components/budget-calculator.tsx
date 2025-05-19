"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DollarSign, Plane, Bed, Utensils, Map, Plus, Minus } from "lucide-react"

interface ExpenseCategory {
  id: string
  name: string
  icon: React.ReactNode
  amount: number
  color: string
}

export default function BudgetCalculator() {
  const [categories, setCategories] = useState<ExpenseCategory[]>([
    {
      id: "transportation",
      name: "Transportation",
      icon: <Plane size={20} />,
      amount: 500,
      color: "#9945ff",
    },
    {
      id: "accommodation",
      name: "Accommodation",
      icon: <Bed size={20} />,
      amount: 800,
      color: "#45a6ff",
    },
    {
      id: "food",
      name: "Food & Drinks",
      icon: <Utensils size={20} />,
      amount: 400,
      color: "#ff45a6",
    },
    {
      id: "activities",
      name: "Activities",
      icon: <Map size={20} />,
      amount: 300,
      color: "#45ff99",
    },
  ])

  const [totalBudget, setTotalBudget] = useState(2000)
  const [travelers, setTravelers] = useState(2)
  const [days, setDays] = useState(7)

  const totalExpenses = categories.reduce((sum, category) => sum + category.amount, 0)
  const remainingBudget = totalBudget - totalExpenses

  const updateCategoryAmount = (id: string, amount: number) => {
    setCategories(
      categories.map((category) => {
        if (category.id === id) {
          return { ...category, amount }
        }
        return category
      }),
    )
  }

  useEffect(() => {
    // Draw the chart
    const drawChart = () => {
      if (typeof window === "undefined") return

      const canvas = document.getElementById("budget-chart") as HTMLCanvasElement
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set dimensions
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 20

      // Draw segments
      let startAngle = 0
      categories.forEach((category) => {
        const portion = category.amount / totalExpenses
        const endAngle = startAngle + portion * 2 * Math.PI

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle)
        ctx.fillStyle = category.color
        ctx.fill()

        // Draw label
        const midAngle = startAngle + (endAngle - startAngle) / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius

        if (portion > 0.1) {
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 12px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${Math.round(portion * 100)}%`, labelX, labelY)
        }

        startAngle = endAngle
      })

      // Draw center circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI)
      ctx.fillStyle = "#12122a"
      ctx.fill()

      // Draw total in center
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`$${totalExpenses}`, centerX, centerY - 10)
      ctx.font = "12px Arial"
      ctx.fillText("Total", centerX, centerY + 10)
    }

    drawChart()

    if (typeof window !== "undefined") {
      window.addEventListener("resize", drawChart)

      return () => {
        window.removeEventListener("resize", drawChart)
      }
    }
  }, [categories, totalExpenses])

  return (
    <section className="budget-calculator-section">
      <div className="container">
        <h2 className="section-title">Budget Calculator</h2>
        <p className="section-description">Plan your expenses and stay within your travel budget</p>

        <div className="calculator-container">
          <div className="budget-settings">
            <div className="budget-header">
              <h3>Trip Settings</h3>
            </div>

            <div className="settings-group">
              <label>Total Budget</label>
              <div className="budget-input">
                <DollarSign size={16} />
                <input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Math.max(0, Number.parseInt(e.target.value) || 0))}
                  min="0"
                  step="100"
                />
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-group">
                <label>Travelers</label>
                <div className="number-input">
                  <button className="number-button" onClick={() => setTravelers(Math.max(1, travelers - 1))}>
                    <Minus size={14} />
                  </button>
                  <span>{travelers}</span>
                  <button className="number-button" onClick={() => setTravelers(travelers + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="settings-group">
                <label>Days</label>
                <div className="number-input">
                  <button className="number-button" onClick={() => setDays(Math.max(1, days - 1))}>
                    <Minus size={14} />
                  </button>
                  <span>{days}</span>
                  <button className="number-button" onClick={() => setDays(days + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="budget-summary">
              <div className="summary-item">
                <span>Per Person</span>
                <span>${Math.round(totalBudget / travelers)}</span>
              </div>
              <div className="summary-item">
                <span>Per Day</span>
                <span>${Math.round(totalBudget / days)}</span>
              </div>
              <div className="summary-item">
                <span>Per Person/Day</span>
                <span>${Math.round(totalBudget / travelers / days)}</span>
              </div>
            </div>

            <div className="budget-status">
              <div className="status-label">
                <span>Remaining</span>
                <span className={remainingBudget < 0 ? "negative" : ""}>${remainingBudget}</span>
              </div>
              <div className="status-bar">
                <div
                  className="status-fill"
                  style={{
                    width: `${Math.min(100, (totalExpenses / totalBudget) * 100)}%`,
                    backgroundColor: remainingBudget < 0 ? "var(--error)" : "var(--primary)",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="budget-chart">
            <canvas id="budget-chart" width="300" height="300"></canvas>
          </div>

          <div className="expense-categories">
            <div className="categories-header">
              <h3>Expense Categories</h3>
            </div>

            <div className="categories-list">
              {categories.map((category) => (
                <div key={category.id} className="category-item">
                  <div className="category-info">
                    <div className="category-icon" style={{ backgroundColor: category.color }}>
                      {category.icon}
                    </div>
                    <span>{category.name}</span>
                  </div>
                  <div className="category-amount">
                    <DollarSign size={14} />
                    <input
                      type="number"
                      value={category.amount}
                      onChange={(e) =>
                        updateCategoryAmount(category.id, Math.max(0, Number.parseInt(e.target.value) || 0))
                      }
                      min="0"
                      step="50"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="budget-tips">
              <h4>Budget Tips</h4>
              <ul>
                <li>Consider shoulder season for better deals</li>
                <li>Book accommodations with kitchen access to save on meals</li>
                <li>Research free activities at your destination</li>
                <li>Set aside 10-15% of your budget for unexpected expenses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .budget-calculator-section {
          padding: 6rem 2rem;
          background: var(--background);
        }

        .calculator-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
          background: rgba(18, 18, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          overflow: hidden;
        }

        .budget-settings,
        .expense-categories {
          padding: 1.5rem;
        }

        .budget-chart {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .budget-header,
        .categories-header {
          margin-bottom: 1.5rem;
        }

        .budget-header h3,
        .categories-header h3 {
          font-size: 1.25rem;
          color: var(--primary);
        }

        .settings-group {
          margin-bottom: 1.5rem;
        }

        .settings-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .budget-input {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 0 1rem;
        }

        .budget-input input {
          flex: 1;
          background: none;
          border: none;
          padding: 0.75rem 0;
          color: white;
          outline: none;
        }

        .settings-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .number-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 0.5rem;
        }

        .number-button {
          width: 24px;
          height: 24px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .number-button:hover {
          background: var(--primary);
        }

        .budget-summary {
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius);
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .budget-status {
          margin-top: 1.5rem;
        }

        .status-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .status-label .negative {
          color: var(--error);
        }

        .status-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .status-fill {
          height: 100%;
          transition: width 0.3s ease, background-color 0.3s ease;
        }

        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius);
          padding: 0.75rem 1rem;
        }

        .category-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .category-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .category-amount {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .category-amount input {
          width: 80px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: var(--radius);
          padding: 0.5rem;
          color: white;
          outline: none;
          text-align: right;
        }

        .budget-tips {
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius);
          padding: 1rem;
        }

        .budget-tips h4 {
          margin-bottom: 0.75rem;
          color: var(--primary);
        }

        .budget-tips ul {
          list-style-position: inside;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .budget-tips li {
          margin-bottom: 0.5rem;
        }

        @media (max-width: 1200px) {
          .calculator-container {
            grid-template-columns: 1fr 1fr;
          }

          .budget-chart {
            grid-column: span 2;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-left: none;
            border-right: none;
          }
        }

        @media (max-width: 768px) {
          .calculator-container {
            grid-template-columns: 1fr;
          }

          .budget-chart {
            grid-column: span 1;
          }

          .budget-settings,
          .expense-categories {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </section>
  )
}
