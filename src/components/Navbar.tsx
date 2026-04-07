import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'comments', label: 'Comments' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <button className="nav-logo" onClick={() => scrollTo('hero')}>
        ✦ 신선경
      </button>

      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map(({ id, label }) => (
          <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
      </div>

      <button
        className="nav-hamburger"
        aria-label="메뉴"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
