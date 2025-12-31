import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './OrderSuccess.css'

function OrderSuccess() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const rockets = []
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9f43', '#ee5a24', '#f368e0', '#00d2d3', '#ff4757', '#ffa502']

    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = {
          x: (Math.random() - 0.5) * 15,
          y: (Math.random() - 0.5) * 15
        }
        this.alpha = 1
        this.decay = Math.random() * 0.015 + 0.01
        this.size = Math.random() * 3 + 2
        this.trail = []
      }

      update() {
        this.velocity.y += 0.15 // gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= this.decay
        
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha })
        if (this.trail.length > 5) this.trail.shift()
      }

      draw() {
        // Draw trail
        this.trail.forEach((point, i) => {
          ctx.beginPath()
          ctx.arc(point.x, point.y, this.size * (i / this.trail.length), 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.globalAlpha = point.alpha * 0.3
          ctx.fill()
        })
        
        // Draw particle
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        
        // Glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    class Rocket {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height
        this.velocity = {
          x: (Math.random() - 0.5) * 3,
          y: -(Math.random() * 8 + 12)
        }
        this.targetY = Math.random() * (canvas.height * 0.5) + 50
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.trail = []
      }

      update() {
        this.trail.push({ x: this.x, y: this.y })
        if (this.trail.length > 10) this.trail.shift()
        
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.velocity.y += 0.1
      }

      draw() {
        // Draw trail
        ctx.beginPath()
        ctx.moveTo(this.trail[0]?.x || this.x, this.trail[0]?.y || this.y)
        this.trail.forEach(point => {
          ctx.lineTo(point.x, point.y)
        })
        ctx.strokeStyle = '#ffd93d'
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.5
        ctx.stroke()
        
        // Draw rocket
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'
        ctx.fill()
      }

      shouldExplode() {
        return this.y <= this.targetY || this.velocity.y >= 0
      }

      explode() {
        const particleCount = Math.floor(Math.random() * 50) + 80
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.color))
        }
        
        // Add some white sparkles
        for (let i = 0; i < 20; i++) {
          particles.push(new Particle(this.x, this.y, '#ffffff'))
        }
      }
    }

    function createRocket() {
      rockets.push(new Rocket())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update()
        rockets[i].draw()
        
        if (rockets[i].shouldExplode()) {
          rockets[i].explode()
          rockets.splice(i, 1)
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()
        
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
      requestAnimationFrame(animate)
    }

    // Initial burst
    setTimeout(() => createRocket(), 100)
    setTimeout(() => createRocket(), 300)
    setTimeout(() => createRocket(), 500)

    // Continuous fireworks
    const interval = setInterval(() => {
      if (Math.random() > 0.3) createRocket()
      if (Math.random() > 0.6) createRocket()
    }, 800)

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="order-success-page">
      <canvas ref={canvasRef} className="fireworks-canvas" />

      {/* Content */}
      <div className="success-content">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l2.5 2.5L16 9" />
          </svg>
        </div>
        
        <h1>Order Placed Successfully! 🎉</h1>
        <p className="order-number">Order #TGS{Math.floor(Math.random() * 900000 + 100000)}</p>
        
        <div className="success-message">
          <p>Thank you for your order!</p>
          <p>We've sent a confirmation email with your order details.</p>
        </div>

        <div className="order-info">
          <div className="info-item">
            <span className="info-icon">📦</span>
            <div>
              <h4>Estimated Delivery</h4>
              <p>Tomorrow by 6 PM</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <h4>Delivery Address</h4>
              <p>Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/products" className="continue-btn">Continue Shopping</Link>
          <Link to="/account" className="track-btn">Track Order</Link>
        </div>

        <p className="celebration-text">Celebrate every moment with The Gift Studio</p>
      </div>
    </div>
  )
}

export default OrderSuccess
