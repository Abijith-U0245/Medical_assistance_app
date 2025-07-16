const mongoose = require('mongoose');

const LOCATION_FIELDS = {
  area: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true }
};

const hospitalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  hospital_name: {
    type: String,
    required: true,
    trim: true
  },
  hospital_no: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  location: LOCATION_FIELDS,
  services: {
    type: String,
    trim: true
  },
  medicines: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      unit: { type: String, default: "boxes" } // or "strips", "bottles", etc.
    }
  ],
  donations_done: {
    type: Number,
    default: 0,
    min: 0
  },
  approved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);

