import { useState } from 'react'
import './Occasions.css'

const tabs = [
  { id: 'exclusive', name: 'Exclusive Collection' },
  { id: 'personalised', name: 'Personalised Gifts' },
  { id: 'baby', name: 'Baby & Kids' },
  { id: 'plants', name: 'Plants' },
]

const products = {
  exclusive: [
    { id: 1, name: "Masaba's Luxe Indulgence Hamper", price: '₹13,999', rating: 4.5, reviews: 4, image: 'https://picsum.photos/seed/hamper1/500/500', link: '/products/masaba-luxe' },
    { id: 2, name: 'Out Doors with Anamika Khanna', price: '₹10,999', rating: 5, reviews: 7, image: 'https://picsum.photos/seed/hamper2/500/500', link: '/products/anamika-outdoors' },
    { id: 3, name: 'The Select by Anamika Khanna', price: '₹15,399', rating: 5, reviews: 5, image: 'https://picsum.photos/seed/hamper3/500/500', link: '/products/anamika-select' },
    { id: 4, name: 'Self Care Hamper by Masaba', price: '₹12,499', rating: 4.5, reviews: 5, image: 'https://picsum.photos/seed/hamper4/500/500', link: '/products/masaba-selfcare' },
  ],
  personalised: [
    { id: 1, name: 'Monopoly Deal', price: '₹499', rating: 4.5, reviews: 12, image: 'https://picsum.photos/seed/game1/500/500', link: '/products/monopoly-deal' },
    { id: 2, name: 'Monopoly', price: '₹1,999', rating: 5, reviews: 8, image: 'https://picsum.photos/seed/game2/500/500', link: '/products/monopoly' },
    { id: 3, name: 'UNO', price: '₹299', rating: 4.5, reviews: 15, image: 'https://picsum.photos/seed/game3/500/500', link: '/products/uno' },
    { id: 4, name: 'Playing Cards', price: '₹199', rating: 4, reviews: 6, image: 'https://picsum.photos/seed/game4/500/500', link: '/products/playing-cards' },
  ],
  baby: [
    { id: 1, name: 'Carvaan Mini Kids with Mic', price: '₹2,999', rating: 5, reviews: 10, image: 'https://picsum.photos/seed/baby1/500/500', link: '/products/carvaan-mini' },
    { id: 2, name: 'Growing Adventures Baby Record Book', price: '₹899', rating: 4.5, reviews: 7, image: 'https://picsum.photos/seed/baby2/500/500', link: '/products/baby-record-1' },
    { id: 3, name: 'Little Wonder Baby Record Book', price: '₹899', rating: 4.5, reviews: 5, image: 'https://picsum.photos/seed/baby3/500/500', link: '/products/baby-record-2' },
    { id: 4, name: 'Baby Bath Cuddle Hamper', price: '₹1,499', rating: 5, reviews: 8, image: 'https://picsum.photos/seed/baby4/500/500', link: '/products/baby-bath' },
  ],
  plants: [
    { id: 1, name: 'Purple Spray Money Plant', price: '₹599', rating: 4.5, reviews: 9, image: 'https://picsum.photos/seed/plant1/500/500', link: '/products/purple-plant' },
    { id: 2, name: 'Prosperity Trunk', price: '₹1,299', rating: 5, reviews: 6, image: 'https://picsum.photos/seed/plant2/500/500', link: '/products/prosperity-trunk' },
    { id: 3, name: 'Royal Blue Money Plant', price: '₹699', rating: 4.5, reviews: 4, image: 'https://picsum.photos/seed/plant3/500/500', link: '/products/royal-blue-plant' },
    { id: 4, name: 'Pink Prosperity', price: '₹799', rating: 5, reviews: 7, image: 'https://picsum.photos/seed/plant4/500/500', link: '/products/pink-prosperity' },
  ],
}

function Occasions() {
  const [activeTab, setActiveTab] = useState('exclusive')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsTransitioning(false)
    }, 300)
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">★</span>)
      } else if (i - 0.5 === rating) {
        stars.push(<span key={i} className="star half">★</span>)
      } else {
        stars.push(<span key={i} className="star">★</span>)
      }
    }
    return stars
  }

  return (
    <section className="occasions">
      <div className="container">
        <h2 className="occasions-title">Best Seller</h2>
        <p className="occasions-subtitle">Discover timeless treasures that captivate hearts and delight senses</p>
        
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className={`products-grid ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          {products[activeTab].map(product => (
            <a href={product.link} key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {renderStars(product.rating)}
                  <span className="reviews">({product.reviews})</span>
                </div>
                <p className="product-price">{product.price}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button className="view-all-btn">View All</button>
        </div>
      </div>
    </section>
  )
}

export default Occasions
