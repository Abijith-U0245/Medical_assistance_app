// models/Medicine.js
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  donatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isVerified: { type: Boolean, default: false },
  location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
