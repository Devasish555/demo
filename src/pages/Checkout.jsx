import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Checkout.css'

const cartItems = [
  {
    id: 1,
    name: 'Midnight Stash',
    price: 1429,
    quantity: 1,
    image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 2,
    name: 'Cocoa Bliss Hamper',
    price: 1077,
    quantity: 2,
    image: 'https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
]

function Checkout() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    saveInfo: false,
  })

  const [paymentMethod, setPaymentMethod] = useState('card')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 999 ? 0 : 99
  const total = subtotal + shipping

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Order placed:', { formData, paymentMethod })
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Left - Form */}
        <div className="checkout-form-section">
          <h1 className="checkout-title">Checkout</h1>

          <form onSubmit={handleSubmit}>
            {/* Contact */}
            <div className="form-section">
              <div className="section-header">
                <h2>Contact</h2>
                <span>Have an account? <Link to="/account">Log in</Link></span>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Delivery */}
            <div className="form-section">
              <h2>Delivery</h2>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={formData.apartment}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row three">
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">State</option>
                    <option value="MH">Maharashtra</option>
                    <option value="DL">Delhi</option>
                    <option value="KA">Karnataka</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="WB">West Bengal</option>
                    <option value="GJ">Gujarat</option>
                    <option value="UP">Uttar Pradesh</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="PIN code"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                />
                <span>Save this information for next time</span>
              </label>
            </div>

            {/* Payment */}
            <div className="form-section">
              <h2>Payment</h2>
              <p className="payment-note">All transactions are secure and encrypted.</p>
              
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="option-label">Credit / Debit Card</span>
                  <div className="card-icons">
                    <span>💳</span>
                  </div>
                </label>
                
                <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="option-label">UPI</span>
                </label>
                
                <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="option-label">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <Link to="/cart" className="back-link">← Return to cart</Link>
              <button type="submit" className="pay-btn">Complete Order</button>
            </div>
          </form>
        </div>

        {/* Right - Order Summary */}
        <div className="checkout-summary">
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                  <span className="item-qty">{item.quantity}</span>
                </div>
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                </div>
                <p className="item-price">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="summary-discount">
            <input type="text" placeholder="Discount code" />
            <button type="button">Apply</button>
          </div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="total-row final">
              <span>Total</span>
              <span className="total-amount">
                <small>INR</small> ₹{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
