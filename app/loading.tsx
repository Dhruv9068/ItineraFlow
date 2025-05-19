"use client"

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading amazing destinations...</p>

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: var(--background);
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid var(--primary);
          border-radius: 50%;
          margin-bottom: 1rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}
