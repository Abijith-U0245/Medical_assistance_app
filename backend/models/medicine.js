const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    quantity: { type: Number, required: true },
    type: { type: String }, // e.g., Tablet, Syrup
    location: { type: String },
    donatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Logged in user
    donorInfo: {               // ✅ For public / unregistered donors
        name: String,
        contact: String
    },
    isVerified: { type: Boolean, default: false },
    distributedTo: [{
        ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
        quantity: Number,
        date: Date
    }]
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
