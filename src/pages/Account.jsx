import { Link } from 'react-router-dom'
import './Account.css'

function Account() {
  const user = {
    name: 'Eyanur Ahmed',
    country: 'India',
  }

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <h1>Account</h1>
          <div className="logout-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
            </svg>
            <a href="#">Log out</a>
          </div>
        </div>

        <div className="account-content">
          <div className="order-history">
            <h2>Order history</h2>
            <p>You haven't placed any orders yet.</p>
          </div>

          <div className="account-details">
            <h2>Account details</h2>
            <p className="user-name">{user.name}</p>
            <p className="user-country">{user.country}</p>
            <Link to="/addresses" className="view-addresses">View addresses (1)</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
