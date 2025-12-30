import './Features.css'

const features = [
  { id: 1, icon: '✨', title: 'Quality Assurance', desc: 'Only the highest quality products' },
  { id: 2, icon: '🎨', title: 'Artistic Presentation', desc: 'Beautifully crafted packaging' },
  { id: 3, icon: '💝', title: 'Personalization', desc: 'Add your personal touch' },
  { id: 4, icon: '🚚', title: 'Fast Delivery', desc: 'Delivered on time, every time' },
]

function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Why Choose The Gift Studio?</h2>
        <div className="features-grid">
          {features.map(feat => (
            <div key={feat.id} className="feature-item">
              <span className="feature-icon">{feat.icon}</span>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
