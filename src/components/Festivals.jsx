import './Festivals.css'

const festivals = [
  { id: 1, name: 'Diwali', icon: 'diya' },
  { id: 2, name: 'Holi', icon: 'colors' },
  { id: 3, name: 'Raksha Bandhan', icon: 'rakhi' },
  { id: 4, name: 'Christmas', icon: 'tree' },
  { id: 5, name: 'New Year', icon: 'party' },
  { id: 6, name: 'Eid', icon: 'moon' },
  { id: 7, name: 'Navratri', icon: 'dandiya' },
  { id: 8, name: 'Ganesh Chaturthi', icon: 'ganesh' },
  { id: 9, name: 'Onam', icon: 'boat' },
]

// SVG icons for festivals
const FestivalIcon = ({ type }) => {
  const icons = {
    diya: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="32" cy="48" rx="16" ry="6" />
        <path d="M20 48c0-8 5-14 12-14s12 6 12 14" />
        <path d="M32 34v-8" />
        <path d="M28 20c0-4 4-8 4-8s4 4 4 8c0 3-2 6-4 6s-4-3-4-6z" />
        <path d="M26 26c-2-2-2-4 0-4M38 26c2-2 2-4 0-4" />
      </svg>
    ),
    colors: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="28" r="10" />
        <circle cx="40" cy="28" r="10" />
        <circle cx="32" cy="42" r="10" />
        <path d="M32 12l2-6M28 14l-2-4M36 14l2-4" />
      </svg>
    ),
    rakhi: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="32" cy="32" r="12" />
        <circle cx="32" cy="32" r="6" />
        <path d="M8 32h12M44 32h12" />
        <path d="M32 26c-2-4 0-8 0-8s2 4 0 8" />
        <path d="M26 32c-4 2-8 0-8 0s4-2 8 0" />
        <path d="M32 38c2 4 0 8 0 8s-2-4 0-8" />
        <path d="M38 32c4-2 8 0 8 0s-4 2-8 0" />
      </svg>
    ),
    tree: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M32 8l16 20H16L32 8z" />
        <path d="M32 18l12 16H20L32 18z" />
        <path d="M32 28l10 14H22L32 28z" />
        <rect x="28" y="42" width="8" height="10" />
        <circle cx="28" cy="24" r="2" />
        <circle cx="36" cy="32" r="2" />
        <path d="M32 8l0-4" />
        <path d="M30 4h4" />
      </svg>
    ),
    party: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 52L32 12l12 40H20z" />
        <path d="M24 52l8-28 8 28" />
        <ellipse cx="32" cy="12" rx="4" ry="2" />
        <path d="M32 10c0-4 4-6 6-4M32 10c0-4-4-6-6-4" />
        <circle cx="26" cy="36" r="2" />
        <circle cx="38" cy="28" r="2" />
        <circle cx="30" cy="44" r="2" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M36 12c-12 0-20 10-20 22s8 18 20 18c-8 0-14-8-14-18s6-18 14-22z" />
        <path d="M42 20l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4z" />
        <circle cx="48" cy="36" r="2" />
      </svg>
    ),
    dandiya: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 48L40 16" strokeLinecap="round" />
        <path d="M48 48L24 16" strokeLinecap="round" />
        <circle cx="40" cy="16" r="4" />
        <circle cx="24" cy="16" r="4" />
        <path d="M16 48l-4 4M48 48l4 4" />
      </svg>
    ),
    ganesh: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="32" cy="36" rx="14" ry="16" />
        <circle cx="32" cy="24" r="12" />
        <circle cx="26" cy="22" r="2" />
        <circle cx="38" cy="22" r="2" />
        <path d="M32 26c0 6-6 12-6 12" />
        <path d="M18 24c-4-2-6 2-4 6M46 24c4-2 6 2 4 6" />
        <path d="M28 44h8" />
      </svg>
    ),
    boat: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 40c4 8 16 10 20 10s16-2 20-10H12z" />
        <path d="M32 40V20" />
        <path d="M32 20l14 12H32V20z" />
        <path d="M8 52c4-2 8 0 12-2s8 0 12-2 8 0 12-2 8 0 12-2" />
      </svg>
    ),
  }
  return icons[type] || null
}

function Festivals() {
  return (
    <section className="festivals">
      <div className="container">
        <h2 className="festivals-title">Shop Gifts for Every Festival</h2>
        <p className="festivals-subtitle">celebrate every occasion with thoughtful gifting solutions</p>
        <div className="festivals-grid">
          {festivals.map(fest => (
            <div key={fest.id} className="festival-item">
              <div className="festival-icon-circle">
                <FestivalIcon type={fest.icon} />
              </div>
              <span className="festival-name">{fest.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Festivals
