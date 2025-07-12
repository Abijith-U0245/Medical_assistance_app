const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    LicenseNo: { type: String, required: true, unique: true },
    hospital: String,
    specialization: { type: String, required: true },
    qualificaton: { type: String, required: true },
    availability: { type: Boolean, default: true },

}, { timestamps: true });
module.export = mongoose.model('Doctor', doctorSchema);