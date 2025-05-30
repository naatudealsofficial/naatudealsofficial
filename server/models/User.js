const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
  status: { type: String, enum: ['active', 'held'], default: 'active' }
});

module.exports = mongoose.model('User', userSchema);
    