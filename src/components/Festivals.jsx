import './Festivals.css'

const festivals = [
  { id: 1, name: 'Diwali', icon: '🪔', bg: '#fff3e0' },
  { id: 2, name: 'Holi', icon: '🎨', bg: '#f3e5f5' },
  { id: 3, name: 'Raksha Bandhan', icon: '🎀', bg: '#e8f5e9' },
  { id: 4, name: 'Christmas', icon: '🎄', bg: '#ffebee' },
  { id: 5, name: 'New Year', icon: '🎉', bg: '#e3f2fd' },
  { id: 6, name: 'Valentine\'s Day', icon: '❤️', bg: '#fce4ec' },
]

function Festivals() {
  return (
    <section className="festivals">
      <div className="container">
        <h2 className="section-title">Shop Gifts for Every Festival</h2>
        <p className="section-subtitle">Celebrate every festival in style with our premium collections</p>
        <div className="festivals-grid">
          {festivals.map(fest => (
            <div key={fest.id} className="festival-card" style={{ background: fest.bg }}>
              <span className="festival-icon">{fest.icon}</span>
              <h3>{fest.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Festivals
