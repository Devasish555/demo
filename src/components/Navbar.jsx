import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [location, setLocation] = useState('Mumbai')
  const [navLinks, setNavLinks] = useState([])

  // Fetch nav links from backend with auto-refresh every 5 seconds
  useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        const response = await fetch('/api/navlinks')
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data) && data.length > 0) {
            setNavLinks(data)
          }
        }
      } catch (error) {
        console.log('Using default nav links')
      }
    }
    
    // Initial fetch
    fetchNavLinks()
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchNavLinks, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* STICKY NAVBAR */}
      <nav className="navbar">
        {/* Desktop Top Bar */}
        <div className="navbar-top desktop-only">
          <div className="navbar-container">
            <div className="navbar-left">
              <Link to="/" className="logo">
                <img 
                  src="https://thegiftstudio.com/cdn/shop/files/TGS_LOGO-02_1_bd179bde-b3d0-45f5-8862-5da8824ccd82.svg?v=1745584490&width=500" 
                  alt="The Gift Studio" 
                  className="logo-img"
                />
              </Link>
            </div>

            <div className="navbar-center">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search Gifts" className="search-input" />
              </div>
            </div>

            <div className="navbar-right">
              <div className="right-top">
                <button className="corporate-btn">Bulk/Corporate Enquiry</button>
              </div>
              <div className="right-bottom">
                <Link to="/cart" className="icon-btn" aria-label="Cart">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 6h15l-1.5 9h-12z"/>
                    <circle cx="9" cy="20" r="1.5"/>
                    <circle cx="18" cy="20" r="1.5"/>
                    <path d="M6 6L5 3H2"/>
                  </svg>
                </Link>
                <Link to="/account" className="icon-btn" aria-label="Account">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Menu - Dynamic Links */}
        <div className="navbar-bottom desktop-only">
          <div className="navbar-container">
            <ul className="nav-links">
              {navLinks.map(link => (
                <li key={link._id} className={link.hasDropdown && link.subLinks?.length > 0 ? 'dropdown' : ''}>
                  {link.hasDropdown && link.subLinks?.length > 0 ? (
                    <>
                      <span>{link.title} <span className="arrow">▾</span></span>
                      <ul className="dropdown-menu">
                        {link.subLinks.map((sub, idx) => (
                          <li key={idx}><Link to={sub.url}>{sub.title}</Link></li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={link.url}>{link.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Top Row */}
        <div className="mobile-top-bar mobile-only">
          <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <Link to="/" className="mobile-logo">
            <img 
              src="https://thegiftstudio.com/cdn/shop/files/TGS_LOGO-02_1_bd179bde-b3d0-45f5-8862-5da8824ccd82.svg?v=1745584490&width=500" 
              alt="The Gift Studio" 
            />
          </Link>
          
          <Link to="/cart" className="cart-btn" aria-label="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z"/>
              <circle cx="9" cy="20" r="1.5"/>
              <circle cx="18" cy="20" r="1.5"/>
              <path d="M6 6L5 3H2"/>
            </svg>
          </Link>
        </div>

        {/* Mobile Slide Menu - Dynamic Links */}
        <div className={`mobile-slide-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <span>Menu</span>
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          <ul>
            {navLinks.map(link => (
              <li key={link._id}>
                <Link to={link.url} onClick={() => setMenuOpen(false)}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay */}
        {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      </nav>

      {/* Mobile Search Row */}
      <div className="mobile-search-row-wrapper mobile-only">
        <div className="mobile-search-row">
          <div className="mobile-search">
            <span>🔍</span>
            <input type="text" placeholder="" />
          </div>
          <div className="mobile-location">
            <span>📍</span>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
            </select>
            <span className="chevron">▾</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar