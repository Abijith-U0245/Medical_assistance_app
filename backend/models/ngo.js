const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  organizationname: {
    type: String,
    required: true,
    trim: true
  },
  registrationno: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  cause: {
    type: String,
    trim: true
  },
  location: {
    area: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true }
  },
  donations: {
    type: Number,
    default: 0,
    min: 0
  },
  approved: {
    type: Boolean,
    default: false
  },
  requestedMedicines: [{
    medicine: { type: String, required: true },
    quantity: { type: Number, required: true },
    location: { type: String },
    requestedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('NGO', ngoSchema);
