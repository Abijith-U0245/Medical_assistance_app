const express = require('express');
const router = express.Router();
const {
  uploadPharmacy,
  getPharmacyDashboard,
  donateMedicine
} = require('../controllers/pharmacyController');

const { protect } = require('../middleware/authMiddleware'); // assuming you're using JWT-based auth

// POST /api/pharmacy — Upload pharmacy info
router.post('/', protect, uploadPharmacy);

// GET /api/pharmacy/dashboard — Pharmacy dashboard data
router.get('/dashboard', protect, getPharmacyDashboard);

// POST /api/pharmacy/donate — Submit a medicine donation
router.post('/donate', protect, donateMedicine);

module.exports = router;
