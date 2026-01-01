const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, default: 'THE GIFT STUDIO' },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },
  category: { type: String },
  navLinks: [{ type: String }] // Array of navLink URLs for filtering
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
