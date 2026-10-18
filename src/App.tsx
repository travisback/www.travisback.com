
import { useEffect, useRef, useState } from 'react'
import './App.css'
import sunset from './assets/sunset.png'


const dockApps = [
  { icon: '/icons/finder.png', label: 'Finder', image: true },
  { icon: '/icons/safari.svg', label: 'Safari', image: true },
  { icon: '/icons/mail.svg', label: 'Mail', image: true },
  { icon: '/icons/projects.svg', label: 'Projects', image: true },
  { icon: '/icons/terminal.svg', label: 'Terminal', image: true },
]


export default function App() {
  const [progress, setProgress] = useState(0)
  const [startupFinished, setStartupFinished] = useState(false)
  const [clock, setClock] = useState(new Date())

  const dockRef = useRef<HTMLElement>(null)
  const [hoverX, setHoverX] = useState<number | null>(null)

  useEffect(() => {
    const startedAt = Date.now()
    const duration = 3200

    const timer = window.setInterval(() => {
      const next = Math.min(
        100,
        ((Date.now() - startedAt) / duration) * 100,
      )

      setProgress(next)

      if (next >= 100) {
        window.clearInterval(timer)
      }
    }, 35)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress < 100) return

    const timer = window.setTimeout(() => {
      setStartupFinished(true)
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [progress])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="startup-experience">
      <div
        className={`desktop ${startupFinished ? 'desktop-visible' : ''}`}
        style={{ backgroundImage: `url(${sunset})` }}
        aria-hidden="true"
      />

      <section
        className={`boot-screen ${startupFinished ? 'boot-screen-hidden' : ''}`}
        aria-label="Starting up"
        aria-hidden={startupFinished}
      >
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
      </section>

      <div
        className={`desktop-interface ${
          startupFinished ? 'interface-visible' : ''
        }`}
      >
        <header className="menu-bar">
          <div className="menu-left">
            <img
              className="menu-apple"
              src="/apple.png"
              alt="Apple menu"
            />
            <strong>Finder</strong>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
            <span>Window</span>
            <span>Help</span>
          </div>

          <div className="menu-right">
            <span
              className="status-icon"
              title="Wi-Fi"
              aria-label="Wi-Fi"
            >
              <svg viewBox="0 0 20 16" aria-hidden="true">
                <path d="M2 5.5a12 12 0 0 1 16 0M5 9a7.5 7.5 0 0 1 10 0M8 12a3 3 0 0 1 4 0" />
                <circle
                  cx="10"
                  cy="14"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>

            <span
              className="status-icon"
              title="Control Center"
              aria-label="Control Center"
            >
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <rect x="2" y="2" width="6" height="6" rx="2" />
                <rect x="10" y="2" width="6" height="6" rx="2" />
                <rect x="2" y="10" width="6" height="6" rx="2" />
                <rect x="10" y="10" width="6" height="6" rx="2" />
              </svg>
            </span>

            <span
              className="status-icon"
              title="Battery"
              aria-label="Battery"
            >
              <svg viewBox="0 0 24 12" aria-hidden="true">
                <rect x="1" y="1" width="19" height="10" rx="2" />
                <path d="M22 4v4" />
                <path
                  d="M4 3.5h13v5H4z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>

            <time>
              {clock.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}{' '}
              {clock.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </time>
          </div>
        </header>

        

<nav
  className="dock"
  aria-label="Dock"
  ref={dockRef}
  onMouseMove={(event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setHoverX(event.clientX - rect.left)
  }}
  onMouseLeave={() => setHoverX(null)}
>
  {dockApps.map((app) => {
    const buttons = Array.from(
      dockRef.current?.querySelectorAll<HTMLButtonElement>('.dock-app') ?? [],
    )
    const index = dockApps.findIndex((item) => item.label === app.label)
    const button = buttons[index]
    const center = button
      ? button.offsetLeft + button.offsetWidth / 2
      : 0
    const distance = hoverX === null ? Infinity : Math.abs(hoverX - center)
    const influence = Math.max(0, 1 - distance / 150)
    const scale = 1 + Math.pow(influence, 1.5) * 0.8

    return (
      <button
        className="dock-app"
        key={app.label}
        type="button"
        aria-label={app.label}
        title={app.label}
        style={{
          transform: `translateY(${-(scale - 1) * 14}px) scale(${scale})`,
        }}
      >
        <img src={app.icon} alt="" />
      </button>
    )
  })}
</nav>


      </div>
    </main>
  )
}
