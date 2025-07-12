const mongoose = require('mongoose');
const ngoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    organizationname: { type: String, required: true },
    registrationno: { type: String, required: true, unique: true },
    approved: { type: Boolean, default: false },
    website: String,
    cause: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('NGO', ngoSchema);