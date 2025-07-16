const mongoose = require('mongoose');

// Optionally, define constants for reuse or enum types
const LOCATION_FIELDS = {
  area: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true }
};

const pharmacySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  pharmacyname: {
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
  services: {
    type: String,
    trim: true
  },
  location: LOCATION_FIELDS,
  approved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Pharmacy', pharmacySchema);

