const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Doctor core routes
router.post('/register', doctorController.registerDoctor);
router.put('/:id', doctorController.updateDoctor);

// Appointment-related routes (for doctor)
router.get('/appointments/doctor/:doctorId', doctorController.getAppointmentsForDoctor);
router.get('/appointments/:id', doctorController.getAppointmentDetail);
router.post('/appointments/:id/suggestions', doctorController.postSuggestions);

// This must come AFTER all /appointments/... routes
router.get('/:id', doctorController.getDoctorById);

module.exports = router;

