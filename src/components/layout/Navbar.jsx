import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { site } from '../../data/site'
import { socialLinks } from '../../data/social'
import ThemeToggle from '../ui/ThemeToggle'
import './Navbar.css'

const navLinks = [
  { to: '/',         label: 'Home'       },
  { to: '/events',   label: 'Events'     },
  { to: '/doubts',   label: 'Ask Doubts' },
  { to: '/lectures', label: 'Lectures'   },
  { to: '/team',     label: 'Team'       },
  { to: '/about',    label: 'About'      },
  { to: '/memories', label: 'Memories'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const instagramLink = socialLinks.find((s) => s.id === 'instagram')

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <a href="#main-content" className="skip-link">Skip to content</a>

        <div className="navbar__inner container">
          {/* JYC Emblem Logo */}
          <Link to="/" className="navbar__logo" aria-label={`${site.name} — Home`}>
            <span className="navbar__logo-mark" aria-hidden="true">
              <img
                src="/logo.png"
                alt="JYC Logo"
                width="38"
                height="38"
                style={{ borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(238, 215, 154, 0.4)' }}
              />
            </span>
            <div className="navbar__logo-brand">
              <span className="navbar__logo-text">JYC TECHNICAL</span>
              <span className="navbar__logo-subtext">MAKE AN IMPACT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar__nav" aria-label="Main navigation">
            <ul className="navbar__links" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right Actions: Social Links & Theme Toggle */}
          <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="navbar__social" aria-label="Social links">
              {instagramLink && (
                <a
                  href={instagramLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__social-link"
                  aria-label={instagramLink.label}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}
            </div>
            <ThemeToggle />
          </div>

          {/* Hamburger (Mobile) */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Sheet */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu__backdrop" onClick={() => setMenuOpen(false)} />
        <div className="mobile-menu__sheet">
          <nav aria-label="Mobile navigation">
            <ul className="mobile-menu__links" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ marginTop: '24px', paddingLeft: '8px' }}>
            <ThemeToggle showLabel={true} />
          </div>
        </div>
      </div>
    </>
  )
}
