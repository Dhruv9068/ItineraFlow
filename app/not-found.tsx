"use client"

import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for seems to have wandered off the map.</p>
        <Link href="/" className="home-button">
          <Home size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="compass-animation">
        <div className="compass-ring outer"></div>
        <div className="compass-ring inner"></div>
        <div className="compass-face">
          <div className="compass-needle"></div>
          <div className="compass-center"></div>
          <div className="compass-cardinal n">N</div>
          <div className="compass-cardinal e">E</div>
          <div className="compass-cardinal s">S</div>
          <div className="compass-cardinal w">W</div>
        </div>
      </div>

      <style jsx>{`
        .not-found-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: var(--background);
          padding: 2rem;
          text-align: center;
        }

        .not-found-content {
          max-width: 500px;
          margin-bottom: 3rem;
        }

        h1 {
          font-size: 8rem;
          font-weight: 700;
          margin-bottom: 0;
          line-height: 1;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        p {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
        }

        .home-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius);
          font-weight: 600;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .home-button:hover {
          background: var(--primary-dark);
          transform: translateY(-3px);
        }

        .compass-animation {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .compass-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .compass-ring.outer {
          width: 100%;
          height: 100%;
          animation: rotate 20s linear infinite;
        }

        .compass-ring.inner {
          width: 80%;
          height: 80%;
          border-color: rgba(255, 255, 255, 0.3);
          animation: rotate 15s linear infinite reverse;
        }

        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .compass-face {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background: radial-gradient(circle at center, var(--primary-dark), var(--background));
          box-shadow: 0 0 20px rgba(153, 69, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .compass-needle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 50%;
          background: linear-gradient(to top, var(--accent), transparent);
          transform-origin: bottom center;
          transform: translate(-50%, -100%);
          animation: compass 5s ease-in-out infinite;
        }

        @keyframes compass {
          0%,
          100% {
            transform: translate(-50%, -100%) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -100%) rotate(20deg);
          }
          75% {
            transform: translate(-50%, -100%) rotate(-20deg);
          }
        }

        .compass-center {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 10px rgba(153, 69, 255, 0.8);
        }

        .compass-cardinal {
          position: absolute;
          font-family: var(--font-display);
          font-weight: 700;
        }

        .compass-cardinal.n {
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          color: var(--accent);
        }

        .compass-cardinal.e {
          top: 50%;
          right: 10%;
          transform: translateY(-50%);
        }

        .compass-cardinal.s {
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
        }

        .compass-cardinal.w {
          top: 50%;
          left: 10%;
          transform: translateY(-50%);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 6rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          .compass-animation {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  )
}
