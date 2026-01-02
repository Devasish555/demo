import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        // Login
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })
        
        const data = await response.json()
        
        if (response.ok) {
          login(data.user)
          navigate('/account')
        } else {
          setError(data.error || 'Login failed')
        }
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        })
        
        const data = await response.json()
        
        if (response.ok) {
          login(data.user)
          navigate('/account')
        } else {
          setError(data.error || 'Registration failed')
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>{isLogin ? 'Login' : 'Create Account'}</h1>
          <p className="login-subtitle">
            {isLogin 
              ? 'Welcome back! Please enter your details.' 
              : 'Join us and start shopping!'}
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  minLength={6}
                />
              </div>
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button" 
                className="switch-btn"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' })
                }}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>

          <Link to="/" className="back-home">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
