const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming Product is a Mongoose model

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products: ' + err.message });
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product: ' + err.message });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, photo, link } = req.body;
  const product = new Product({ name, photo, link });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error adding product: ' + err.message });
  }
});

// Remove a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      res.status(200).json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error removing product: ' + err.message });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  console.log('Update request received for ID:', req.params.id); // Debug log
  console.log('Data received:', req.body); // Debug log

  try {
    const { name, photo, link } = req.body; // Destructure updated fields

    // Validate input data if necessary
    if (!name || !photo || !link) {
      return res.status(400).json({ message: 'All fields (name, photo, link) are required' });
    }

    // Find and update the product by ID
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, photo, link },
      { new: true, runValidators: true }
    );

    if (updatedProduct) {
      console.log('Update successful:', updatedProduct);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Error updating product:', err); // Debug error log
    res.status(500).json({ message: 'Error updating product: ' + err.message });
  }
});

module.exports = router;
