const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', userController.loginUser);
router.get('/medicine-dashboard', userController.getPublicMedicineDashboard);
router.post('/donate-medicine', userController.publicDonateMedicine);
router.post('/chatbot', userController.chatbotQuery);
router.post('/toggle-sos', protect, userController.toggleSOS);

module.exports = router;
