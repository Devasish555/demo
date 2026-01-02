const express = require('express');
const router = express.Router();
const db = require('../data/db');
const User = require('../models/User');

// API Status
router.get('/', (req, res) => {
  res.json({ message: 'Gift Studio API Running!', version: '1.0.0' });
});

// ============ AUTH ROUTES ============

// Register
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Create user
    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Products
router.get('/products', async (req, res) => {
  try {
    const { navlink } = req.query;
    let products = await db.getProducts();
    
    console.log('API: navlink query =', navlink);
    console.log('API: total products =', products.length);
    
    // Filter by navlink if provided
    if (navlink) {
      products = products.filter(p => {
        if (!p.navLinks || p.navLinks.length === 0) return false;
        // Check if any navLink matches (exact or partial)
        return p.navLinks.some(nl => nl === navlink || navlink.includes(nl) || nl.includes(navlink));
      });
      console.log('API: filtered products =', products.length);
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await db.getProductById(req.params.id);
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await db.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders by email
router.get('/orders/user/:email', async (req, res) => {
  try {
    const orders = await db.getOrdersByEmail(req.params.email);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Order
router.post('/orders', async (req, res) => {
  try {
    console.log('Order request body:', req.body);
    
    const { customer, email, phone, items, total, shipping, address, city, state, pincode, paymentMethod } = req.body;
    
    // Validate required fields
    if (!customer || !items || items.length === 0 || !total) {
      return res.status(400).json({ error: 'Missing required fields: customer, items, total' });
    }
    
    // Generate order ID
    const orderId = 'ORD' + Date.now().toString().slice(-8);
    
    const orderData = {
      orderId,
      customer,
      email: email || '',
      phone: phone || '',
      items: items.map(item => ({
        productId: item.productId || item.id || '',
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || ''
      })),
      itemCount: items.reduce((sum, item) => sum + (item.quantity || 1), 0),
      total,
      shipping: shipping || 0,
      address: address || '',
      city: city || '',
      state: state || '',
      pincode: pincode || '',
      paymentMethod: paymentMethod || 'cod',
      status: 'pending',
      date: new Date()
    };
    
    console.log('Creating order:', orderData);
    
    const order = await db.createOrder(orderData);
    
    console.log('Order created:', order);
    
    res.status(201).json({ success: true, order, orderId });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await db.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
