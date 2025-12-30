import './Categories.css'

const categories = [
  { 
    id: 1, 
    name: 'CELEBRITY HAMPER', 
    image: 'https://thegiftstudio.com/cdn/shop/files/WEB-SECTION-tiles_500x.jpg?v=1765352723'
  },
  { 
    id: 2, 
    name: 'BIRTHDAY SELECTION', 
    image: 'https://thegiftstudio.com/cdn/shop/files/Birthday_5963d1eb-2d99-46c2-883c-8df2a903e7b5_500x.jpg?v=1752134287'
  },
  { 
    id: 3, 
    name: 'ANNIVERSARY RANGE', 
    image: 'https://thegiftstudio.com/cdn/shop/files/Annivarsary_500x.jpg?v=1752134308'
  },
  { 
    id: 4, 
    name: 'COUPLE GAMES', 
    image: 'https://thegiftstudio.com/cdn/shop/files/WEB-SECTION-tiles_500x.jpg?v=1765352723'
  },
]

function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <h2 className="section-title">Curated Gifts</h2>
        <div className="categories-grid">
          {categories.map(cat => (
            <div key={cat.id} className="category-card">
              <div className="category-image">
                <img src={cat.image} alt={cat.name} />
              </div>
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
