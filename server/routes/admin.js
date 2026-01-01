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
const navlinksPage = require('../admin/pages/navlinks');
const navlinksRouter = require('./navlinks');
const NavLink = require('../models/NavLink');

// Dashboard
router.get('/', async (req, res) => {
  try {
    const stats = await db.getStats();
    const orders = await db.getOrders();
    const products = await db.getProducts();
    res.send(layout('Dashboard', dashboardPage(stats, orders.slice(-5).reverse(), products.slice(0, 5)), 'dashboard'));
  } catch (error) {
    res.send(layout('Dashboard', `<p>Error: ${error.message}</p>`, 'dashboard'));
  }
});

// Products
router.get('/products', async (req, res) => {
  try {
    const products = await db.getProducts();
    const categories = await db.getCategories();
    res.send(layout('Products', productsPage(products, categories), 'products'));
  } catch (error) {
    res.send(layout('Products', `<p>Error: ${error.message}</p>`, 'products'));
  }
});

router.post('/products/add', async (req, res) => {
  try {
    const { name, brand, price, stock, image, category } = req.body;
    await db.addProduct({
      name,
      brand: brand || 'THE GIFT STUDIO',
      price: parseInt(price),
      stock: parseInt(stock),
      image: image || 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=300',
      category
    });
    res.redirect('/admin/products');
  } catch (error) {
    res.redirect('/admin/products');
  }
});

router.get('/products/delete/:id', async (req, res) => {
  try {
    await db.deleteProduct(req.params.id);
    res.redirect('/admin/products');
  } catch (error) {
    res.redirect('/admin/products');
  }
});

// Orders
router.get('/orders', async (req, res) => {
  try {
    const status = req.query.status || 'all';
    const orders = await db.getOrders(status);
    res.send(layout('Orders', ordersPage(orders, status), 'orders'));
  } catch (error) {
    res.send(layout('Orders', `<p>Error: ${error.message}</p>`, 'orders'));
  }
});

router.post('/orders/status/:id', async (req, res) => {
  try {
    await db.updateOrderStatus(req.params.id, req.body.status);
    res.redirect('/admin/orders');
  } catch (error) {
    res.redirect('/admin/orders');
  }
});

// Customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await db.getCustomers();
    res.send(layout('Customers', customersPage(customers), 'customers'));
  } catch (error) {
    res.send(layout('Customers', `<p>Error: ${error.message}</p>`, 'customers'));
  }
});

// Categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.getCategoriesWithCount();
    res.send(layout('Categories', categoriesPage(categories), 'categories'));
  } catch (error) {
    res.send(layout('Categories', `<p>Error: ${error.message}</p>`, 'categories'));
  }
});

router.post('/categories/add', async (req, res) => {
  try {
    await db.addCategory({ name: req.body.name, icon: req.body.icon || '📦' });
    res.redirect('/admin/categories');
  } catch (error) {
    res.redirect('/admin/categories');
  }
});

router.get('/categories/delete/:id', async (req, res) => {
  try {
    await db.deleteCategory(req.params.id);
    res.redirect('/admin/categories');
  } catch (error) {
    res.redirect('/admin/categories');
  }
});

// Settings
router.get('/settings', (req, res) => {
  res.send(layout('Settings', settingsPage(), 'settings'));
});

// NavLinks Management
router.get('/navlinks', async (req, res) => {
  try {
    const navLinks = await NavLink.find().sort('order');
    res.send(layout('Navigation Links', navlinksPage(navLinks), 'navlinks'));
  } catch (error) {
    res.send(layout('Navigation Links', navlinksPage([]), 'navlinks'));
  }
});

// NavLinks API routes
router.use('/navlinks', navlinksRouter);

module.exports = router;
