"use client"

import { useState, useEffect } from "react"
import { Globe, VolumeIcon as VolumeUp, ArrowLeft, ArrowRight } from "lucide-react"

interface LanguageCard {
  id: number
  language: string
  phrase: string
  translation: string
  pronunciation: string
}

export default function LanguageCards() {
  const [cards, setCards] = useState<LanguageCard[]>([
    {
      id: 1,
      language: "Japanese",
      phrase: "Hello",
      translation: "こんにちは",
      pronunciation: "Kon-nichiwa",
    },
    {
      id: 2,
      language: "French",
      phrase: "Thank you",
      translation: "Merci beaucoup",
      pronunciation: "Mer-see bo-koo",
    },
    {
      id: 3,
      language: "Spanish",
      phrase: "Where is the bathroom?",
      translation: "¿Dónde está el baño?",
      pronunciation: "Don-deh es-tah el ban-yo",
    },
    {
      id: 4,
      language: "Italian",
      phrase: "How much does it cost?",
      translation: "Quanto costa?",
      pronunciation: "Kwan-toh kos-tah",
    },
    {
      id: 5,
      language: "German",
      phrase: "I would like to order",
      translation: "Ich möchte bestellen",
      pronunciation: "Ikh mökh-te be-shtel-len",
    },
  ])

  const [activeIndex, setActiveIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [autoFlip, setAutoFlip] = useState(false)

  const nextCard = () => {
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1))
    setFlipped(false)
  }

  const prevCard = () => {
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
    setFlipped(false)
  }

  useEffect(() => {
    if (autoFlip) {
      const flipTimer = setTimeout(() => {
        setFlipped(true)
      }, 2000)

      const nextTimer = setTimeout(() => {
        nextCard()
      }, 4000)

      return () => {
        clearTimeout(flipTimer)
        clearTimeout(nextTimer)
      }
    }
  }, [activeIndex, autoFlip])

  return (
    <section className="language-cards-section">
      <div className="container">
        <h2 className="section-title">Language Flashcards</h2>
        <p className="section-description">Learn essential phrases for your international adventures</p>

        <div className="cards-container">
          <div className="cards-controls">
            <button className="control-button" onClick={prevCard}>
              <ArrowLeft size={20} />
            </button>
          </div>

          <div className="flashcard-container">
            <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
              <div className="card-front">
                <div className="card-language">
                  <Globe size={16} />
                  <span>{cards[activeIndex].language}</span>
                </div>
                <div className="card-content">
                  <h3>{cards[activeIndex].phrase}</h3>
                </div>
                <div className="card-footer">Click to flip</div>
              </div>
              <div className="card-back">
                <div className="card-language">
                  <Globe size={16} />
                  <span>{cards[activeIndex].language}</span>
                </div>
                <div className="card-content">
                  <h3>{cards[activeIndex].translation}</h3>
                  <div className="pronunciation">
                    <VolumeUp size={16} />
                    <span>{cards[activeIndex].pronunciation}</span>
                  </div>
                </div>
                <div className="card-footer">Click to flip back</div>
              </div>
            </div>

            <div className="card-progress">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${index === activeIndex ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(index)
                    setFlipped(false)
                  }}
                ></div>
              ))}
            </div>

            <div className="auto-flip">
              <label>
                <input type="checkbox" checked={autoFlip} onChange={() => setAutoFlip(!autoFlip)} />
                <span>Auto-flip cards</span>
              </label>
            </div>
          </div>

          <div className="cards-controls">
            <button className="control-button" onClick={nextCard}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="language-tips">
          <h3>Travel Language Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>Learn the Basics</h4>
              <p>Focus on greetings, thank you, please, and basic questions first</p>
            </div>
            <div className="tip-card">
              <h4>Practice Pronunciation</h4>
              <p>Listen to native speakers and practice the sounds that don't exist in your language</p>
            </div>
            <div className="tip-card">
              <h4>Use Visual Aids</h4>
              <p>Keep a phrasebook or translation app handy for complex conversations</p>
            </div>
            <div className="tip-card">
              <h4>Embrace Mistakes</h4>
              <p>Locals appreciate your efforts even if your pronunciation isn't perfect</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .language-cards-section {
          padding: 6rem 2rem;
          background: var(--card);
        }

        .cards-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin: 3rem 0;
        }

        .control-button {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .control-button:hover {
          background: var(--primary);
          transform: scale(1.1);
        }

        .flashcard-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .flashcard {
          width: 400px;
          height: 250px;
          perspective: 1000px;
          cursor: pointer;
        }

        .flashcard.flipped .card-front {
          transform: rotateY(180deg);
        }

        .flashcard.flipped .card-back {
          transform: rotateY(0);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          transition: transform 0.6s;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .card-front {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary));
          transform: rotateY(0);
        }

        .card-back {
          background: linear-gradient(135deg, var(--secondary-dark), var(--secondary));
          transform: rotateY(-180deg);
        }

        .card-language {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          font-weight: 600;
        }

        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
        }

        .card-content h3 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }

        .pronunciation {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          font-size: 0.875rem;
        }

        .card-footer {
          padding: 0.75rem;
          text-align: center;
          font-size: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
        }

        .card-progress {
          display: flex;
          gap: 0.5rem;
        }

        .progress-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .progress-dot.active {
          background: var(--primary);
          transform: scale(1.2);
        }

        .progress-dot:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .auto-flip {
          margin-top: 1rem;
        }

        .auto-flip label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .auto-flip input {
          accent-color: var(--primary);
        }

        .language-tips {
          margin-top: 4rem;
        }

        .language-tips h3 {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--primary);
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .tip-card {
          background: rgba(18, 18, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tip-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .tip-card h4 {
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
          color: var(--primary);
        }

        .tip-card p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .flashcard {
            width: 300px;
            height: 200px;
          }

          .card-content h3 {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .cards-container {
            gap: 1rem;
          }

          .flashcard {
            width: 250px;
            height: 180px;
          }

          .card-content h3 {
            font-size: 1.25rem;
          }

          .control-button {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  )
}
