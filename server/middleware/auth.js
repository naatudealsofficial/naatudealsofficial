const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await User.findById(decoded.id);
    if (!user || user.status === 'held') return res.status(403).send('Account held or invalid');
    req.user = user;
    next();
  } catch {
    res.status(400).send('Invalid token');
  }
};
