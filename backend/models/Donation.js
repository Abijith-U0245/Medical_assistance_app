const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
    quantity: Number,
    donatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
