// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: Number, required: true },
  password: {
  type: String,
  required: true,
  minlength: 8
 

  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'hospital', 'pharmacy', 'ngo', 'public','patient'],
    default: 'public'
  },
  location: {
    city: String,
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  notifications: [{
    message: String,
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  }],
  sosActive: { type: Boolean, default: false }
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
