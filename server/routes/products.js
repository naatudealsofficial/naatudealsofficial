const router = require('express').Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// GET products with optional category filter
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let products;
    if (category) {
      products = await Product.find({ category: { $regex: new RegExp(category, 'i') } })
        .populate('createdBy', 'name');
    } else {
      products = await Product.find().populate('createdBy', 'name');
    }

    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const product = new Product({ ...req.body, createdBy: req.user._id });
  await product.save();
  res.json(product);
});

router.put('/:id', auth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).send('Not allowed');
  Object.assign(product, req.body);
  await product.save();
  res.json(product);
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    if (
      product.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).send('Not allowed');
    }

    await product.deleteOne();
    res.send('Deleted');
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
