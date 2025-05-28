
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');
const connectDB = require('./db.js');

const app = express();
const PORT =process.env.PORT || 5000;
app.use(cors());



// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Connect to MongoDB

connectDB()


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

