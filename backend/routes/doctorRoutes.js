const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/register', doctorController.registerDoctor);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', doctorController.updateDoctor);
router.get('/nearby', doctorController.getNearbyDoctors);
router.get('/notifications', protect, doctorController.getDoctorNotifications);
module.exports = router;
