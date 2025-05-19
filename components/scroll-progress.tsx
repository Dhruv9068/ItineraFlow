"use client"

import { useState, useEffect } from "react"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const currentScroll = document.documentElement.scrollTop
      const progress = (currentScroll / totalScroll) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      <style jsx>{`
        .scroll-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 1000;
        }

        .scroll-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width 0.1s ease;
        }
      `}</style>
    </div>
  )
}
