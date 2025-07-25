const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');

// Register doctor
// Simplified registerDoctor (no multer dependency)
exports.registerDoctor = async (req, res) => {
    try {
        const doctorData = {
            ...req.body,
            profileImage: req.body.profileImage || '/default-profile.png',
            invitations: []
        };

        const doctor = await Doctor.create(doctorData);
        res.status(201).json({ success: true, data: doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to register doctor' });
    }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('user');
        if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
        res.json({ success: true, data: doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching doctor' });
    }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`;
        }

        const doctor = await Doctor.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

        res.json({ success: true, data: doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating doctor' });
    }
};

// Get nearby doctors
exports.getNearbyDoctors = async (req, res) => {
    try {
        const { longitude, latitude, distance = 5000 } = req.query;
        if (!longitude || !latitude) {
            return res.status(400).json({ success: false, message: 'Longitude and Latitude required' });
        }

        const doctors = await Doctor.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseFloat(distance)
                }
            },
            availability: true
        });

        res.json({ success: true, data: doctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve nearby doctors' });
    }
};

// Get accepted appointments for a doctor
exports.getAppointmentsForDoctor = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            doctor: req.params.doctorId,
            status: 'accepted'
        }).populate('patient');

        res.json({ success: true, data: appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
    }
};

// Get appointment details (Page 1)
exports.getAppointmentDetail = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('patient');

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.json({
            success: true,
            data: {
                purpose: appointment.purpose,
                patient: appointment.patient,
                medicalHistory: appointment.medicalHistory,
                disorders: appointment.disorders
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch appointment' });
    }
};

// Save doctor suggestions (Page 2)
exports.postSuggestions = async (req, res) => {
    try {
        const { tablets, advice } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { tablets, advice },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.json({ success: true, message: 'Suggestions saved', data: appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to save suggestions' });
    }
};

// ✅ Add this final export to fix the missing route handler
exports.getDoctorNotifications = async (req, res) => {
    try {
        // Optional: you can add real logic here, like fetching from a Notification model
        res.json({ success: true, notifications: [], message: 'No notifications yet.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
    }
};
