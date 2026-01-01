const express = require('express');
const router = express.Router();
const db = require('../data/db');

// API Status
router.get('/', (req, res) => {
  res.json({ message: 'Gift Studio API Running!', version: '1.0.0' });
});

// Products
router.get('/products', (req, res) => {
  res.json(db.getProducts());
});

router.get('/products/:id', (req, res) => {
  const product = db.getProductById(parseInt(req.params.id));
  product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
});

// Categories
router.get('/categories', (req, res) => {
  res.json(db.getCategories());
});

// Orders
router.get('/orders', (req, res) => {
  res.json(db.getOrders());
});

// Stats
router.get('/stats', (req, res) => {
  res.json(db.getStats());
});

module.exports = router;