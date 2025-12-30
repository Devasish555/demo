import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [location, setLocation] = useState('Mumbai')

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
                <button className="icon-btn" aria-label="Cart">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 6h15l-1.5 9h-12z"/>
                    <circle cx="9" cy="20" r="1.5"/>
                    <circle cx="18" cy="20" r="1.5"/>
                    <path d="M6 6L5 3H2"/>
                  </svg>
                </button>
                <button className="icon-btn" aria-label="Account">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Menu */}
        <div className="navbar-bottom desktop-only">
          <div className="navbar-container">
            <ul className="nav-links">
              <li><Link to="/products/new-year">New Year</Link></li>
              <li><Link to="/products/celebrity-hampers">Celebrity Hampers</Link></li>
              <li className="dropdown">
                <span>Birthdays <span className="arrow">▾</span></span>
                <ul className="dropdown-menu">
                  <li><Link to="/products/birthday">Birthday for Him</Link></li>
                  <li><Link to="/products/birthday">Birthday for Her</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <span>Anniversary <span className="arrow">▾</span></span>
                <ul className="dropdown-menu">
                  <li><Link to="/products/anniversary">For Couple</Link></li>
                  <li><Link to="/products/anniversary">For Parents</Link></li>
                </ul>
              </li>
              <li><Link to="/products/last-minute">Last Minute Gifting</Link></li>
              <li className="dropdown">
                <span>Best Sellers <span className="arrow">▾</span></span>
                <ul className="dropdown-menu">
                  <li><Link to="/products/bestsellers">Gift Hampers</Link></li>
                  <li><Link to="/products/bestsellers">Chocolates</Link></li>
                </ul>
              </li>
              <li><Link to="/products/create-hamper">Create Your Own Hamper</Link></li>
              <li className="dropdown">
                <span>Plants & Flowers <span className="arrow">▾</span></span>
                <ul className="dropdown-menu">
                  <li><Link to="/products/plants-flowers">Indoor Plants</Link></li>
                  <li><Link to="/products/plants-flowers">Fresh Flowers</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <span>More Gifts <span className="arrow">▾</span></span>
                <ul className="dropdown-menu">
                  <li><Link to="/products">Mugs & Frames</Link></li>
                  <li><Link to="/products">Dry Fruits</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Top Row: Hamburger | Logo | Cart - STICKY */}
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
          
          <button className="cart-btn" aria-label="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z"/>
              <circle cx="9" cy="20" r="1.5"/>
              <circle cx="18" cy="20" r="1.5"/>
              <path d="M6 6L5 3H2"/>
            </svg>
          </button>
        </div>

        {/* Mobile Slide Menu */}
        <div className={`mobile-slide-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <span>Menu</span>
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          <ul>
            <li><Link to="/products/new-year" onClick={() => setMenuOpen(false)}>New Year</Link></li>
            <li><Link to="/products/celebrity-hampers" onClick={() => setMenuOpen(false)}>Celebrity Hampers</Link></li>
            <li><Link to="/products/birthday" onClick={() => setMenuOpen(false)}>Birthdays</Link></li>
            <li><Link to="/products/anniversary" onClick={() => setMenuOpen(false)}>Anniversary</Link></li>
            <li><Link to="/products/last-minute" onClick={() => setMenuOpen(false)}>Last Minute Gifting</Link></li>
            <li><Link to="/products/bestsellers" onClick={() => setMenuOpen(false)}>Best Sellers</Link></li>
            <li><Link to="/products/create-hamper" onClick={() => setMenuOpen(false)}>Create Your Own Hamper</Link></li>
            <li><Link to="/products/plants-flowers" onClick={() => setMenuOpen(false)}>Plants & Flowers</Link></li>
            <li><Link to="/products/corporate" onClick={() => setMenuOpen(false)}>Corporate Gifts</Link></li>
          </ul>
        </div>

        {/* Overlay */}
        {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      </nav>

      {/* Mobile Search Row - NOT STICKY (outside navbar) */}
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
