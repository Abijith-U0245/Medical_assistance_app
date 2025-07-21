const User = require('../models/user');
const Medicine = require('../models/medicine');
const generateToken = require('../utils/generateToken');
const axios = require('axios');

// 1. Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Login failed' });
    }
};

// 2. Public Medicine Dashboard
exports.getPublicMedicineDashboard = async (req, res) => {
    try {
        const medicines = await Medicine.find().select('-__v');
        res.json({ success: true, data: medicines });
    } catch (err) {
        res.status(500).json({ message: 'Failed to load medicine dashboard' });
    }
};

// 3. Public Medicine Donation
exports.publicDonateMedicine = async (req, res) => {
    try {
        const { name, imageUrl, quantity, type, location, donorName, donorContact } = req.body;

        const aiResponse = await axios.post('http://127.0.0.1:5001/ocr', { imageUrl });
        const expiryDate = aiResponse.data.expiry_date;

        if (!expiryDate) {
            return res.status(400).json({ message: 'AI could not verify expiry from image' });
        }

        const medicine = await Medicine.create({
            name,
            imageUrl,
            expiryDate,
            quantity,
            type,
            location,
            donatedBy: null,
            isVerified: false,
            donorInfo: {
                name: donorName,
                contact: donorContact
            }
        });

        res.status(201).json({ success: true, data: medicine });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to donate medicine' });
    }
};

// 4. Chatbot Basic Endpoint
exports.chatbotQuery = (req, res) => {
    const { message } = req.body;

    let response = "Sorry, I didn't understand that.";

    if (message.toLowerCase().includes('donate')) {
        response = "You can donate medicines via the Donate Medicines form!";
    } else if (message.toLowerCase().includes('expiry')) {
        response = "Our AI verifies expiry dates from uploaded images.";
    } else if (message.toLowerCase().includes('dashboard')) {
        response = "View all available medicines on the Medicine Dashboard.";
    }

    res.json({ response });
};

// 5. SOS Toggle
exports.toggleSOS = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.sosActive = !user.sosActive;
        await user.save();
        res.json({ sosActive: user.sosActive });
    } catch (err) {
        res.status(500).json({ message: 'Failed to toggle SOS' });
    }
};
