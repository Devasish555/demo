const Product = require('../models/Product');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Category = require('../models/Category');

// No default products - all products come from database only

// No default data - everything comes from database only

module.exports = {
  // Products
  getProducts: async () => await Product.find(),
  getProductById: async (id) => await Product.findById(id),
  addProduct: async (product) => await Product.create(product),
  updateProduct: async (id, data) => await Product.findByIdAndUpdate(id, data, { new: true }),
  deleteProduct: async (id) => await Product.findByIdAndDelete(id),
  
  // Orders
  getOrders: async (status) => {
    if (status && status !== 'all') {
      return await Order.find({ status }).sort({ date: -1 });
    }
    return await Order.find().sort({ date: -1 });
  },
  getOrdersByEmail: async (email) => await Order.find({ email }).sort({ date: -1 }),
  createOrder: async (orderData) => await Order.create(orderData),
  getOrderById: async (id) => await Order.findById(id),
  updateOrderStatus: async (id, status) => await Order.findByIdAndUpdate(id, { status }),
  
  // Customers
  getCustomers: async () => await Customer.find().sort({ spent: -1 }),
  
  // Categories
  getCategories: async () => await Category.find(),
  getCategoriesWithCount: async () => {
    const categories = await Category.find();
    const products = await Product.find();
    return categories.map(c => ({
      ...c.toObject(),
      count: products.filter(p => p.category === c.name || p.category === c.slug).length
    }));
  },
  addCategory: async (cat) => {
    cat.slug = cat.name.toLowerCase().replace(/\s+/g, '-');
    return await Category.create(cat);
  },
  deleteCategory: async (id) => await Category.findByIdAndDelete(id),
  
  // Stats
  getStats: async () => {
    const [products, orders, customers] = await Promise.all([
      Product.countDocuments(),
      Order.find(),
      Customer.countDocuments()
    ]);
    return {
      totalProducts: products,
      totalOrders: orders.length,
      totalCustomers: customers,
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
    };
  }
};
