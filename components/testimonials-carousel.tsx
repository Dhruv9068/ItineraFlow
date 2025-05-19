"use client"

import { useState, useEffect } from "react"

interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  rating: number
  text: string
}

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      avatar: "https://picsum.photos/id/64/100/100",
      rating: 5,
      text: "ItineraFlow transformed my travel planning experience. The 3D visualization tools helped me map out my entire Japan trip with ease. I discovered hidden gems I would have never found otherwise!",
    },
    {
      id: 2,
      name: "Miguel Rodriguez",
      location: "Barcelona, Spain",
      avatar: "https://picsum.photos/id/91/100/100",
      rating: 4,
      text: "As a frequent business traveler, I needed something to help me make the most of my limited free time in new cities. This platform's itinerary suggestions are spot-on and save me hours of research.",
    },
    {
      id: 3,
      name: "Aisha Patel",
      location: "London, UK",
      avatar: "https://picsum.photos/id/26/100/100",
      rating: 5,
      text: "The budget calculator feature is a game-changer! I was able to plan a 2-week European tour without going over budget. The language flashcards also came in handy during my travels.",
    },
    {
      id: 4,
      name: "David Chen",
      location: "Sydney, Australia",
      avatar: "https://picsum.photos/id/65/100/100",
      rating: 5,
      text: "I planned our family vacation using ItineraFlow and it was the smoothest trip we've ever had. The kids loved seeing the 3D previews of where we were going. Highly recommend!",
    },
  ]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [activeIndex, isAnimating])

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">What Travelers Say</h2>
        <p className="section-description">
          Hear from adventurers who have transformed their travel experiences with ItineraFlow
        </p>

        <div className="testimonials-carousel">
          <div className="testimonials-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="quote-icon">"</div>
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`star ${i < testimonial.rating ? "filled" : ""}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar" style={{ backgroundImage: `url(${testimonial.avatar})` }}></div>
                    <div className="author-info">
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="control-button prev" onClick={prevSlide}>
              &#10094;
            </button>
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
                  onClick={() => {
                    if (isAnimating) return
                    setIsAnimating(true)
                    setActiveIndex(index)
                    setTimeout(() => setIsAnimating(false), 500)
                  }}
                ></button>
              ))}
            </div>
            <button className="control-button next" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          padding: 6rem 2rem;
          background: var(--card);
        }

        .testimonials-carousel {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 3rem auto 0;
          overflow: hidden;
        }

        .testimonials-track {
          display: flex;
          transition: transform 0.5s ease;
        }

        .testimonial-slide {
          min-width: 100%;
          padding: 1rem;
        }

        .testimonial-card {
          background: rgba(18, 18, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .testimonial-content {
          position: relative;
          padding: 2rem;
          flex: 1;
        }

        .quote-icon {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 4rem;
          color: var(--primary);
          opacity: 0.2;
          font-family: serif;
          line-height: 1;
        }

        .testimonial-text {
          position: relative;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          z-index: 1;
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
        }

        .star {
          color: rgba(255, 255, 255, 0.3);
          font-size: 1.25rem;
        }

        .star.filled {
          color: var(--warning);
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(10, 10, 26, 0.5);
        }

        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          border: 2px solid var(--primary);
        }

        .author-info h3 {
          font-size: 1.125rem;
          margin-bottom: 0.25rem;
        }

        .author-info p {
          font-size: 0.875rem;
          color: var(--primary);
        }

        .carousel-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .control-button {
          width: 40px;
          height: 40px;
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

        .control-button:hover {
          background: var(--primary);
        }

        .carousel-dots {
          display: flex;
          gap: 0.5rem;
        }

        .carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .carousel-dot.active {
          background: var(--primary);
          transform: scale(1.2);
        }

        .carousel-dot:hover:not(.active) {
          background: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
          .testimonial-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
