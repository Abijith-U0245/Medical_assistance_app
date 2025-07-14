const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    licenseNo: { type: String, required: true, unique: true },
    hospital: String,
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    availability: { type: Boolean, default: true },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true }  // [longitude, latitude]
    }
}, { timestamps: true });

// 2dsphere index for geo queries
doctorSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Doctor', doctorSchema);
