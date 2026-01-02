import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Account.css'

function Account() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch orders for logged in user
  useEffect(() => {
    if (user?.email) {
      fetchOrders(user.email)
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchOrders = async (userEmail) => {
    if (!userEmail) return
    setLoading(true)
    try {
      const response = await fetch(`/api/orders/user/${encodeURIComponent(userEmail)}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#27ae60'
      case 'shipped': return '#3498db'
      case 'processing': return '#f39c12'
      case 'pending': return '#e67e22'
      case 'cancelled': return '#e74c3c'
      default: return '#666'
    }
  }

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <h1>My Account</h1>
        </div>

        <div className="account-content">
          <div className="order-history">
            <h2>Order History</h2>

            {loading ? (
              <p className="loading-text">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="no-orders">No orders found for this email.</p>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div>
                        <span className="order-id">#{order.orderId}</span>
                        <span className="order-date">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <span 
                        className="order-status"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="order-items">
                      {order.items && order.items.map((item, idx) => (
                        <div key={idx} className="order-item">
                          <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} />
                          <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            <span className="item-qty">Qty: {item.quantity}</span>
                          </div>
                          <span className="item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-footer">
                      <span className="order-total">Total: ₹{order.total?.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="account-details">
            <h2>Account Details</h2>
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
