const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: Number,
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(v);
            },
            message: props =>
                `Password must contain at least 1 letter, 1 number, and 1 special character`,
        }
    },
    role: {
        type: String,
        enum: ['medicine', 'doctor', 'patient', 'NGO'],
        default: 'patient',
    },
    location: {
        city: String,
    },
    sosActive: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);