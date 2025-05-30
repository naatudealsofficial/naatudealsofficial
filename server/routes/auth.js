const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.status === 'held') return res.status(403).send('Access denied');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ id: user._id }, 'secret');
  res.json({ token, role: user.role, name: user.name });
});

router.post('/register', async (req, res) => {
  const { name, email, password , role} = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(400).send('User already exists');
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role: role || 'client' });
  await newUser.save();
  res.status(201).send('User created');
});

module.exports = router;
