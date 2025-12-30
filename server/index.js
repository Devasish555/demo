const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api', (req, res) => {
  res.json({ message: 'API is running!' });
});

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: "Masaba's Luxe Indulgence Hamper", price: 13999 },
    { id: 2, name: 'Out Doors with Anamika Khanna', price: 10999 },
  ]);
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
