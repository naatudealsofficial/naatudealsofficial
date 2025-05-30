const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  imageUrl: String,
  affiliateLink: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdTime: { type: Date, default: Date.now },
  specialKey: { type: String } // e.g., used for exclusive tags or identifiers
});

module.exports = mongoose.model('Product', productSchema);