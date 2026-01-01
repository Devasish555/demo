import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import './Products.css'

const categories = ['All', 'Hampers', 'Plants', 'Personal Care', 'Chocolates']

function Products() {
  const { category, subcategory } = useParams()
  const location = useLocation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('price')
  const [navLinkTitle, setNavLinkTitle] = useState('')

  // Build navlink URL from params (matches database navLink URLs)
  const navlinkUrl = subcategory 
    ? `/products/${category}/${subcategory}`
    : category 
      ? `/products/${category}`
      : null

  // Fetch navlinks to get the title
  useEffect(() => {
    const fetchNavLinkTitle = async () => {
      if (!navlinkUrl) {
        setNavLinkTitle('All Products')
        return
      }
      
      try {
        const response = await fetch('/api/navlinks')
        if (response.ok) {
          const navLinks = await response.json()
          
          // Search in main links and sublinks
          for (const link of navLinks) {
            if (link.url === navlinkUrl) {
              setNavLinkTitle(link.title)
              return
            }
            if (link.subLinks) {
              const subLink = link.subLinks.find(sub => sub.url === navlinkUrl)
              if (subLink) {
                setNavLinkTitle(subLink.title)
                return
              }
            }
          }
          
          // Fallback to formatted URL
          setNavLinkTitle(formatTitle(category))
        }
      } catch (error) {
        setNavLinkTitle(formatTitle(category))
      }
    }
    
    fetchNavLinkTitle()
  }, [navlinkUrl, category])

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        // If we have a category/subcategory, filter by navlink
        let url = '/api/products'
        if (navlinkUrl) {
          url = `/api/products?navlink=${encodeURIComponent(navlinkUrl)}`
        }
        
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
      setLoading(false)
    }
    
    fetchProducts()
  }, [category, subcategory, navlinkUrl])

  // Generate page title from URL params
  const formatTitle = (slug) => {
    if (!slug) return 'All Products'
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const renderStars = (rating = 4) => {
    return [...Array(5)].map((_, i) => (
      <svg key={i} className={i < Math.floor(rating) ? 'filled' : i < rating ? 'half' : ''} viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))
  }

  // Filter and sort products
  const filteredProducts = products
    .filter(p => activeFilter === 'All' || p.category === activeFilter)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'rating') return (b.rating || 4) - (a.rating || 4)
      return 0
    })

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">{navLinkTitle || 'All Products'}</h1>
        
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

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <p>Loading products...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="empty-state">
            <p>No products found in this category.</p>
            <Link to="/products" className="btn-primary">View All Products</Link>
          </div>
        )}

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <Link to={`/product/${product.id || product._id}`} key={product.id || product._id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.sale && <span className="sale-badge">Sale {product.sale}%</span>}
                <button className="wishlist-btn" onClick={(e) => e.preventDefault()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-brand">{product.brand || 'THE GIFT STUDIO'}</p>
                <div className="product-rating">
                  <div className="stars">{renderStars(product.rating)}</div>
                  <span>({product.reviews || 0})</span>
                </div>
                <div className="product-price">
                  {product.originalPrice && (
                    <span className="original">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                  <span className="current">₹{product.price?.toLocaleString()}</span>
                </div>
                <div className="delivery-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/>
                    <circle cx="6" cy="17" r="2"/>
                    <circle cx="18" cy="17" r="2"/>
                  </svg>
                  <span>Earliest delivery: Tomorrow</span>
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
