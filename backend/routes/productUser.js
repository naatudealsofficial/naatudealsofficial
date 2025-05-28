const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products, sorted by createdAt in descending order
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }); // Sort by createdAt in descending order
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
