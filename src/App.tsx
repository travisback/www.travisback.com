import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startedAt = Date.now()
    const duration = 3200

    const timer = window.setInterval(() => {
      const next = Math.min(100, ((Date.now() - startedAt) / duration) * 100)
      setProgress(next)

      if (next >= 100) {
        window.clearInterval(timer)
      }
    }, 35)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="boot-screen">
      <div className="boot-center">
        <svg
          className="apple-logo"
          viewBox="0 0 100 120"
          aria-label="Apple"
          role="img"
        >
          <path
            fill="currentColor"
            d="M82.7 63.4c-.1-13.2 10.8-19.6 11.3-20-6.2-9-15.8-10.2-19.2-10.3-8.2-.9-16.1 4.8-20.3 4.8-4.3 0-10.8-4.7-17.7-4.6-9.1.1-17.5 5.3-22.2 13.4-9.5 16.5-2.4 40.8 6.8 54.2 4.5 6.6 9.8 13.9 16.7 13.6 6.7-.3 9.2-4.4 17.3-4.4 8.1 0 10.4 4.4 17.5 4.3 7.2-.1 11.8-6.6 16.2-13.2 5.1-7.5 7.2-14.8 7.3-15.2-.2-.1-13.6-5.2-13.7-22.6ZM69.2 24.4C72.8 20 75.3 13.9 74.6 8c-5.2.2-11.5 3.5-15.2 7.9-3.3 3.8-6.1 10-5.3 15.9 5.8.4 11.6-3 15.1-7.4Z"
            transform="translate(0 1) scale(.95)"
          />
        </svg>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Startup progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </main>
  )
}
