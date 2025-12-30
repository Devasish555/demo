import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetails.css'

// Sample product data
const products = {
  1: {
    id: 1,
    name: "Masaba's Luxe Indulgence Hamper",
    price: 13999,
    originalPrice: 15999,
    description: "A luxurious gift hamper curated by Masaba Gupta featuring premium artisanal products. Perfect for those who appreciate fine craftsmanship and elegant design.",
    images: [
      'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'Handcrafted premium packaging',
      'Artisanal chocolates & treats',
      'Designer accessories',
      'Personalized gift card included',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  2: {
    id: 2,
    name: 'Out Doors with Anamika Khanna',
    price: 10999,
    originalPrice: 12999,
    description: "An exclusive outdoor collection designed by Anamika Khanna. Features premium quality items perfect for nature lovers and adventure seekers.",
    images: [
      'https://images.pexels.com/photos/1666069/pexels-photo-1666069.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'Premium outdoor accessories',
      'Eco-friendly materials',
      'Designer collaboration',
      'Gift-ready packaging',
    ],
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  3: {
    id: 3,
    name: 'Cocoa Bliss Hamper',
    price: 1077,
    originalPrice: 1099,
    description: "Indulge in the finest chocolate collection. A perfect gift for chocolate lovers featuring premium cocoa treats from around the world.",
    images: [
      'https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'Premium Belgian chocolates',
      'Assorted truffle collection',
      'Elegant gift box',
      'Perfect for any occasion',
    ],
    inStock: true,
    rating: 4.6,
    reviews: 56,
  },
  4: {
    id: 4,
    name: 'Sweet Alternatives',
    price: 3079,
    originalPrice: null,
    description: "A healthy twist on traditional gifting. Features sugar-free and organic treats for health-conscious recipients.",
    images: [
      'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'Sugar-free options',
      'Organic ingredients',
      'Healthy snacks included',
      'Beautiful presentation',
    ],
    inStock: true,
    rating: 5,
    reviews: 12,
  },
  5: {
    id: 5,
    name: 'Midnight Stash',
    price: 1429,
    originalPrice: null,
    description: "The perfect late-night indulgence hamper. Curated selection of gourmet snacks and treats for those midnight cravings.",
    images: [
      'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'Gourmet snacks selection',
      'Premium cookies & biscuits',
      'Artisanal treats',
      'Midnight-themed packaging',
    ],
    inStock: true,
    rating: 4.5,
    reviews: 34,
  },
  6: {
    id: 6,
    name: 'Small Big Things',
    price: 5499,
    originalPrice: null,
    description: "Sometimes the smallest gifts make the biggest impact. A thoughtfully curated collection of premium miniature delights.",
    images: [
      'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1666069/pexels-photo-1666069.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'Curated mini collection',
      'Premium quality items',
      'Compact elegant packaging',
      'Perfect for any occasion',
    ],
    inStock: true,
    rating: 4.4,
    reviews: 28,
  },
  7: {
    id: 7,
    name: 'Purple Spray Money Plant',
    price: 699,
    originalPrice: null,
    description: "Bring prosperity and good luck with this beautiful money plant in a stunning purple ceramic pot. Perfect for home or office.",
    images: [
      'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'Live money plant',
      'Designer ceramic pot',
      'Low maintenance',
      'Air purifying',
    ],
    inStock: true,
    rating: 3,
    reviews: 8,
  },
  8: {
    id: 8,
    name: 'The Luxury Food Trunk',
    price: 9679,
    originalPrice: null,
    description: "An extravagant collection of gourmet foods from around the world. The ultimate gift for food connoisseurs.",
    images: [
      'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: [
      'International gourmet selection',
      'Premium wooden trunk',
      'Artisanal cheeses & meats',
      'Fine wines included',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 45,
  },
}

function ProductDetails() {
  const { id } = useParams()
  const product = products[id] || products[1]
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="product-details">
      <div className="container">
        <div className="product-grid">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
            </div>
            <div className="thumbnail-list">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={i < Math.floor(product.rating) ? 'filled' : ''} viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="product-price">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

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

            <div className="product-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="add-to-cart">
                <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                Add to Cart
              </button>
              <button className="buy-now">Buy Now</button>
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
