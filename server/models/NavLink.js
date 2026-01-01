const mongoose = require('mongoose');

const subLinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, default: 0 }
});

const navLinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, default: '📁' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  hasDropdown: { type: Boolean, default: false },
  subLinks: [subLinkSchema]
}, { timestamps: true });

module.exports = mongoose.model('NavLink', navLinkSchema);