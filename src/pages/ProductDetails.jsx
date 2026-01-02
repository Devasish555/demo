import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  // Fetch product from database
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/products/${id}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
      setLoading(false)
    }
    
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="product-details">
        <div className="container">
          <div className="loading-state">
            <p>Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-details">
        <div className="container">
          <div className="empty-state">
            <p>Product not found</p>
          </div>
        </div>
      </div>
    )
  }

  // Handle images - use array or single image
  const images = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
      ? [product.image] 
      : ['https://via.placeholder.com/800x800?text=No+Image']

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="product-details">
      <div className="container">
        <div className="product-grid">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={images[selectedImage]} alt={product.name} />
              {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
            </div>
            {images.length > 1 && (
              <div className="thumbnail-list">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={i < Math.floor(product.rating || 4) ? 'filled' : ''} viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="rating-text">{product.rating || 4} ({product.reviews || 0} reviews)</span>
            </div>

            <div className="product-price">
              <span className="current-price">₹{product.price?.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="product-description">{product.description || 'No description available'}</p>

            {product.features && product.features.length > 0 && (
              <div className="product-features">
                <h3>What's Included:</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button 
                className={`add-to-cart ${addedToCart ? 'added' : ''}`}
                onClick={() => {
                  addToCart(product, quantity)
                  setAddedToCart(true)
                  setTimeout(() => setAddedToCart(false), 2000)
                }}
              >
                <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
              <button className="buy-now" onClick={() => {
                addToCart(product, quantity)
                navigate('/checkout')
              }}>Buy Now</button>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                <span>Free Delivery on orders above ₹999</span>
              </div>
              <div className="meta-item">
                <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                <span>100% Secure Payment</span>
              </div>
              <div className="meta-item">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span>Easy Returns & Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
