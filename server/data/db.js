// In-Memory Database
let products = [
  { id: 1, name: 'Midnight Stash', brand: 'THE GIFT STUDIO', price: 1429, stock: 50, image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Hampers' },
  { id: 2, name: 'Mighty Celebration Trunk', brand: 'THE GIFT STUDIO', price: 7699, stock: 25, image: 'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Hampers' },
  { id: 3, name: 'Cocoa Bliss', brand: 'THE GIFT STUDIO', price: 1077, stock: 100, image: 'https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Chocolates' },
  { id: 4, name: 'Sweet Alternatives', brand: 'THE GIFT STUDIO', price: 3079, stock: 40, image: 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Chocolates' },
  { id: 5, name: 'Out Doors with Anamika Khanna', brand: 'THE GIFT STUDIO', price: 10999, stock: 15, image: 'https://images.pexels.com/photos/1666069/pexels-photo-1666069.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Celebrity' },
  { id: 6, name: 'Purple Spray Money Plant', brand: 'THE GIFT STUDIO', price: 699, stock: 80, image: 'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Plants' },
  { id: 7, name: 'The Luxury Food Trunk', brand: 'THE GIFT STUDIO', price: 9679, stock: 20, image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Hampers' },
  { id: 8, name: 'Small Big Things', brand: 'THE GIFT STUDIO', price: 5499, stock: 30, image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=300', category: 'Hampers' },
];

let orders = [
  { id: 'ORD001', customer: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', items: 3, total: 15499, status: 'delivered', date: '2025-12-28', address: 'Mumbai' },
  { id: 'ORD002', customer: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', items: 2, total: 8776, status: 'shipped', date: '2025-12-29', address: 'Delhi' },
  { id: 'ORD003', customer: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', items: 1, total: 3079, status: 'processing', date: '2025-12-30', address: 'Bangalore' },
  { id: 'ORD004', customer: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 65432 10987', items: 4, total: 22876, status: 'pending', date: '2025-12-31', address: 'Chennai' },
  { id: 'ORD005', customer: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 54321 09876', items: 2, total: 11198, status: 'delivered', date: '2025-12-27', address: 'Pune' },
];

let customers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', orders: 5, spent: 45000, joinDate: '2025-06-15' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', orders: 3, spent: 28000, joinDate: '2025-07-20' },
  { id: 3, name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', orders: 2, spent: 12000, joinDate: '2025-08-10' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 65432 10987', orders: 7, spent: 65000, joinDate: '2025-05-01' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 54321 09876', orders: 4, spent: 38000, joinDate: '2025-09-05' },
];

let categories = [
  { id: 1, name: 'Gift Hampers', slug: 'hampers', icon: '🎁' },
  { id: 2, name: 'Plants & Flowers', slug: 'plants', icon: '🌿' },
  { id: 3, name: 'Chocolates', slug: 'chocolates', icon: '🍫' },
  { id: 4, name: 'Celebrity Collection', slug: 'celebrity', icon: '⭐' },
  { id: 5, name: 'Corporate Gifts', slug: 'corporate', icon: '💼' },
];

module.exports = {
  products,
  orders,
  customers,
  categories,
  
  // Products
  getProducts: () => products,
  getProductById: (id) => products.find(p => p.id === id),
  addProduct: (product) => {
    product.id = products.length + 1;
    products.push(product);
    return product;
  },
  deleteProduct: (id) => {
    products = products.filter(p => p.id !== id);
  },
  
  // Orders
  getOrders: (status) => status && status !== 'all' ? orders.filter(o => o.status === status) : orders,
  updateOrderStatus: (id, status) => {
    const order = orders.find(o => o.id === id);
    if (order) order.status = status;
  },
  
  // Customers
  getCustomers: () => customers,
  
  // Categories
  getCategories: () => categories,
  getCategoriesWithCount: () => categories.map(c => ({
    ...c,
    count: products.filter(p => p.category === c.name).length
  })),
  addCategory: (cat) => {
    cat.id = categories.length + 1;
    cat.slug = cat.name.toLowerCase().replace(/\s+/g, '-');
    categories.push(cat);
    return cat;
  },
  deleteCategory: (id) => {
    categories = categories.filter(c => c.id !== id);
  },
  
  // Stats
  getStats: () => ({
    totalProducts: products.length,
    totalOrders: orders.length,
    totalCustomers: customers.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
  })
};