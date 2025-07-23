const express = require('express');
const router = express.Router();
const ngoController = require('../controllers/NgoController');
const { protect } = require('../middleware/authMiddleware');

// Most specific routes first
router.get('/profile/me', protect, ngoController.getNgoProfile);
router.get('/:ngoId/purchases', protect, ngoController.getNgoPurchases);
router.get('/available/nearby', protect, ngoController.getNearbyMedicines);
router.post('/request-medicine', protect, ngoController.requestNewMedicine);

// General CRUD
router.post('/', protect, ngoController.uploadNgo);
router.get('/', ngoController.getAllNgos);
router.get('/:id', ngoController.getNgoById); // Keep this LAST to avoid override

module.exports = router;
