import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  const shipping = cartTotal > 999 ? 0 : 99
  const total = cartTotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="empty-cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z"/>
              <circle cx="9" cy="20" r="1.5"/>
              <circle cx="18" cy="20" r="1.5"/>
              <path d="M6 6L5 3H2"/>
            </svg>
            <p>Your cart is empty</p>
            <Link to="/products" className="continue-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">₹{item.price?.toLocaleString()}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            {shipping === 0 && (
              <p className="free-shipping-msg">You qualify for free shipping!</p>
            )}
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
            <Link to="/products" className="continue-link">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
