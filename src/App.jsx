import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Account from './pages/Account'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import './App.css'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

// Protected Route - requires login
function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth()
  
  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Guest Route - only for non-logged in users
function GuestRoute({ children }) {
  const { isLoggedIn, loading } = useAuth()
  
  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>
  }
  
  if (isLoggedIn) {
    return <Navigate to="/account" replace />
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/products/:category/:subcategory" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
