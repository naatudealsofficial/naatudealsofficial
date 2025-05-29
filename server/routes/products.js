const router = require('express').Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const products = await Product.find().populate('createdBy', 'name');
  res.json(products);
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
  const product = await Product.findById(req.params.id);
  if (product.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).send('Not allowed');
  await product.remove();
  res.send('Deleted');
});

module.exports = router;
