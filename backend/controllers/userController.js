const User = require('../models/user');
const Medicine = require('../models/medicine');
const generateToken = require('../utils/generateToken');
const axios = require('axios');

// Store notifications in memory (simple simulation)
let notifications = [];

// 1. User Login
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
    } catch {
        res.status(500).json({ message: 'Login failed' });
    }
};

// 2. Public Medicine Dashboard
exports.getPublicMedicineDashboard = async (req, res) => {
    try {
        const medicines = await Medicine.find().select('-__v');
        res.json({ success: true, data: medicines });
    } catch {
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
            donorInfo: { name: donorName, contact: donorContact }
        });

        res.status(201).json({ success: true, data: medicine });
    } catch {
        res.status(500).json({ message: 'Failed to donate medicine' });
    }
};

// 4. Chatbot
exports.chatbotQuery = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post('http://127.0.0.1:5002/chat', { message });
    res.json({ response: response.data.response });
  } catch (error) {
    res.status(500).json({ message: 'Chatbot service error' });
  }
};


// 5. SOS Toggle
exports.toggleSOS = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.sosActive = !user.sosActive;
        await user.save();
        res.json({ sosActive: user.sosActive });
    } catch {
        res.status(500).json({ message: 'Failed to toggle SOS' });
    }
};

// 6. Emergency Doctor Request
exports.emergencyDoctorAlert = async (req, res) => {
    try {
        const message = `🚨 Emergency: Patient ${req.user.name} needs assistance!`;
        notifications.push({ type: 'doctor-alert', message, timestamp: new Date() });
        res.json({ success: true, message: 'Doctors notified!' });
    } catch {
        res.status(500).json({ message: 'Failed to notify doctors' });
    }
};

// 7. Ambulance Request
exports.requestAmbulance = async (req, res) => {
    try {
        const message = `🚑 Ambulance requested by ${req.user.name}`;
        notifications.push({ type: 'ambulance-request', message, timestamp: new Date() });
        res.json({ success: true, message: 'Nearby hospitals notified for ambulance!' });
    } catch {
        res.status(500).json({ message: 'Failed to request ambulance' });
    }
};


// Get Doctor Notifications
exports.getDoctorNotifications = async (req, res) => {
    try {
        const doctor = await User.findById(req.user._id);

        if (doctor.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json({ success: true, notifications: doctor.notifications || [] });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch doctor notifications' });
    }
};

// Get Hospital Notifications
exports.getHospitalNotifications = async (req, res) => {
    try {
        const hospital = await User.findById(req.user._id);

        if (hospital.role !== 'hospital') {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json({ success: true, notifications: hospital.notifications || [] });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch hospital notifications' });
    }
};

// 8. Get Notifications
exports.getUserNotifications = (req, res) => {
    res.json({ success: true, notifications });
};
