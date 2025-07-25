const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware'); // ✅ FIXED

// Doctor core routes
router.post('/register', doctorController.registerDoctor);
router.put('/:id', doctorController.updateDoctor);

// Appointment-related routes (for doctor)
router.get('/appointments/doctor/:doctorId', doctorController.getAppointmentsForDoctor);
router.get('/appointments/:id', doctorController.getAppointmentDetail);
router.post('/appointments/:id/suggestions', doctorController.postSuggestions);

// This must come AFTER all /appointments/... routes
router.get('/:id', doctorController.getDoctorById);
router.get('/nearby', doctorController.getNearbyDoctors);

// Protected route
router.get('/notifications', protect, doctorController.getDoctorNotifications);

module.exports = router;
