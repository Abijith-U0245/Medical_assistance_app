const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/login', userController.loginUser);
router.get('/medicine-dashboard', userController.getPublicMedicineDashboard);
router.post('/donate-medicine', upload.single('image'), userController.publicDonateMedicine);
router.post('/chatbot', userController.chatbotQuery);
router.post('/toggle-sos', protect, userController.toggleSOS);

// New Emergency / Ambulance / Notifications
router.post('/emergency-doctor', protect, userController.emergencyDoctorAlert);
router.post('/request-ambulance', protect, userController.requestAmbulance);
router.get('/notifications', protect, userController.getUserNotifications);

module.exports = router;
