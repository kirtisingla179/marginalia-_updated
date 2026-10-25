import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useTheme from '../hooks/useTheme'
import { CATEGORIES } from '../data/categories'

// variant="public" → marketing nav; variant="app" → signed-in nav (dashboard, editor, profiles)
export default function Navbar({ variant = 'public' }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dark, setDark] = useTheme()
  const [navOpen, setNavOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)

  const closeMenus = () => {
    setNavOpen(false)
    setExploreOpen(false)
  }

  const handleLogout = () => {
    closeMenus()
    logout()
    navigate('/login')
  }

  const isApp = variant === 'app'
  const linkClass = ({ isActive }) => (isActive ? 'is-active' : undefined)

  return (
    <>
      <div className="topbar">
        <div className="wrap topbar__inner">
          <span>📚 Fall Semester Edition — new stories every week</span>
          <span className="topbar__links">
            {isApp ? (
              <>
                <Link to="/explore">Read now</Link>
                <span className="dot">·</span>
                <Link to="/dashboard">My dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/signup">Write for us</Link>
                <span className="dot">·</span>
                <Link to="/explore">Read now</Link>
              </>
            )}
          </span>
        </div>
      </div>

      <header className="masthead">
        <div className="wrap masthead__inner">
          <Link to={isApp ? '/dashboard' : '/'} className="logo">
            <span className="logo__mark">M</span>
            <span className="logo__text">Marginalia</span>
          </Link>

          <label className="theme-switch" aria-label="Toggle dark mode">
            <input
              type="checkbox"
              className="theme-check"
              checked={dark}
              onChange={(e) => setDark(e.target.checked)}
            />
            <span className="theme-switch__icon">&#9728;</span>
            <span className="theme-switch__track"><span className="theme-switch__thumb"></span></span>
            <span className="theme-switch__icon">&#127769;</span>
          </label>

          <input
            type="checkbox"
            className="nav-check"
            id="navCheck"
            checked={navOpen}
            onChange={(e) => setNavOpen(e.target.checked)}
          />
          <label className="nav__toggle" htmlFor="navCheck" aria-label="Open menu">
            <span></span><span></span><span></span>
          </label>

          <nav className="nav" id="primaryNav" aria-label="Primary" onClick={(e) => {
            // close the drawer after tapping any link inside it
            if (e.target.closest('a')) closeMenus()
          }}>
            <div className="nav__drawer-head">
              <Link to={isApp ? '/dashboard' : '/'} className="logo nav__drawer-logo">
                <span className="logo__mark">M</span>
                <span className="logo__text">Marginalia</span>
              </Link>
              {!isApp && <span className="nav__drawer-search" aria-hidden="true">&#128269;</span>}
              <label className="nav__close" htmlFor="navCheck" aria-label="Close menu">&#10005;</label>
            </div>

            {isApp ? (
              <>
                <div className="nav__user">
                  <span className="nav__user-avatar">{user?.name?.[0]?.toUpperCase()}</span>
                  <div>
                    <span className="nav__user-name" style={{ display: 'block' }}>{user?.name}</span>
                    <span className="nav__user-role">{user?.role}</span>
                  </div>
                </div>
                <NavLink to="/dashboard" className={linkClass}>My Dashboard</NavLink>
                <NavLink to="/write" className={linkClass}>Write a New Post</NavLink>
                <NavLink to="/explore" className={linkClass}>Browse Marginalia</NavLink>
                <div className="nav__actions-mobile">
                  <button type="button" className="link-btn" onClick={handleLogout}>Log out</button>
                </div>
              </>
            ) : (
              <>
                <div className="nav__dropdown">
                  <input
                    type="checkbox"
                    className="explore-check"
                    id="exploreCheck"
                    checked={exploreOpen}
                    onChange={(e) => setExploreOpen(e.target.checked)}
                  />
                  <label className="nav__dropdown-btn" htmlFor="exploreCheck">
                    Explore <span className="caret">&#9662;</span>
                  </label>
                  <div className="nav__dropdown-menu" id="exploreMenu">
                    {CATEGORIES.map((c) => (
                      <Link key={c.slug} to={`/${c.slug}`}>{c.label}</Link>
                    ))}
                  </div>
                </div>
                <Link to="/#why">Why Marginalia</Link>
                <Link to="/#gallery">Campus</Link>
                <Link to="/#voices">Voices</Link>
                <Link to="/#faq">FAQ</Link>
                <div className="nav__actions-mobile">
                  {user ? (
                    <>
                      <Link to="/dashboard" className="link-btn">My Dashboard</Link>
                      <button type="button" className="btn btn--small" onClick={handleLogout}>Log out</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="link-btn">Log in</Link>
                      <Link to="/signup" className="btn btn--small">Start writing</Link>
                    </>
                  )}
                </div>
              </>
            )}
          </nav>
          <label className="nav-scrim" htmlFor="navCheck" aria-hidden="true"></label>

          <div className="masthead__actions">
            {isApp ? (
              <>
                <Link to="/write" className="link-btn">+ New Post</Link>
                <button type="button" className="btn btn--small" onClick={handleLogout}>Log out</button>
              </>
            ) : user ? (
              <>
                <Link to="/dashboard" className="link-btn">My Dashboard</Link>
                <button type="button" className="btn btn--small" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="link-btn">Log in</Link>
                <Link to="/signup" className="btn btn--small">Start writing</Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
