import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>The Gift Studio</h3>
            <p>Your trusted partner in celebrating life's special moments with style and heart.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/gift-hampers">Gift Hampers</a></li>
              <li><a href="/customized-gifts">Customized Gifts</a></li>
              <li><a href="/corporate">Corporate Gifts</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Shop by Occasion</h4>
            <ul>
              <li><a href="/birthday">Birthday</a></li>
              <li><a href="/anniversary">Anniversary</a></li>
              <li><a href="/wedding">Wedding</a></li>
              <li><a href="/housewarming">Housewarming</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>📧 info@thegiftstudio.com</p>
            <p>📞 +91 XXXXX XXXXX</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 The Gift Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
