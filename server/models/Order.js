const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  image: { type: String }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  items: [orderItemSchema],
  itemCount: { type: Number, default: 1 },
  total: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  paymentMethod: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
