import { useEffect, useState } from 'react'
import './App.css'
import sunset from './assets/sunset.png'

type Section = 'about' | 'experience' | 'skills' | 'education' | 'projects' | 'contact'

const dockApps = [
  { icon: '/icons/finder.png', label: 'Finder', section: 'about' as Section },
  { icon: '/icons/safari.svg', label: 'Safari', section: 'about' as Section },
  { icon: '/icons/mail.svg', label: 'Mail', section: 'contact' as Section },
  { icon: '/icons/projects.svg', label: 'Projects', section: 'projects' as Section },
  { icon: '/icons/terminal.svg', label: 'Terminal', section: 'skills' as Section },
]

const sections: { id: Section; label: string; icon: string }[] = [
  { id: 'about', label: 'About Me', icon: '👤' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'skills', label: 'Skills', icon: '⚙️' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'projects', label: 'Projects', icon: '🗂️' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
]

const experience = [
  {
    role: 'PC Technician',
    company: 'Link Technologies — Clark County Election Department (Contract)',
    location: 'North Las Vegas, NV',
    dates: 'October 2026 – Present',
    bullets: [
      'Configure, test, and deploy KNOWiNK Poll Pad voter sign-in systems on iPads.',
      'Verify equipment readiness and compliance with state and county requirements.',
      'Diagnose hardware and configuration issues and validate fixes before deployment.',
    ],
  },
  {
    role: 'Slot Technician',
    company: 'Crawford Coin, Inc.',
    location: 'Henderson, NV',
    dates: 'March 2025 – May 2026',
    bullets: [
      'Serviced Aristocrat and IGT gaming machines across nearly 100 locations.',
      'Troubleshot electrical, electronic, mechanical, communication, and site infrastructure issues.',
      'Performed preventive and emergency maintenance, commissioning, and service documentation.',
      'Supported Nevada Gaming Commission inspections and followed security procedures.',
    ],
  },
  {
    role: 'Software Development Manager / Technical Lead',
    company: 'CompuOne',
    location: 'San Diego, CA',
    dates: 'July 2022 – June 2024',
    bullets: [
      'Led a two-developer team while remaining hands-on with C#, .NET, Blazor, Docker, CI/CD, architecture, debugging, and code review.',
      'Helped modernize a legacy VB.NET logistics application into a maintainable C#/.NET and Blazor SaaS application.',
      'Designed Docker development workflows and GitHub Actions pipelines for builds and container image publication.',
      'Introduced Docker and Kubernetes into development and deployment architecture.',
      'Built a Moodle-based cybersecurity training platform and administered Autotask workflows and VMware vSphere environments.',
    ],
  },
  {
    role: 'Quality Assurance Analyst',
    company: 'TrialCard (Eliassen Group)',
    location: 'Morrisville, NC',
    dates: 'October 2021 – January 2022',
    bullets: [
      'Tested a web-based medication co-pay assistance application through functional, UI, and end-to-end testing.',
      'Validated backend records with SQL Server and tested APIs with Postman.',
      'Maintained test plans in Azure DevOps and tracked defects in ServiceNow.',
    ],
  },
  {
    role: 'Quality Assurance Engineer',
    company: 'Mobile Integration WorkGroup, Inc.',
    location: 'Redmond, WA',
    dates: 'January 2019 – June 2019',
    bullets: [
      'Developed Java automated mobile tests using Selenium and Appium for Android and iOS workflows.',
      'Built regression tests, maintained TestRail plans, managed Jira work, and monitored Jenkins builds.',
    ],
  },
  {
    role: 'QA Test Engineer',
    company: 'Keywords Studios',
    location: 'Redmond, WA',
    dates: 'September 2018 – January 2019',
    bullets: [
      'Performed functional and exploratory testing of Valve Steam hardware, software, VR equipment, games, Windows, and SteamOS systems.',
      'Built cross-platform C# utilities for collecting and logging system performance metrics on Windows and Linux.',
    ],
  },
  {
    role: 'GPU Driver Test Engineer',
    company: 'NVIDIA — Microsoft campus test lab',
    location: 'Redmond, WA',
    dates: 'February 2012 – March 2017',
    bullets: [
      'Managed an autonomous GPU driver testing lab, testing NVIDIA driver builds against Microsoft Windows releases and working with both engineering teams.',
      'Built custom GPU test systems and diagnosed driver, OS, hardware, and integration failures with WinDbg and bug-tracking systems.',
      'Automated Windows PE boot, image preparation, driver injection, deployment, and stress-test startup using Batch, PowerShell, and C#.',
      'Reduced test-lab turnover from several days to roughly 1–2 hours—approximately 85% faster.',
      'Developed an HTML/PHP/MySQL reporting system for lab failures and driver/OS test combinations.',
    ],
  },
]

const skillGroups = [
  { title: 'Software Development', skills: ['C#', '.NET', 'Blazor', 'Java', 'JavaScript', 'VB.NET', 'Python', 'SQL', 'REST APIs', 'HTML/CSS', 'Git', 'GitHub'] },
  { title: 'QA & Test Engineering', skills: ['Test Automation', 'Manual Testing', 'Functional Testing', 'Regression Testing', 'Exploratory Testing', 'API Testing', 'Mobile Testing', 'Selenium', 'Appium', 'Postman', 'TestRail', 'Jira', 'Azure DevOps'] },
  { title: 'DevOps & Infrastructure', skills: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Jenkins', 'PowerShell', 'Shell Scripting', 'Linux', 'VMware vSphere', 'Virtualization'] },
  { title: 'Systems & Networking', skills: ['Windows', 'Windows Server', 'Active Directory', 'TCP/IP', 'DNS', 'DHCP', 'VLANs', 'Network Troubleshooting', 'Hardware Troubleshooting'] },
  { title: 'Debugging & Leadership', skills: ['WinDbg', 'Kernel Debugging', 'Crash Analysis', 'GPU Driver Testing', 'Performance Testing', 'Technical Leadership', 'Team Leadership', 'Agile/Scrum', 'Process Improvement'] },
]

export default function App() {
  const [progress, setProgress] = useState(0)
  const [startupFinished, setStartupFinished] = useState(false)
  const [clock, setClock] = useState(new Date())
  const [windowOpen, setWindowOpen] = useState(false)
  const [windowMinimized, setWindowMinimized] = useState(false)
  const [windowMaximized, setWindowMaximized] = useState(false)
  const [activeWindow, setActiveWindow] = useState(false)
  const [section, setSection] = useState<Section>('about')

  useEffect(() => {
    const startedAt = Date.now()
    const duration = 3200
    const timer = window.setInterval(() => {
      const next = Math.min(100, ((Date.now() - startedAt) / duration) * 100)
      setProgress(next)
      if (next >= 100) window.clearInterval(timer)
    }, 35)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const timer = window.setTimeout(() => setStartupFinished(true), 2000)
    return () => window.clearTimeout(timer)
  }, [progress])

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  function openPortfolio(nextSection: Section = 'about') {
    setSection(nextSection)
    setWindowOpen(true)
    setWindowMinimized(false)
    setActiveWindow(true)
  }

  function renderSection() {
    if (section === 'about') {
      return (
        <div className="finder-about">
          <div className="finder-about-heading">
            <img className="finder-profile-photo" src="/images/travis-back.jpg" alt="Illustrated portrait of Travis Back" />
            <div className="finder-profile-details">
              <h1>James Travis Back</h1>
              <p>IT · Software Development · QA &amp; Test Engineering</p>
              <a className="finder-primary-link" href="/JamesTravisBack_Resume_20261009.pdf" target="_blank" rel="noreferrer">View résumé ↗</a>
            </div>
          </div>
          <section className="finder-about-section">
            <h2>About Me</h2>
            <p>Hands-on technology professional spanning IT systems and hardware, QA/test engineering, software development, automation, and technical leadership.</p>
            <p>I managed an autonomous NVIDIA GPU driver testing lab on the Microsoft campus for five years, with additional experience in software development leadership, mobile automation, API and database testing, virtualization, and Windows/Linux troubleshooting.</p>
          </section>
          <section className="finder-highlight">
            <span className="finder-highlight-number">~85%</span>
            <div><strong>Faster test-lab turnaround</strong><p>Automated a deployment workflow that cut lab turnover from several days to roughly 1–2 hours.</p></div>
          </section>
        </div>
      )
    }

    if (section === 'experience') {
      return (
        <div className="finder-page">
          <div className="finder-page-heading"><p className="finder-eyebrow">CAREER HISTORY</p><h1>Professional Experience</h1><p>Hands-on engineering, quality, infrastructure, and technical leadership.</p></div>
          <div className="experience-list">
            {experience.map((job) => (
              <article className="experience-card" key={`${job.company}-${job.role}`}>
                <div className="experience-card-top"><div><h2>{job.role}</h2><p className="experience-company">{job.company}</p><p className="experience-location">{job.location}</p></div><span className="experience-dates">{job.dates}</span></div>
                <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (section === 'skills') {
      return (
        <div className="finder-page">
          <div className="finder-page-heading"><p className="finder-eyebrow">TECHNICAL TOOLKIT</p><h1>Skills &amp; Technologies</h1><p>A broad mix of development, test engineering, systems, and infrastructure experience.</p></div>
          <div className="skill-group-list">{skillGroups.map((group) => <section className="skill-group" key={group.title}><h2>{group.title}</h2><div className="finder-skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>)}</div>
        </div>
      )
    }

    if (section === 'education') {
      return (
        <div className="finder-page">
          <div className="finder-page-heading"><p className="finder-eyebrow">EDUCATION &amp; CERTIFICATIONS</p><h1>Education</h1></div>
          <article className="education-card"><div className="education-icon">🎓</div><div><h2>Bachelor of Applied Science in Software Development</h2><p>Green River College · Auburn, Washington</p><p>March 2016 – June 2018</p><span className="education-honors">3.58 GPA · Graduated Cum Laude</span></div></article>
          <article className="education-card"><div className="education-icon">🎓</div><div><h2>Associate of Applied Science in Computing and Information Technology</h2><p>College of Southern Nevada · North Las Vegas, Nevada</p><p>September 2001 – December 2009</p></div></article>
          <article className="education-card"><div className="education-icon">🏅</div><div><h2>CompTIA A+</h2><p>CompTIA · Issued 2026 · Expires 2029</p></div></article>
        </div>
      )
    }

    if (section === 'projects') {
      return (
        <div className="finder-page">
          <div className="finder-page-heading"><p className="finder-eyebrow">SELECTED WORK</p><h1>Projects</h1><p>Technical work across software, automation, and infrastructure.</p></div>
          <article className="project-card"><div className="project-icon">⌘</div><div><h2>Personal Infrastructure Lab</h2><p>Containerized services, Linux hosts, reverse proxying, local DNS, monitoring, and backup workflows.</p><div className="finder-skill-tags"><span>Docker</span><span>Linux</span><span>Networking</span><span>Backups</span></div></div></article>
          <article className="project-card"><div className="project-icon">⌨</div><div><h2>Orchestra Solo</h2><p>A Python and Django-based administration platform concept for managing systems and infrastructure through a web interface and API.</p><div className="finder-skill-tags"><span>Python</span><span>Django</span><span>REST API</span><span>Docker</span></div></div></article>
          <p className="finder-note">More project details and source links can be added as each project is prepared for public display.</p>
        </div>
      )
    }

    return (
      <div className="finder-page contact-page">
        <div className="finder-page-heading"><p className="finder-eyebrow">LET'S CONNECT</p><h1>Contact</h1><p>Reach out about IT, software development, QA, or infrastructure opportunities.</p></div>
        <a className="contact-row" href="mailto:travisback@icloud.com"><span>✉️</span><div><strong>Email</strong><p>travisback@icloud.com</p></div><span className="contact-arrow">↗</span></a>
        <a className="contact-row" href="https://linkedin.com/in/james-travis-back" target="_blank" rel="noreferrer"><span>in</span><div><strong>LinkedIn</strong><p>linkedin.com/in/james-travis-back</p></div><span className="contact-arrow">↗</span></a>
      </div>
    )
  }

  return (
    <main className="startup-experience">
      <div className={`desktop ${startupFinished ? 'desktop-visible' : ''}`} style={{ backgroundImage: `url(${sunset})` }} aria-hidden="true" />
      <section className={`boot-screen ${startupFinished ? 'boot-screen-hidden' : ''}`} aria-label="Starting up" aria-hidden={startupFinished}>
        <div className="boot-center">
          <svg className="apple-logo" viewBox="0 0 100 120" aria-label="Apple" role="img">
            <path fill="currentColor" d="M82.7 63.4c-.1-13.2 10.8-19.6 11.3-20-6.2-9-15.8-10.2-19.2-10.3-8.2-.9-16.1 4.8-20.3 4.8-4.3 0-10.8-4.7-17.7-4.6-9.1.1-17.5 5.3-22.2 13.4-9.5 16.5-2.4 40.8 6.8 54.2 4.5 6.6 9.8 13.9 16.7 13.6 6.7-.3 9.2-4.4 17.3-4.4 8.1 0 10.4 4.4 17.5 4.3 7.2-.1 11.8-6.6 16.2-13.2 5.1-7.5 7.2-14.8 7.3-15.2-.2-.1-13.6-5.2-13.7-22.6ZM69.2 24.4C72.8 20 75.3 13.9 74.6 8c-5.2.2-11.5 3.5-15.2 7.9-3.3 3.8-6.1 10-5.3 15.9 5.8.4 11.6-3 15.1-7.4Z" transform="translate(0 1) scale(.95)" />
          </svg>
          <div className="progress-track" role="progressbar" aria-label="Startup progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><span style={{ width: `${progress}%` }} /></div>
        </div>
      </section>

      <div className={`desktop-interface ${startupFinished ? 'interface-visible' : ''}`}>
        <header className="menu-bar">
          <div className="menu-left">
            <img className="menu-apple" src="/apple.png" alt="Apple menu" />
            <strong>{activeWindow ? sections.find((item) => item.id === section)?.label ?? 'Finder' : 'Finder'}</strong>
            <span>File</span><span>Edit</span><span>View</span><span>Go</span><span>Window</span><span>Help</span>
          </div>
          <div className="menu-right">
            <span className="status-icon" title="Wi-Fi" aria-label="Wi-Fi"><svg viewBox="0 0 20 16" aria-hidden="true"><path d="M2 5.5a12 12 0 0 1 16 0M5 9a7.5 7.5 0 0 1 10 0M8 12a3 3 0 0 1 4 0" /><circle cx="10" cy="14" r="1" fill="currentColor" stroke="none" /></svg></span>
            <span className="status-icon" title="Control Center" aria-label="Control Center"><svg viewBox="0 0 18 18" aria-hidden="true"><rect x="2" y="2" width="6" height="6" rx="2" /><rect x="10" y="2" width="6" height="6" rx="2" /><rect x="2" y="10" width="6" height="6" rx="2" /><rect x="10" y="10" width="6" height="6" rx="2" /></svg></span>
            <span className="status-icon" title="Battery" aria-label="Battery"><svg viewBox="0 0 24 12" aria-hidden="true"><rect x="1" y="1" width="19" height="10" rx="2" /><path d="M22 4v4" /><path d="M4 3.5h13v5H4z" fill="currentColor" stroke="none" /></svg></span>
            <time>{clock.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}{clock.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</time>
          </div>
        </header>

        {windowOpen && !windowMinimized && (
          <section className={`finder-window ${windowMaximized ? 'finder-window-maximized' : ''} ${activeWindow ? 'finder-window-active' : ''}`} aria-label="Portfolio window" onMouseDown={() => setActiveWindow(true)}>
            <header className="finder-titlebar">
              <div className="finder-window-controls">
                <button className="finder-control finder-close" type="button" aria-label="Close window" title="Close" onClick={() => { setWindowOpen(false); setWindowMinimized(false); setWindowMaximized(false); setActiveWindow(false) }} />
                <button className="finder-control finder-minimize" type="button" aria-label="Minimize window" title="Minimize" onClick={() => { setWindowMinimized(true); setActiveWindow(false) }} />
                <button className="finder-control finder-zoom" type="button" aria-label={windowMaximized ? 'Restore window' : 'Maximize window'} title={windowMaximized ? 'Restore' : 'Maximize'} onClick={() => setWindowMaximized((value) => !value)} />
              </div>
              <span className="finder-window-title">{sections.find((item) => item.id === section)?.label ?? 'Portfolio'}</span>
              <div className="finder-titlebar-spacer" />
            </header>
            <div className="finder-window-content">
              <aside className="finder-sidebar">
                <p className="finder-sidebar-heading">PORTFOLIO</p>
                {sections.map((item) => <button key={item.id} className={`finder-sidebar-item ${section === item.id ? 'finder-sidebar-selected' : ''}`} type="button" onClick={() => { setSection(item.id); setActiveWindow(true) }}><span aria-hidden="true">{item.icon}</span>{item.label}</button>)}
              </aside>
              <div className="finder-main-content">{renderSection()}</div>
            </div>
          </section>
        )}

        <nav className="dock" aria-label="Dock">
          {dockApps.map((app) => (
            <button className={`dock-app ${app.label === 'Finder' && windowOpen && !windowMinimized ? 'dock-app-active' : ''}`} key={app.label} type="button" aria-label={app.label} title={app.label} onClick={() => openPortfolio(app.section)}>
              <img src={app.icon} alt="" />
            </button>
          ))}
        </nav>
      </div>
    </main>
  )
}
