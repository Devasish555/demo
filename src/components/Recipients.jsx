import './Recipients.css'

const recipients = [
  { 
    id: 1, 
    name: 'For Her', 
    image: 'https://thegiftstudio.com/cdn/shop/files/Pink_Perfection_1.webp?v=1707566574&width=1420'
  },
  { 
    id: 2, 
    name: 'For Him', 
    image: 'https://thegiftstudio.com/cdn/shop/files/For_Him_15638a8d-7212-46f8-a13d-c597411cbb43.jpg?v=1698401761&width=1420'
  },
  { 
    id: 3, 
    name: 'Corporate Connection', 
    image: 'https://thegiftstudio.com/cdn/shop/files/Corporate_Connections.webp?v=1750942225&width=1420'
  },
  { 
    id: 4, 
    name: 'Parents', 
    image: 'https://thegiftstudio.com/cdn/shop/files/Parents_cfd08d3e-5e04-49cd-8c37-fa071c49b65e.jpg?v=1750942276&width=1420'
  },
]

function Recipients() {
  return (
    <section className="recipients">
      <div className="container">
        <h2 className="recipients-title">Treasured Connections</h2>
        <p className="recipients-subtitle">Thoughtful gifts for every special person</p>
        <div className="recipients-grid">
          {recipients.map(rec => (
            <div key={rec.id} className="recipient-card">
              <div className="recipient-image">
                <img src={rec.image} alt={rec.name} />
              </div>
              <div className="recipient-info">
                <span className="recipient-name">{rec.name}</span>
                <span className="recipient-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Recipients
