import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Products.css'

const allProducts = [
  {
    id: 1,
    name: 'Midnight Stash',
    brand: 'THE GIFT STUDIO',
    price: 1429,
    originalPrice: null,
    rating: 4.5,
    reviews: 9,
    image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=600',
    delivery: 'Tomorrow',
  },
  {
    id: 2,
    name: 'Mighty Celebration Trunk',
    brand: 'THE GIFT STUDIO',
    price: 7699,
    originalPrice: null,
    rating: 4.8,
    reviews: 15,
    image: 'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=600',
    delivery: 'Tomorrow',
  },
  {
    id: 3,
    name: 'Cocoa Bliss',
    brand: 'THE GIFT STUDIO',
    price: 1077,
    originalPrice: 1099,
    rating: 4.6,
    reviews: 8,
    image: 'https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=600',
    delivery: 'Tomorrow',
    sale: 2,
  },
  {
    id: 4,
    name: 'Sweet Alternatives',
    brand: 'THE GIFT STUDIO',
    price: 3079,
    originalPrice: null,
    rating: 5,
    reviews: 1,
    image: 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=600',
    delivery: 'Tomorrow',
  },
  {
    id: 5,
    name: 'Out Doors with Anamika Khanna',
    brand: 'THE GIFT STUDIO',
    price: 10999,
    originalPrice: null,
    rating: 4.9,
    reviews: 7,
    image: 'https://images.pexels.com/photos/1666069/pexels-photo-1666069.jpeg?auto=compress&cs=tinysrgb&w=600',
    delivery: 'Tomorrow',
  },
  {
    id: 6,
    name: 'Small Big Things',
    brand: 'THE GIFT STUDIO',
    price: 5499,
    originalPrice: null,
    rating: 4.4,
    reviews: 5,
    image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=600',
    delivery: 'Tomorrow',
  },
  {
    id: 7,
    name: 'Purple Spray Money Plant',
    brand: 'THE GIFT STUDIO',
    price: 699,
    originalPrice: null,
    rating: 3,
    reviews: 1,
    image: 'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=600',
    delivery: 'Tomorrow',
  },
  {
    id: 8,
    name: 'The Luxury Food Trunk',
    brand: 'THE GIFT STUDIO',
    price: 9679,
    originalPrice: null,
    rating: 4.8,
    reviews: 8,
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=600',
    delivery: 'Tomorrow',
  },
]

const categories = ['All', 'Hampers', 'Plants', 'Personal Care', 'Chocolates']

const pageTitles = {
  'new-year': 'New Year Gifts',
  'celebrity-hampers': 'Celebrity Hampers',
  'birthday': 'Birthday Gifts',
  'anniversary': 'Anniversary Gifts',
  'last-minute': 'Last Minute Gifting',
  'bestsellers': 'Best Sellers',
  'create-hamper': 'Create Your Own Hamper',
  'plants-flowers': 'Plants & Flowers',
  'corporate': 'Corporate Gifts',
  'products': 'All Products',
}

function Products() {
  const { category } = useParams()
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('price')

  const pageTitle = pageTitles[category] || 'All Products'

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg key={i} className={i < Math.floor(rating) ? 'filled' : i < rating ? 'half' : ''} viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))
  }

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">{pageTitle}</h1>
        
        {/* Filters */}
        <div className="filters-bar">
          <div className="filter-left">
            <div className="sort-dropdown">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {allProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.sale && <span className="sale-badge">Sale {product.sale}%</span>}
                <button className="wishlist-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-brand">{product.brand}</p>
                <div className="product-rating">
                  <div className="stars">{renderStars(product.rating)}</div>
                  <span>({product.reviews})</span>
                </div>
                <div className="product-price">
                  {product.originalPrice && (
                    <span className="original">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                  <span className="current">₹{product.price.toLocaleString()}</span>
                </div>
                <div className="delivery-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/>
                    <circle cx="6" cy="17" r="2"/>
                    <circle cx="18" cy="17" r="2"/>
                  </svg>
                  <span>Earliest delivery: {product.delivery}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
