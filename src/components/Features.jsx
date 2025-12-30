import './Features.css'

const artists = [
  {
    id: 1,
    name: 'Anamika Khanna',
    image: 'https://thegiftstudio.com/cdn/shop/files/Anamika_Khanna.jpg?v=1751003723&width=1420',
    artwork: 'https://thegiftstudio.com/cdn/shop/files/AK_work.jpg?v=1751003739',
    description: 'Redefining Style with an Artistic Twist in a Handpicked Curation',
  },
  {
    id: 2,
    name: 'MF Hussain',
    image: 'https://thegiftstudio.com/cdn/shop/files/MF_Hussain.jpg?v=1687714868&width=1420',
    artwork: 'https://thegiftstudio.com/cdn/shop/files/MF_work.jpg?v=1687714868',
    description: 'Immortalizing Artistic Brilliance in a Captivating Curated Hamper',
  },
  {
    id: 3,
    name: 'Paresh Maity',
    image: 'https://thegiftstudio.com/cdn/shop/files/Paresh_Maity.jpg?v=1687714868&width=1420',
    artwork: 'https://thegiftstudio.com/cdn/shop/files/PM_work.jpg?v=1687714869',
    description: 'Evoking Emotions with Brushstrokes in a Curated Artistic Hamper',
  },
]

function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2 className="features-title">Limited Edition</h2>
        <div className="artists-grid">
          {artists.map(artist => (
            <div key={artist.id} className="artist-card">
              <div className="artist-image-wrapper">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="artist-image"
                />
                <div className="artwork-overlay">
                  <img 
                    src={artist.artwork} 
                    alt={`${artist.name} artwork`} 
                    className="artwork-image"
                  />
                </div>
              </div>
              <div className="artist-info">
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-description">{artist.description}</p>
                <a href="#" className="shop-link">Shop Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
