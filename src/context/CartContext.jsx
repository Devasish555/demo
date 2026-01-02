import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on initial load
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id || item.id === product._id)
      
      if (existingItem) {
        return items.map(item =>
          (item.id === product.id || item.id === product._id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...items, {
        id: product._id || product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity } : item)
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
