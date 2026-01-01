const express = require('express');
const router = express.Router();
const db = require('../data/db');
const layout = require('../admin/layout');
const dashboardPage = require('../admin/pages/dashboard');
const productsPage = require('../admin/pages/products');
const ordersPage = require('../admin/pages/orders');
const customersPage = require('../admin/pages/customers');
const categoriesPage = require('../admin/pages/categories');
const settingsPage = require('../admin/pages/settings');

// Dashboard
router.get('/', (req, res) => {
  const stats = db.getStats();
  const orders = db.getOrders().slice(-5).reverse();
  const products = db.getProducts().slice(0, 5);
  res.send(layout('Dashboard', dashboardPage(stats, orders, products), 'dashboard'));
});

// Products
router.get('/products', (req, res) => {
  res.send(layout('Products', productsPage(db.getProducts(), db.getCategories()), 'products'));
});

router.post('/products/add', (req, res) => {
  const { name, brand, price, stock, image, category } = req.body;
  db.addProduct({
    name,
    brand: brand || 'THE GIFT STUDIO',
    price: parseInt(price),
    stock: parseInt(stock),
    image: image || 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=300',
    category
  });
  res.redirect('/admin/products');
});

router.get('/products/delete/:id', (req, res) => {
  db.deleteProduct(parseInt(req.params.id));
  res.redirect('/admin/products');
});

// Orders
router.get('/orders', (req, res) => {
  const status = req.query.status || 'all';
  res.send(layout('Orders', ordersPage(db.getOrders(status), status), 'orders'));
});

router.post('/orders/status/:id', (req, res) => {
  db.updateOrderStatus(req.params.id, req.body.status);
  res.redirect('/admin/orders');
});

// Customers
router.get('/customers', (req, res) => {
  res.send(layout('Customers', customersPage(db.getCustomers()), 'customers'));
});

// Categories
router.get('/categories', (req, res) => {
  res.send(layout('Categories', categoriesPage(db.getCategoriesWithCount()), 'categories'));
});

router.post('/categories/add', (req, res) => {
  db.addCategory({ name: req.body.name, icon: req.body.icon || '📦' });
  res.redirect('/admin/categories');
});

router.get('/categories/delete/:id', (req, res) => {
  db.deleteCategory(parseInt(req.params.id));
  res.redirect('/admin/categories');
});

// Settings
router.get('/settings', (req, res) => {
  res.send(layout('Settings', settingsPage(), 'settings'));
});

module.exports = router;