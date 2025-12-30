import { useState, useEffect } from 'react'
import './Hero.css'

const desktopSlides = [
  {
    id: 1,
    image: 'https://thegiftstudio.com/cdn/shop/files/Masaba-web-banner-WEB_1_1600x.jpg?v=1758181015'
  },
  {
    id: 2,
    image: 'https://thegiftstudio.com/cdn/shop/files/corporate-gifting-BNR_1_1600x.jpg?v=1750968741'
  },
  {
    id: 3,
    image: 'https://thegiftstudio.com/cdn/shop/files/birthday-banner-WEB_1600x.jpg?v=1763012193'
  }
]

const mobileSlides = [
  {
    id: 1,
    image: 'https://thegiftstudio.com/cdn/shop/files/MOB-_-BNR_074e3658-ebc8-46e7-93f8-b2eea6518044_640x689_crop_center.jpg?v=1750941932'
  },
  {
    id: 2,
    image: 'https://thegiftstudio.com/cdn/shop/files/transparent-Photoroom_10_640x689_crop_center.png?v=1766987139'
  },
  {
    id: 3,
    image: 'https://thegiftstudio.com/cdn/shop/files/Masaba-MOB_BNR_1_640x689_crop_center.jpg?v=1758181022'
  }
]

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      setCurrentSlide(0)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const slides = isMobile ? mobileSlides : desktopSlides

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} />
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous">
              ‹
            </button>
            <button className="slider-btn next" onClick={nextSlide} aria-label="Next">
              ›
            </button>

            <div className="slider-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Hero
