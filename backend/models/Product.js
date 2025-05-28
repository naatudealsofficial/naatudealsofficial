const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } // Add this line
});

module.exports = mongoose.model('Product', ProductSchema);
  