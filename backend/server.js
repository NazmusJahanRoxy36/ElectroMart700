// Load environment variables from .env file
require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON payloads

// Routes
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

// Products route
app.get('/products', (req, res) => {
  const filePath = path.join(__dirname, 'products.json'); // path to products.json

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read products.json:', err);
      return res.status(500).json({ message: 'Failed to load products' });
    }
    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (parseErr) {
      console.error('Error parsing products.json:', parseErr);
      res.status(500).json({ message: 'Error parsing products data' });
    }
  });
});

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ MONGO_URI is missing in .env file!');
  process.exit(1); // Stop server if Mongo URI is not set
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Test Route
app.get('/', (req, res) => {
  res.send('🌐 Server is running!');
});

// Start the Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
