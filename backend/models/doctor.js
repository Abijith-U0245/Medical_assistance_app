const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    licenseNo: { type: String, required: true, unique: true },
    hospital: String,
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    availability: { type: Boolean, default: true },

    // ✅ Added: Profile image URL or path
    profileImage: { type: String, default: '/default-profile.png' },

    // ✅ Optional: Invitations as embedded documents or references
    invitations: [
        {
            from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // or Hospital
            message: String,
            status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
            createdAt: { type: Date, default: Date.now }
        }
    ],

    // Geo location
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    }
}, { timestamps: true });

// 2dsphere index for geo queries
doctorSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Doctor', doctorSchema);
