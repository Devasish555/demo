const Product = require('../models/Product');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Category = require('../models/Category');

// Default data for seeding
const defaultProducts = [
  { name: 'Midnight Stash', brand: 'THE GIFT STUDIO', price: 1429, stock: 50, image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Hampers' },
  { name: 'Mighty Celebration Trunk', brand: 'THE GIFT STUDIO', price: 7699, stock: 25, image: 'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Hampers' },
  { name: 'Cocoa Bliss', brand: 'THE GIFT STUDIO', price: 1077, stock: 100, image: 'https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Chocolates' },
  { name: 'Sweet Alternatives', brand: 'THE GIFT STUDIO', price: 3079, stock: 40, image: 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Chocolates' },
  { name: 'Out Doors with Anamika Khanna', brand: 'THE GIFT STUDIO', price: 10999, stock: 15, image: 'https://images.pexels.com/photos/1666069/pexels-photo-1666069.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Celebrity' },
  { name: 'Purple Spray Money Plant', brand: 'THE GIFT STUDIO', price: 699, stock: 80, image: 'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Plants' },
  { name: 'The Luxury Food Trunk', brand: 'THE GIFT STUDIO', price: 9679, stock: 20, image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Hampers' },
  { name: 'Small Big Things', brand: 'THE GIFT STUDIO', price: 5499, stock: 30, image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Hampers' },
];

const defaultOrders = [
  { orderId: 'ORD001', customer: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', items: 3, total: 15499, status: 'delivered', date: new Date('2025-12-28'), address: 'Mumbai' },
  { orderId: 'ORD002', customer: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', items: 2, total: 8776, status: 'shipped', date: new Date('2025-12-29'), address: 'Delhi' },
  { orderId: 'ORD003', customer: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', items: 1, total: 3079, status: 'processing', date: new Date('2025-12-30'), address: 'Bangalore' },
  { orderId: 'ORD004', customer: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 65432 10987', items: 4, total: 22876, status: 'pending', date: new Date('2025-12-31'), address: 'Chennai' },
  { orderId: 'ORD005', customer: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 54321 09876', items: 2, total: 11198, status: 'delivered', date: new Date('2025-12-27'), address: 'Pune' },
];

const defaultCustomers = [
  { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', orders: 5, spent: 45000, joinDate: new Date('2025-06-15') },
  { name: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', orders: 3, spent: 28000, joinDate: new Date('2025-07-20') },
  { name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', orders: 2, spent: 12000, joinDate: new Date('2025-08-10') },
  { name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 65432 10987', orders: 7, spent: 65000, joinDate: new Date('2025-05-01') },
  { name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 54321 09876', orders: 4, spent: 38000, joinDate: new Date('2025-09-05') },
];

const defaultCategories = [
  { name: 'Gift Hampers', slug: 'hampers', icon: '🎁' },
  { name: 'Plants & Flowers', slug: 'plants', icon: '🌿' },
  { name: 'Chocolates', slug: 'chocolates', icon: '🍫' },
  { name: 'Celebrity Collection', slug: 'celebrity', icon: '⭐' },
  { name: 'Corporate Gifts', slug: 'corporate', icon: '💼' },
];

// Seed database
const seedDatabase = async () => {
  try {
    // Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(defaultProducts);
      console.log('Products seeded');
    }
    
    // Orders
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      await Order.insertMany(defaultOrders);
      console.log('Orders seeded');
    }
    
    // Customers
    const customerCount = await Customer.countDocuments();
    if (customerCount === 0) {
      await Customer.insertMany(defaultCustomers);
      console.log('Customers seeded');
    }
    
    // Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany(defaultCategories);
      console.log('Categories seeded');
    }
  } catch (error) {
    console.log('Seed error:', error.message);
  }
};

// Initialize seeding
seedDatabase();

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
