const express = require('express');
const router = express.Router();
const db = require('../data/db');

// API Status
router.get('/', (req, res) => {
  res.json({ message: 'Gift Studio API Running!', version: '1.0.0' });
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
