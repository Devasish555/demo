const express = require('express');
const router = express.Router();
const NavLink = require('../models/NavLink');

// Default data for seeding
const defaultNavLinks = [
  { title: 'New Year', url: '/products/new-year', icon: '🎉', order: 1, isActive: true, hasDropdown: false, subLinks: [] },
  { title: 'Celebrity Hampers', url: '/products/celebrity-hampers', icon: '⭐', order: 2, isActive: true, hasDropdown: false, subLinks: [] },
  { title: 'Birthdays', url: '/products/birthday', icon: '🎂', order: 3, isActive: true, hasDropdown: true, subLinks: [
    { title: 'Birthday for Him', url: '/products/birthday-him', order: 1 },
    { title: 'Birthday for Her', url: '/products/birthday-her', order: 2 }
  ]},
  { title: 'Anniversary', url: '/products/anniversary', icon: '💕', order: 4, isActive: true, hasDropdown: true, subLinks: [
    { title: 'For Couple', url: '/products/anniversary-couple', order: 1 },
    { title: 'For Parents', url: '/products/anniversary-parents', order: 2 }
  ]},
  { title: 'Last Minute Gifting', url: '/products/last-minute', icon: '⏰', order: 5, isActive: true, hasDropdown: false, subLinks: [] },
  { title: 'Best Sellers', url: '/products/bestsellers', icon: '🏆', order: 6, isActive: true, hasDropdown: true, subLinks: [
    { title: 'Gift Hampers', url: '/products/bestsellers-hampers', order: 1 },
    { title: 'Chocolates', url: '/products/bestsellers-chocolates', order: 2 }
  ]},
  { title: 'Create Your Own Hamper', url: '/products/create-hamper', icon: '🎁', order: 7, isActive: true, hasDropdown: false, subLinks: [] },
  { title: 'Plants & Flowers', url: '/products/plants-flowers', icon: '🌿', order: 8, isActive: true, hasDropdown: true, subLinks: [
    { title: 'Indoor Plants', url: '/products/indoor-plants', order: 1 },
    { title: 'Fresh Flowers', url: '/products/fresh-flowers', order: 2 }
  ]},
  { title: 'More Gifts', url: '/products', icon: '🎀', order: 9, isActive: true, hasDropdown: true, subLinks: [
    { title: 'Mugs & Frames', url: '/products/mugs-frames', order: 1 },
    { title: 'Dry Fruits', url: '/products/dry-fruits', order: 2 }
  ]}
];

// Seed database if empty
const seedDatabase = async () => {
  try {
    const count = await NavLink.countDocuments();
    if (count === 0) {
      await NavLink.insertMany(defaultNavLinks);
      console.log('NavLinks seeded to MongoDB');
    }
  } catch (error) {
    console.log('NavLinks seed error:', error.message);
  }
};
seedDatabase();

// Get active nav links (for frontend)
router.get('/', async (req, res) => {
  try {
    const links = await NavLink.find({ isActive: true }).sort('order');
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all nav links (for admin)
router.get('/all', async (req, res) => {
  try {
    const links = await NavLink.find().sort('order');
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add nav link
router.post('/add', async (req, res) => {
  try {
    const { title, url, icon, order, hasDropdown } = req.body;
    const count = await NavLink.countDocuments();
    
    const newLink = await NavLink.create({
      title,
      url,
      icon: icon || '📁',
      order: parseInt(order) || count + 1,
      isActive: true,
      hasDropdown: hasDropdown === 'true' || hasDropdown === true,
      subLinks: []
    });
    
    if (req.headers.accept?.includes('application/json')) {
      res.json({ success: true, link: newLink });
    } else {
      res.redirect('/admin/navlinks');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add sub-link
router.post('/:id/sublink', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, order } = req.body;
    
    console.log('Adding sublink:', { id, title, url, order });
    
    const result = await NavLink.findByIdAndUpdate(
      id, 
      {
        $push: { 
          subLinks: { title, url, order: parseInt(order) || 0 }
        },
        hasDropdown: true
      },
      { new: true }
    );
    
    console.log('Updated NavLink:', result);
    
    res.redirect('/admin/navlinks');
  } catch (error) {
    console.error('Sublink error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Toggle active status
router.get('/toggle/:id', async (req, res) => {
  try {
    const link = await NavLink.findById(req.params.id);
    if (link) {
      link.isActive = !link.isActive;
      await link.save();
    }
    res.redirect('/admin/navlinks');
  } catch (error) {
    res.redirect('/admin/navlinks');
  }
});

// Delete nav link
router.get('/delete/:id', async (req, res) => {
  try {
    await NavLink.findByIdAndDelete(req.params.id);
    res.redirect('/admin/navlinks');
  } catch (error) {
    res.redirect('/admin/navlinks');
  }
});

// Delete sub-link
router.get('/:linkId/sublink/delete/:subId', async (req, res) => {
  try {
    const { linkId, subId } = req.params;
    
    const link = await NavLink.findById(linkId);
    if (link) {
      link.subLinks = link.subLinks.filter(s => s._id.toString() !== subId);
      if (link.subLinks.length === 0) {
        link.hasDropdown = false;
      }
      await link.save();
    }
    
    res.redirect('/admin/navlinks');
  } catch (error) {
    res.redirect('/admin/navlinks');
  }
});

module.exports = router;
