const express = require('express');
const router = express.Router();
const NavLink = require('../models/NavLink');

// No default seeding - admin will add navlinks manually

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
