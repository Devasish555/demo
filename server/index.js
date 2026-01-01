require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/admin/assets', express.static(path.join(__dirname, 'admin/assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Routes
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');
const navlinksRoutes = require('./routes/navlinks');

app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);
app.use('/api/navlinks', navlinksRoutes);

// Production: Serve React build
app.use(express.static(path.join(__dirname, '../dist')));

// All other routes -> React app (except /admin and /api)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/admin') && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Admin:  http://localhost:${PORT}/admin`);
});