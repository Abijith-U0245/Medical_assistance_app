const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: Number, required: true },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (v) {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(v);
            },
            message: 'Password must contain at least 1 letter, 1 number, and 1 special character',
        }
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'hospital', 'pharmacy', 'ngo', 'public'],
        default: 'public',
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

module.exports = mongoose.model('User', userSchema);
